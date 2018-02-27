<template lang="html">
  <el-dialog title="更新替身镜像" :closeOnClickModal="true" v-model="showUpDateMirrorVisible" :close-on-click-modal="false" :show-close="false" @close="triggerUpDateMirrorVisible(false)">
    <el-row :gutter="15" class="first_row">
      <el-col :span="4">更新内容：</el-col>
      <el-col :span="20" class="addMirrorTable">
        <span @click="totalStationToUpdate">
          <el-radio class="radio" v-model="sourceAgreement" label="1">全站更新</el-radio>
        </span>
        <span @click="urlStationToUpdate" class="updateUrl">
          <el-radio class="radio" v-model="sourceAgreement" label="2">指定URL更新</el-radio>
        </span>
        <div class="tableMargin" id="tableMargin">
          <el-input class="textarea_style" type="textarea" :rows="8"  placeholder="请输入指定URL，格式如http://www.yundun.com" v-model="upDateMirrorListBackups"></el-input>
        </div>
      </el-col>
    </el-row>
    <div slot="footer">
      <i-button @click="closeUpDateMirror" size="small">取 消</i-button>
      <i-button type="primary" @click="saveUpdateMirror" size="small">确 定</i-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import Rul from 'common/utils/verify'

export default {
  components: {
  },
  data() {
    return {
      sourceAgreement: '2',
      upDateMirrorList: '',
      upDateMirrorListBackups: ''
    }
  },
  created() {
    
  },
  computed: {
    showUpDateMirrorVisible() {
      return this.$store.state.dialog.upDateMirror.visible
    },
    showMirrorDomain() {
      return this.$store.state.domain.package.doubleMirrorDomain
    },
    showMirrorDomainProtocol() {
      return this.$store.state.domain.package.doubleMirrorDomainProtocol
    },
    showPageSize() {
      return this.$store.state.doubleMirror.size
    }
  },
  methods: {
    closeUpDateMirror() {
      this.upDateMirrorListBackups = ''
      this.sourceAgreement = '2'
      this.urlStationToUpdate()
      this.triggerUpDateMirrorVisible(false)
    },
    saveUpdateMirror() {
      const specialurlReg = Rul.defaultUrl
      let data
      let specialurlLength
      if (this.sourceAgreement === '2') {
        if (this.upDateMirrorListBackups === '') {
          this.$message({
            showClose: true,
            message: '指定URL更新下的域名不能为空',
            type: 'error'
          })
          return false
        }
        const urls = this.upDateMirrorListBackups.split('\n')
        data = {
          domain: this.showMirrorDomainProtocol + '://' + this.showMirrorDomain,
          update_type: 'appoint',
          urls
        }
        specialurlLength = urls.length
        if (specialurlLength > 10) {
          this.$message({
              showClose: true,
              message: '指定URL更新下的域名一次性最多更新10条',
              type: 'error'
            })
            return false
        }
        /*指定URL刷新 格式验证*/
        let specialurlArrTest
        for (let i = 0; i < specialurlLength; i++) {
          if (!specialurlReg.test(data.urls[i])) {
            this.$message({
              showClose: true,
              message: '指定URL更新下的域名格式有误',
              type: 'error'
            })
            return false
          } else if (!Rul.httpUrl.test(data.urls[i])) {
            this.$message({
              showClose: true,
              message: '暂不支持HTTPS协议',
              type: 'error'
            })
            return false
          } 
          /*去重*/
          specialurlArrTest = data.urls[i]
          for (let j = i + 1; j < specialurlLength; j++) {
            if (specialurlArrTest === data.urls[j]) {
              this.$message({
                showClose: true,
                message: '指定URL更新下的域名有重复',
                type: 'error'
              })
              return false
            }
          }
        }
      } else {
        data = {
          domain: this.showMirrorDomainProtocol + '://' + this.showMirrorDomain,
          update_type: 'global',
          id: this.$store.state.doubleMirror.id
        }
      }
      const pageSize = this.$store.state.doubleMirror.pageSize
      const params = {
        data,
        page: {
          page: this.showPageSize,
          per_page: pageSize
        }
      }
      this.refreshDoubleMirror(params)
      setTimeout(() => {
        const statusCode = this.$store.state.doubleMirror.statusCode
        if (statusCode === 1) {
          this.triggerUpDateMirrorVisible(false)
          this.sourceAgreement = '2'
          this.urlStationToUpdate()
        }
      },1000)
    },
    ...mapActions([
      'refreshDoubleMirror',/*save*/
      'triggerUpDateMirrorVisible'/*刷新弹框*/
    ]),
    totalStationToUpdate() {
      document.getElementById('tableMargin').style.display = 'none'
    },
    urlStationToUpdate() {
      document.getElementById('tableMargin').style.display = 'block'
    }
  }
}
</script>

<style lang="css" scoped>
  .tableMargin {
    margin-top: 20px;
  }
  .updateUrl {
    margin-left: 20px;
  }
</style>
<style>
  .el-dialog__body {
    padding: 20px 20px!important;
    color: #48576a;
    font-size: 14px;
    border-bottom: 2px solid #eaeaea;
  }
  .borderNone input {
    border: none;
  }
  .addMirrorTable .el-table tr:hover, .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff;
  }
  .addMirrorTable .el-table__body-wrapper {
    overflow-y: auto!important;
  }
</style>

