<template lang="html">
  <!-- 防盗链 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">防篡改</p>
      </el-col>
      <el-col :span="12" class="description">
        <p>对指定资源进行强制缓存锁定，锁定期间可保证资源安全不被篡改。防篡改缓存优先级大于<a class="jumpLink" :href="`/console/cloud-speed#/websiteList/console/${domainId}/perform`">云加速</a>的高级CDN缓存</p>
        <p>如您网站曾经发生过篡改事件或疑似有非法信息建议在开启防篡改功能前，使用<a class="jumpLink" href="/console/shield-eye#/propertyList">盾眼</a>进行深度检测，以便全面了解当前网站安全状况。</p>
      </el-col>
      <el-col :span="9">
        <div class="fr">
          <i-button class="clean-cache" @click="cleanCache">清理缓存</i-button>
          <el-select v-model="status" @change="updateAntiModify" class="fr" >
            <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">缓存方式</p>
      </el-col>
      <el-col :span="21">
        <el-radio-group v-model="cacheType" @change="updateAntiModify">
          <el-radio label="whole">全站</el-radio>
          <el-radio label="special">指定内容</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="cacheType === 'special'">
      <el-col :offset="3" :span="21">
        <p>缓存内容</p>
        <div>
          <el-checkbox-group v-model="cacheContent" @change="updateAntiModify">
            <el-checkbox v-for="(item, index) in cacheContentOption" :label="item.label" :key="item.value">{{ item.value }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import SourceGuardResource from 'src/console/modules/red-guard/resource/SourceGuardResource'

export default {
  name: 'prevent-tamper',
  components: {
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      domainId: '',
      status: '',
      cacheType: '',
      init: 1,
      cacheContent: ['index'],
      cacheContentOption: [{
        value: '首页',
        label: 'index'
      }, {
        value: '图片／静态资源',
        label: 'pic_static'
      }, {
        value: '目录',
        label: 'menu'
      }, {
        value: '静态页面',
        label: 'staticPage'
      }],
      options: [
        {
          value: 'on',
          label: 'ON'
        },
        {
          value: 'off',
          label: 'OFF'
        }
      ],
      tipContent: [
        '白名单中域名不受防盗链影响，可正常访问您网站资源',
        '支持通配符*，您可以使用*.demo.com来代表demo.com下的所有站点',
        '黑白名单规则上限各20条'
      ]
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchAntiModify()
  },
  methods: {
    cleanCache() {
      const params = {
        wholesite: [this.$store.state.website.domainInfo.domain]
      }
      console.log('params...',params)
      SourceGuardResource.putCleanCache(params).then(res => {
        this.windowMessage(res.data.status.message)
      })
    },
    fetchAntiModify() {
      SourceGuardResource.getAntiModify(this.domainId).then(res => {
        const data = res.data.data.anti_modify
        this.status = data.status
        this.cacheType = data.cache_type
        this.cacheContent = data.cache_content
      })
    },
    updateAntiModify() {
      if (this.init < 3) {
        this.init++
        return
      }
      const params = {
        status: this.status,
        cache_type: this.cacheType,
        cache_content: this.cacheContent
      }
      SourceGuardResource.putAntiModify(this.domainId, params).then(res => {
        this.windowMessage(res.data.status.message)
      })
    }
  }
}
</script>

<style scoped>
.clean-cache {
  margin-right: 20px;
}
</style>
