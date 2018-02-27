<template lang="html">
<console-page-layout title="替身镜像列表">
  <ComboTable :total="getDoubleMirrorTotal" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getDoubleMirrorPage" @on-current-change="getDoubleMirrorPage">
    <div slot="body" :data-value="nearlyOut">
      <div class="capacityInfo">
        <span>当前账号备份总容量 <span  class="clo">{{getBackupInfo.total}}</span>，已使用容量 <span class="black">{{getBackupInfo.used}}</span>，剩余 <span class="clo">{{getBackupInfo.remain}}</span>。
          <span v-if="getBackupInfo.remain === '0MB'">
            <a href="/payment#/setting-double-mirror" class="buyMore">购买更多容量</a>
          </span>
          <span v-else-if="nearlyOut.expiry_flag === 2">
            <a href="/payment#/setting-double-mirror" class="buyMore">购买更多容量</a>
          </span>
          <span v-else-if="nearlyOut.expiry_flag === 1">
            <a href="/payment#/setting-double-mirror" class="buyMore">购买更多容量</a>
          </span>
          <span v-else>
            <a class="buyMore" @click="dialogFormVisible = true">购买更多容量</a>
          </span>
        </span>
        <span class="expiry_time">到期时间：<span>{{getBackupInfo.expiry_time}}</span></span>
      </div>
      <div class="nearly-out" v-if="backupInfoStatus === 1">
        <div>
          <div v-if="nearlyOut.exhaustion === 2">
            您的可用容量已不足10%，请您尽快增加可用容量。当可用容量用完时，替身镜像将停止更新。
          </div>
          <div v-else-if="nearlyOut.exhaustion === 4">
            您的可用容量已使用完毕，替身镜像将无法更新，请尽快购买更多容量。
          </div>
          <div v-else></div>
        </div>
        <div>
          <div v-if="nearlyOut.expiry_flag === 16">您的可用时间已不足7天，请您及时续费。到期后我们将会为您保留7天的替身镜像，到期7天后将会回收占用的空间</div>
          <div v-else-if="nearlyOut.expiry_flag === 8">您的可用时间已不足3天，请您及时续费。到期后我们将会为您保留7天的替身镜像，到期7天后将会回收占用的空间。</div>
          <div v-else-if="nearlyOut.expiry_flag === 4">您的可用时间已不足1天，请您及时续费。到期后我们将会为您保留7天的替身镜像，到期7天后将会回收占用的空间。</div>
          <div v-else-if="nearlyOut.expiry_flag === 2">您的替身镜像已于{{ nearlyOut.expiry_time }}到期，请您及时续费，到期7天后我们将会回收占用的空间。</div>
          <div v-else-if="nearlyOut.expiry_flag === 1">您的替身镜像已到期超过7天，我们已回收占用的空间。</div>
          <div v-else></div>
        </div>
      </div>
      <div v-else></div>
      <div class="header">
        <span v-if="nearlyOut.expiry_flag === 1">
          <i-button type="primary" icon="fa-cart-plus" class="margin-15r" @click="info('expiration7')">添加网站</i-button>
        </span>
        <span v-else-if="nearlyOut.expiry_flag === 2">
          <i-button type="primary" icon="fa-cart-plus" class="margin-15r" @click="info('expiration')">添加网站</i-button>
        </span>
        <span v-else-if="nearlyOut.exhaustion === 4">
          <i-button type="primary" icon="fa-cart-plus" class="margin-15r" @click="info('full')">添加网站</i-button>
        </span>
        <span v-else>
          <i-button type="primary" icon="fa-cart-plus" class="margin-15r" @click="addDoubleMirror">添加网站</i-button>
        </span>
        <i-button type="default" icon="fa-cart-plus" class="margin-15r" @click="delAffirm">删除</i-button>
        <div class="fr">
          <el-input class="search" placeholder="请输入域名名称进行模糊查询" v-model="searchMirrorVal" size="small" :on-icon-click="handleSearch" icon="search">
          </el-input>
        </div>
      </div>
      <el-table :data="getDoubleMirrorData" element-loading-text="拼命加载中" fit  style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column prop="domain" label="域名" align="left" width="250" class="domainTdWidth"></el-table-column>
        <el-table-column prop="backup_size" label="备份大小" align="left"></el-table-column>
        <el-table-column prop="" label="应用功能" align="left">
          <template scope="scope">
            <div v-if="icoStatus === 1">
              <el-tooltip v-if="scope.row.hwws_status === 4" content="安全替身功能已开启" placement="top" effect="light">
                <i class="red-guard-active" @click="info('expiration')"></i>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.hwws_status === 3" content="安全替身功能需要配置红网卫士" placement="top" effect="light">
                <i class="red-guard" @click="info('expiration')"></i>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.hwws_status === 2" content="安全替身功能需要购买红网卫士" placement="top" effect="light">
                <i class="red-guard" @click="info('expiration')"></i>
              </el-tooltip>
              <el-tooltip v-else content="安全替身功能需要购买红网卫士" placement="top" effect="light">
                <i class="red-guard" @click="info('expiration')"></i>
              </el-tooltip>
              <span>|</span>
              <el-tooltip v-if="scope.row.webcdn_status === 4" content="永远在线功能已开启" placement="top" effect="light">
                <i class="cloud-speed-active" @click="info('expiration')"></i>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.webcdn_status === 3" content="永远在线功能需要配置云加速" placement="top" effect="light">
                <i class="cloud-speed" @click="info('expiration')"></i>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.webcdn_status === 2" content="永远在线功能需要开启云加速" placement="top" effect="light">
                <i class="cloud-speed" @click="info('expiration')"></i>
              </el-tooltip>
              <el-tooltip v-else content="永远在线功能需要购买云加速" placement="top" effect="light">
                <i class="cloud-speed" @click="info('expiration')"></i>
              </el-tooltip>
            </div>
            <div v-else>
              <el-tooltip v-if="scope.row.hwws_status === 4" content="安全替身功能已开启" placement="top" effect="light">
                <i class="red-guard-active" @click="jumpTo(scope.row.hwws_status, scope.row.hwws_domain_id)"></i>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.hwws_status === 3" content="安全替身功能需要配置红网卫士" placement="top" effect="light">
                <i class="red-guard" @click="jumpTo(scope.row.hwws_status, scope.row.hwws_domain_id)"></i>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.hwws_status === 2" content="安全替身功能需要购买红网卫士" placement="top" effect="light">
                <i class="red-guard" @click="jumpTo(scope.row.hwws_status, scope.row.hwws_domain_id)"></i>
              </el-tooltip>
              <el-tooltip v-else content="安全替身功能需要购买红网卫士" placement="top" effect="light">
                <i class="red-guard" @click="jumpTo(scope.row.hwws_status, scope.row.hwws_domain_id)"></i>
              </el-tooltip>
              <span>|</span>
              <el-tooltip v-if="scope.row.webcdn_status === 4" content="永远在线功能已开启" placement="top" effect="light">
                <i class="cloud-speed-active" @click="jumpToWebcdn(scope.row.webcdn_status, scope.row.webcdn_domain_id)"></i>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.webcdn_status === 3" content="永远在线功能需要配置云加速" placement="top" effect="light">
                <i class="cloud-speed" @click="jumpToWebcdn(scope.row.webcdn_status, scope.row.webcdn_domain_id)"></i>
              </el-tooltip>
              <el-tooltip v-else-if="scope.row.webcdn_status === 2" content="永远在线功能需要开启云加速" placement="top" effect="light">
                <i class="cloud-speed" @click="jumpToWebcdn(scope.row.webcdn_status, scope.row.webcdn_domain_id)"></i>
              </el-tooltip>
              <el-tooltip v-else content="永远在线功能需要购买云加速" placement="top" effect="light">
                <i class="cloud-speed" @click="jumpToWebcdn(scope.row.webcdn_status, scope.row.webcdn_domain_id)"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="final_fetch_time" label="最后抓取时间" align="left"></el-table-column>
        <el-table-column prop="final_fetch_status_desc" label="最后抓取状态" align="left"></el-table-column>
        <el-table-column prop="" label="操作" align="left">
          <template scope="scope">
            <span v-if="nearlyOut.expiry_flag === 1">
              <i-button type="text" @click="info('expiration7')">立即更新</i-button>
              <span class="">|</span>
              <i-button type="text" @click="info('expiration7')">预览</i-button>
              <span class="">|</span>
              <i-button type="text" @click="info('expiration7')">配置</i-button>
            </span>
            <span v-else-if="nearlyOut.expiry_flag === 2">
              <i-button type="text" @click="info('expiration')">立即更新</i-button>
              <span class="">|</span>
              <i-button type="text" @click="info('expiration')">预览</i-button>
              <span class="">|</span>
              <i-button type="text" @click="info('expiration')">配置</i-button>
            </span>
            <span v-else-if="nearlyOut.exhaustion === 4">
              <i-button type="text" @click="info('full')">立即更新</i-button>
              <span class="">|</span>
              <i-button type="text" @click="info('full')">预览</i-button>
              <span class="">|</span>
              <i-button type="text" @click="info('full')">配置</i-button>
            </span>
            <span v-else>
              <i-button type="text" @click="handleMirrorlist('UpDate', scope.row)">立即更新</i-button>
              <span class="">|</span>
              <i-button type="text" @click="handleMirrorlist('Previews', scope.row, scope.row.webcdn_protected_status, scope.row.protocol)">预览</i-button>
              <span class="">|</span>
              <i-button type="text" @click="handleMirrorlist('Deploy', scope.row)">配置</i-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <up-date-mirror></up-date-mirror>
  <deploy-mirror></deploy-mirror>
  <add-mirror></add-mirror>
  <el-dialog title="购买更多容量" :visible.sync="dialogFormVisible" class="buyMoreDialog">
    <div>购买更多替身镜像的容量，请您联系我们的客服</div>
    <div>客服热线:</div>
    <div>400-999-7070</div>
    <div>021-60310101</div>
    <div>客服QQ:</div>
    <div><span @click="openQQ" class="cursorBuy">800090007</span></div>
    <div slot="footer" class="dialog-footer">
      <i-button type="primary" @click="dialogFormVisible = false">确 定</i-button>
    </div>
  </el-dialog>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import Help from 'common/utils/help'
import UpDateMirror from './Dialogs/UpDateMirror'
import DeployMirror from './Dialogs/DeployMirror'
import AddMirror from './Dialogs/AddMirror'
import TipDirective from 'common/components/Tip/Tip.directive'
import Tip from 'common/components/Tip/Tip'
import Rul from 'common/utils/verify'
import { mapActions } from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ComboTable,
    UpDateMirror,
    DeployMirror,
    AddMirror,
    Tip,
    Rul
  },
  directives: {
    tip: TipDirective
  },
  computed: {
    getDoubleMirrorData() {
      return this.$store.state.doubleMirror.list
    },
    getDoubleMirrorTotal() {
      return this.$store.state.doubleMirror.total
    },
    getBackupInfo() {
      return this.$store.state.doubleMirror.backupInfo
    },
    nearlyOut() {
      const a = this.$store.state.doubleMirror.backupInfo
      if (a.exhaustion === 0 && a.expiry_flag === 0) {
        this.backupInfoStatus = 3
      } else {
        this.backupInfoStatus = 1
      }
      if (a.expiry_flag === 1 || a.expiry_flag === 2) {
        this.icoStatus = 1
      } else {
        this.icoStatus = 2
      }
      return a
    }
  },
  methods: {
    messageShow(messageInfo) {
      this.$message({
        showClose: true,
        message: messageInfo,
        type: 'error'
      })
    },
    info(step) {
      switch (step) {
        case 'expiration7': {
          this.messageShow('您的套餐已过期，请您续期后再操作')
          break
        }
        case 'expiration': {
          this.messageShow('您的套餐已过期，请您续期后再操作')
          break
        }
        case 'full': {
          this.messageShow('没有可用的磁盘容量，请您升级套餐后再操作')
          break
        }
        default:
      }
    },
    jumpTo(status, id) {
      switch (status) {
        case 1:
          window.location.href = '/red-guard'
        break
        case 2:
          window.location.href = '/console/red-guard#/websiteList'
        break
        case 3:
          window.location.href = `/console/red-guard#/websiteList/console/${id}/basic`
        break
        default:
      }
    },
    jumpToWebcdn(status, id) {
      switch (status) {
        case 1:
          // window.location.href = '/production#/cloudSpeed'
          window.location.href = '/console/cloud-speed#/websiteList'
        break
        case 2:
          window.location.href = '/console/cloud-speed#/websiteList'
        break
        case 3:
          window.location.href = `/console/cloud-speed#/websiteList/console/${id}/perform`
        break
        default:
      }
    },
    openQQ() {
      Help.linkService()
    },
    ...mapActions([
      'getDeployDoubleMirror',/*获取配置信息*/
      'deleteDoubleMirror',/*删除列表*/
      'getDoubleMirrorList',/*获取列表*/
      'changeDomainId',/**/
      'triggerUpDateMirrorVisible',/*刷新弹框*/
      'triggerDeployMirrorVisible',/*配置弹框*/
      'triggerAddMirrorVisible'/*增加弹框*/
    ]),
    getDoubleMirrorPage(current, size) {
      this.getDoubleMirrorList({
        page: current,
        per_page: size
      })
    },
    handleSearch() {
      this.getDoubleMirrorList({ domain: this.searchMirrorVal })
    },
    /*********************delete  row  start**************************/
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delAffirm() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择删除项!'
        })
        return
      }
      this.$confirm(<div>
        <p>此操作将永久删除该镜像，是否继续？</p>
        <p class="confirm-warning">替身镜像删除后，云加速以及红网卫士相关功能均将关闭！</p>
        </div>, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delWebsite(this.multipleSelection)
      })
    },
    delWebsite(selection) {
      const delArray = []
      selection.forEach(item => {
        delArray.push(item.id)
      })
      const data = {
        ids: delArray
      }
      const pageSize = this.$store.state.doubleMirror.pageSize
      const params = {
        data,
        page: {
          page: 1,
          per_page: pageSize
        }
      }
      this.deleteDoubleMirror(params)
    },
    handleMirrorlist(operate, row, index) {
      const id = row.id
      const domain = row.domain
      const protocol = row.protocol
      this.$store.dispatch('changeDomain', domain)
      this.$store.dispatch('changeDomainId', id)
      this.$store.dispatch('changeDomainProtocol', protocol)
      const parmas = { id }
      const tmphost = protocol + '://' + domain + '/yundun_setcookies/?server='
      const tmpUrl = tmphost + domain + '&cmd=view&backname=system'
      const returnUrl = tmpUrl + '&&returnUrl=' + domain
      this.$store.state.doubleMirror.id = id
      switch (operate) {
        case 'UpDate':
          this.$store.state.doubleMirror.sourceAgreementRadios = '2'
          this.triggerUpDateMirrorVisible(true)
          break
        case 'Previews':
          if (index === 1) {
            window.open(returnUrl)
          } else {
            window.open('https://www.yundun.com/html_source_view_service/?url=' + protocol + '://' + domain)
          }
          break
        case 'Deploy':
          this.getDeployDoubleMirror(parmas)
          this.triggerDeployMirrorVisible(true)
          break
        default:
      }
    },
    addDoubleMirror() {
      this.triggerAddMirrorVisible(true)
    }
  },
  created() {
    this.getDoubleMirrorPage(1, this.pageSize)
  },
  data() {
    return {
      pageSizes: [5, 10, 15, 20],
      pageSize: 10,
      multipleSelection: [],
      searchMirrorVal: '',
      dialogFormVisible: false,
      backupInfoStatus: 0,
      icoStatus: 2
    }
  }
}
</script>

<style scoped>
.header {
  margin-bottom: 20px;
  margin-top: 20px;
}
.search {
  width: 300px;
}
.fr {
  float: right;
}
.el-table__body i {
  cursor: pointer;
}
.expiry_time {
  float:right;
  margin-right: 10px;
}
.expiry_time span {
  color: #2d90e6;
}
</style>
<style>
  .el-table_1_column_2 .cell {
    overflow: hidden!important;
    text-overflow: ellipsis!important;
    white-space: nowrap!important;
  }
  .capacityInfo {
    border: 1px solid #abd3f5;
    padding: 10px 10px;
    background-color: #f5fafd;
  }
  .nearly-out {
    color: red;
    border: 1px solid red;
    padding: 10px 10px;
    background-color: rgb(253,234,234);
    margin: 16px 0;
  }
  .capacityInfo a, .capacityInfo a:hover, .capacityInfo a:focus {
    color: #2d90e6;
    background-color: #e1effb;
    border: 1px solid #2d90e6;
    padding: 5px 10px;
    margin-left: 10px;
    cursor: pointer;
  }
  .clo {
    color: #2d90e6;
  }
  .black {
    color: #000;
  }
  .buyMoreDialog .el-dialog--small {
    width: 400px!important;
  }
  .cursorBuy {
    cursor: pointer;
  }
  .confirm-warning {
    color: red;
  }
</style>
