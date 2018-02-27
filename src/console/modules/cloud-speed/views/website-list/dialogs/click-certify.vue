<template lang="html">
  <!-- 点击认证 -->
  <el-dialog title="点击认证" :closeOnClickModal="true" :visible.sync="clickCertifyVisible" size="tiny" :close-on-click-modal="true" @open="initClickCertifyDialog" @close="closeClickCertify">
    <div v-loading="clickCertifyDialog.loading" class="content">
      <el-radio-group v-model="clickCertifyDialog.certifyStyle">
        <el-radio class="radio" label="txt">使用txt记录认证</el-radio>
        <i class="divided"></i>
        <el-radio class="radio" label="file">使用文件认证</el-radio>
      </el-radio-group>
      <div class="click-certify-content">
        <div class="" v-if="clickCertifyDialog.certifyStyle === 'txt'">
          <p>
            第一步：如果您是域名的所有者，请到域名当前解析商处给该域名添加如下TXT记录：
          </p>
          <p>
            主机记录：{{clickCertifyDialog.recordName}}
          </p>
          <p>
            记录值：{{clickCertifyDialog.recordValue}}
          </p>
          <p>
            第二步：完成添加后，请点击“完成认证”按钮。
          </p>
        </div>
        <div class="" v-else>
          <p>
            第一步：创建内容为 {{clickCertifyDialog.content}} 的yunduncdn.txt 文件
          </p>
          <p>
            第二步：将yunduncdn.txt文件上传到网站{{domainName}}的根目录下
          </p>
          <p>
            第三步：完成操作后请点击“完成认证”按钮
          </p>
        </div>
      </div>
    </div>
    <div slot="footer">
      <i-button @click="clickCertifyVisible = false">取消</i-button>
      <i-button type="primary" @click="clickCertifyComplete" :loading="clickCertifyDialog.loading">完成认证</i-button>
    </div>
  </el-dialog>
</template>

<script>
import SourceSpeedResource from '../../../resource/SourceSpeedResource'
import '../assets/styles/website-help.css'
import {
  mapActions
} from 'vuex'

export default {
  props: {
    domainId: {
      type: String,
      default: true
    }
  },
  data() {
    return {
      clickCertifyVisible: false,
      clickCertifyDialog: {
        loading: true,
        certifyStyle: 'txt',
        domainName: '',
        recordName: '',
        recordValue: '',
        content: ''
      }
    }
  },
  created() {
    this.$store.watch(
      state => state.dialog.clickCertify.visible,
      visible => {
        this.clickCertifyVisible = visible
      }
    )
  },
  computed: {
    domainName() {
      return this.$store.state.website.domain.name
    }
  },
  methods: {
    ...mapActions([
      'triggerClickCertifyVisible'
    ]),
    closeClickCertify() {
      this.triggerClickCertifyVisible(false)
    },
    initClickCertifyDialog() {
      const params = {
        domain_id: this.domainId
      }
      this.generateTxtRecords(params)
      this.generateFileCode(params)
    },
    generateTxtRecords(params) {
      SourceSpeedResource.generateTxtRecords(params).then(res => {
        const data = res.data.data
        this.clickCertifyDialog.recordName = data.record_name
        this.clickCertifyDialog.recordValue = data.record_value
        this.clickCertifyDialog.loading = false
      })
    },
    generateFileCode(params) {
      SourceSpeedResource.generateFileCode(params).then(res => {
        const data = res.data.data
        this.clickCertifyDialog.content = data.content
        this.clickCertifyDialog.loading = false
      })
    },
    clickCertifyComplete() {
      this.clickCertifyDialog.loading = true
      const params = {
        domain_id: this.domainId
      }
      if (this.clickCertifyDialog.certifyStyle === 'txt') {
        SourceSpeedResource.postCertifyTxtComplete(params).then(res => {
          this.refreschList()
          this.correctAnswer(res)
        }).catch(res => {
          this.errorAnswer()
        })
      } else {
        SourceSpeedResource.postCertifyFileComplete(params).then(res => {
          this.refreschList()
          this.correctAnswer(res)
        }).catch(res => {
          this.errorAnswer()
        })
      }
    },
    correctAnswer(res) {
      this.clickCertifyVisible = false
      this.windowMessage(res.data.status.message)
      this.triggerClickCertifyVisible(false)
    },
    errorAnswer() {
      this.clickCertifyVisible = false
      this.triggerClickCertifyVisible(false)
    },
    refreschList() {
      this.$store.commit({
        type: 'WEBSITE_ADDED',
        websiteAdded: true
      })
    }
  }
}
</script>

<style scoped>
.click-certify-content {
  margin-top: 20px;
}
</style>
