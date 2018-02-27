<template lang="html">
  <el-dialog title="新增替身镜像
" :closeOnClickModal="true" v-model="showAddMirrorVisible" :close-on-click-modal="false" :show-close="false" @close="triggerAddMirrorVisible(false)">
    <div class="addMirrorInfo">
      <div>1.可以批量添加域名，目前暂不支持HTTPS。</div>
      <div>2.备份内容配置：当选择首页时，爬虫只抓取首页内容；如果配置了全站，则抓取所有页面。</div>
      <div>3.每日定时更新：如果开启了每日定时更新，那么我们会在每日凌晨四点左右开始对您的网站进行抓取更新，如果没有开启则不会进行更新。</div>
    </div>
    <el-row :gutter="12" class="first_row">
      <el-col :span="4" class="add_title"><span class="redStar">*</span>网站列表：</el-col>
      <el-col :span="19" class="addMirrorTable">
        <el-table :data="websiteList" element-loading-text="拼命加载中" fit style="width: 100%" height="250">
          <el-table-column prop="" label="域名(请输入替身镜像需要的域名)" align="left" width="300">
            <template scope="scope">
              <span v-if="scope.row.disabled === false">
                <el-row :gutter="12">
                  <!-- <el-col :span="6">
                    <el-select v-model="scope.row.selectVal" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col> -->
                  <el-col :span="24">
                    <el-input type="text" v-model="scope.row.domain" :readonly="scope.row.disabled" :class="scope.row.borderNone" @blur="testDomain(scope.row)"></el-input>
                  </el-col>
                </el-row>
              </span>
              <span v-else>
                <el-row :gutter="12">
                  <el-col :span="24">
                    <el-input type="text" v-model="scope.row.domain" :readonly="scope.row.disabled" :class="scope.row.borderNone" @blur="testDomain(scope.row)"></el-input>
                  </el-col>
                </el-row>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作"  align="right">
            <template scope="scope">
              <el-popover ref="ifDelWebsite" placement="top" width="100" trigger="click" v-model="popoverArray[scope.$index].flag">
                <p>确认删除当前行的域名吗？</p>
                <div style="text-align: right; margin: 0">
                  <i-button size="mini" type="text" @click="handleCancel(scope.$index)">取消</i-button>
                  <i-button type="primary" size="mini" @click="handleConf(scope.$index)">确定</i-button>
                </div>
              </el-popover>
              <i-button type="text" icon="delete" v-popover:ifDelWebsite></i-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="1">
        <i-button class="addbtn" type="primary" icon="fa-cart-plus" @click="addMirrorListTable">+</i-button>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="first_row">
      <el-col :span="4" class="add_title">备份内容配置：</el-col>
      <el-col :span="8">
        <el-radio-group v-model="radio">
          <el-radio :label="0">首页</el-radio>
          <el-radio :label="1">全站</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <el-row :gutter="12" class="first_row">
      <el-col :span="4" class="add_title">每日定时更新：</el-col>
      <el-col :span="20">
        <el-switch v-model="upDateTimeValue" on-color="#8aca36" off-color="#c2c2c2" on-value="1" off-value="0"></el-switch>
        <span class="marginLeft2">采用独家智能算法，每日定时抓取页面内容</span>
      </el-tooltip>
      </el-col>
    </el-row>
    <div slot="footer">
      <i-button @click="closeAddDoubleMirrorDialog" size="small">取 消</i-button>
      <i-button type="primary" @click="saveAddMirror" size="small">确 定</i-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import Rul from 'common/utils/verify'

export default {
  components: {
    Rul
  },
  data() {
    return {
      popoverArray: [],
      websiteList: [],
      websiteListB: [],
      upDateTimeValue: '0',
      radio: 0,
      addMirrorList: [],
      options: [{
        value: 'http://',
        label: 'http://'
      }, {
        value: 'https://',
        label: 'https://'
      }]
    }
  },
  computed: {
    showAddMirrorVisible() {
      return this.$store.state.dialog.addMirror.visible
    }
  },
  created() {
  },
  methods: {
    testDomain(scope) {
      const domain = scope.domain
      if (domain === '') {
        this.$message({
          showClose: true,
          message: '域名不能为空',
          type: 'error'
        })
        return false
      } else if (!Rul.domain.test(domain)) {
        this.$message({
          showClose: true,
          message: '域名格式不正确，请重新填写',
          type: 'error'
        })
        return false
      }
    },
    closeAddDoubleMirrorDialog() {
      this.websiteList = []
      this.upDateTimeValue = '0'
      this.radio = 0
      this.triggerAddMirrorVisible(false)
    },
    saveAddMirror() {
      if (this.websiteList.length < 1) {
        this.$message({
          showClose: true,
          message: '域名不能为空',
          type: 'error'
        })
        return false
      }
      const domain = []
      for (let i = 0; i < this.websiteList.length; i++) {
        // if (this.websiteList[i].selectVal === '') {
        //   this.$message({
        //     showClose: true,
        //     message: '请选择域名协议',
        //     type: 'error'
        //   })
        //   return false
        // }
        if (this.websiteList[i].domain === '') {
          this.$message({
            showClose: true,
            message: '域名不能为空',
            type: 'error'
          })
          return false
        } else if (!Rul.domain.test(this.websiteList[i].domain)) {
          this.$message({
            showClose: true,
            message: '域名格式不正确，请重新填写',
            type: 'error'
          })
          return false
        } else {
          // domain.push(this.websiteList[i].selectVal + this.websiteList[i].domain)
          domain.push('http://' + this.websiteList[i].domain)
        }
      }
      const data = {
        domain,
        regular_update: this.upDateTimeValue,
        backup_content: this.radio
      }
      const pageSize = this.$store.state.doubleMirror.pageSize
      const params = {
        data,
        page: {
          page: 1,
          per_page: pageSize
        }
      }
      this.addDoubleMirror(params)
      setTimeout(() => {
        const statusCode = this.$store.state.doubleMirror.statusCode
        if (statusCode === 1) {
          this.websiteList = []
          this.upDateTimeValue = '0'
          this.radio = 0
          this.triggerAddMirrorVisible(false)
        }
      },1000)
      /*保存方法调用*/
    },
    // delete 弹框
    handleCancel(index) {
      this.popoverArray[index].flag = false
      return
    },
    handleConf(index) {
      this.popoverArray[index].flag = false
      this.websiteList.splice(index, 1)
    },
    addMirrorListTable() {
      if (this.websiteList.length > 19) {
        this.$message({
          showClose: true,
          message: '已达上限,无法添加',
          type: 'error'
        })
        return false
      }
      this.websiteList.unshift({
        selectVal: '',
        domain: '',
        disabled: false,
        display: 'displayBlock'
      })
      this.popoverArray.push({ flag: false })
    },
    ...mapActions([
      'addDoubleMirror',/*save*/
      'triggerAddMirrorVisible'/*增加弹框*/
    ])
  }
}
</script>

<style scoped>
  .addMirrorInfo {
    border: 1px solid #abd3f5;
    padding: 10px 10px;
    background-color: #f5fafd;
  }

  .addbtn {
    margin-left: -9px;
  }
</style>
<style>
  .borderNone input {
    border: none;
  }
  .el-dialog__body {
    padding: 20px 20px!important;
    color: #48576a;
    font-size: 14px;
    border-bottom: 2px solid #eaeaea;
  }
  .redStar {
    color: red;
  }
  .add_title {
    text-align: right;
  }
  .first_row {
    margin-top: 20px;
  }
  .addMirrorTable .el-table {
    border: none;
  }
  .addMirrorTable .el-table tr:hover, .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff;
  }
</style>
