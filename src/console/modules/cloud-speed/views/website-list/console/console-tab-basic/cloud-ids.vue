  <template lang="html">
  <!-- 云IDS -->
  <el-card class="item-padding" v-show="show">
    <div v-if="useRedGuard">
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">云IDS</p>
        </el-col>
        <el-col :span="15" class="description">
          <p>您已开启服务，更高级配置请前往<a :href="redGuardUrl" class="a-link">红网卫士</a>控制台。</p>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">云IDS</p>
        </el-col>
        <el-col :span="15" class="description">
          <p>WEBIDS入侵检测，实时更新安全规则，发现攻击后YUNDUN会进行实时记录，但不做攻击拦截。如需进行后续的入侵防御，请开启<a href="/console/red-guard#/" class="a-link">红网卫士</a>服务。</p>
        </el-col>
        <el-col :span="6">
          <el-select v-model="cloudIds.status" @change="updateCloudIds" class="fr" >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import SourceSpeedResource from 'cloudSpeed/resource/SourceSpeedResource'
import SourceSpeedCommonResource from 'cloudSpeed/resource/SourceSpeedCommonResource'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'

export default {
  name: 'cloud-ids',
  components: {
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      cloudIds: {
        init: true,
        status: ''
      },
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      useRedGuard: '',
      redGuardUrl: '',
      show: false
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.redGuardUrl = `/console/red-guard#/websiteList/console/${this.domainId}/basic`
    const params = {
      domain: this.domainId
    }
    SourceSpeedCommonResource.queryDomainInfo(params).then(res => {
      const data = res.data.data
      if (data.hwws_status === '1') {
        this.useRedGuard = true
      } else {
        this.fetchCloudIds()
      }
      this.show = true
    })
  },
  methods: {
    fetchCloudIds() {
      SourceSpeedResource.getCloudIds(this.domainId).then(res => {
        const cloudIds = res.data.data.cloud_ids
        this.cloudIds.status = cloudIds.status
      })
    },
    updateCloudIds() {
      if (this.cloudIds.init) {
        this.cloudIds.init = false
        return
      }
      let params
      if (this.cloudIds.status === 'on') {
        params = {
          status: 'on',
          rank: 'strict'
        }
      } else {
        params = {
          status: 'off'
        }
      }
      SourceSpeedResource.putCloudIds(this.domainId, params).then(res => {
        this.operationSucceed()
      })
    }
  }
}
</script>

<style scoped>
</style>
