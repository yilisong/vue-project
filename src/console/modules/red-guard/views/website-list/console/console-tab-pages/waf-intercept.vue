<template lang="html">
  <!-- 502/504页面定制 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">WAF拦截页面定制</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>定制专属WAF拦截页面，不开启是默认使用红网卫士提供的拦截页面</p>
      </el-col>
      <el-col :span="6">
        <div class="fr">
          <el-select v-model="type" @change="updateWafIntercept(content)" placeholder="请选择">
            <el-option v-for="(item, index) in typeOption" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21">
        <Tip class="tip" :content="tipContent" mode="static"/>
      </el-col>
    </el-row>
    <upload-html v-if="type === 'custom'" :html="content" v-on:updateHtml="updateWafIntercept" ></upload-html>
  </el-card>
</template>

<script>
import UploadHtml from 'common/components/CustomizationPage/upload-html'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import SourceGuardResource from 'src/console/modules/red-guard/resource/SourceGuardResource'

export default {
  name: 'waf-intercept',
  components: {
    UploadHtml,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      domainId: '',
      init: true,
      content: '',
      type: '',
      typeOption: [{
          value: 'default',
          label: '默认YUNDUN错误页面'
        },
        {
          value: 'custom',
          label: '自定义HTML'
        }
      ],
      tipContent: ['当启用自定义HTML模式，可以通过编辑HTML代码自定义拦截页面，代码中不能包含JS']
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchWafIntercept()
  },
  methods: {
    fetchWafIntercept() {
      SourceGuardResource.getWafIntercept(this.domainId).then(res => {
        const data = res.data.data.waf_block_diy_page
        this.type = data.type
        this.content = data.content
      })
    },
    updateWafIntercept(html) {
      if (this.init) {
        this.init = false
        return
      }
      this.content = html
      let params
      if (this.type === 'off') {
        params = {
          status: 'off',
          type: 'custom',
          content: this.content
        }
      } else {
        params = {
          status: 'on',
          type: this.type,
          content: this.content
        }
      }
      SourceGuardResource.putWafIntercept(this.domainId, params).then(res => {
        this.windowMessage(res.data.status.message)
      })
    }
  }
}
</script>

<style scoped>
</style>
