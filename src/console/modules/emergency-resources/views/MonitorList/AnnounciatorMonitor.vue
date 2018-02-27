<template>
<console-page-layout title="故障列表">
  <ComboTable :total="total" :page-size="pageSize" :page-sizes="pageSizes" @on-size-change="getMalfunction" @on-current-change="getMalfunction">
    <div slot="body">
      <el-table :data="announciatorData" element-loading-text="拼命加载中" fit style="width: 100%">
        <el-table-column prop="" label="监控项目" align="left" width="250">
          <template scope="scope">
              <i-button type="text" @click="showMalfunctionDetails(scope.row.id)"  class="domainTdWidth_span">
                <div>{{scope.row.name}}</div>
                <div>{{scope.row.source_ip}}</div>
              </i-button>
            </template>
        </el-table-column>
        <el-table-column prop="protocol" label="监控协议" align="left"></el-table-column>
        <el-table-column prop="down_time" label="故障发生时间" align="left"></el-table-column>
        <el-table-column prop="" label="故障恢复时间" align="left">
          <template scope="scope">
              <span v-if="scope.row.status === '1'">{{scope.row.resume_time}}</span>
              <!-- <span v-else-if="scope.row.status === '2'">暂停</span>
              <span v-else-if="scope.row.status === '0'">宕机</span> -->
              <span v-else>未恢复</span>
            </template>
        </el-table-column>
        <el-table-column prop="" label="故障持续时间" align="left">
          <template scope="scope">
              <span>{{scope.row.duration}}</span>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </ComboTable>
  <el-dialog title="详情" :visible.sync="dialogTableVisible" class="announciatorMonitor_dialog">
    <div class="body addMonitorDialog">
      <div>
        <el-row :gutter="12" class="monitorProject">
          <el-col :span="24">项目监控：
            <span>{{basic.source_ip}}</span>
            <span>({{basic.name}})</span>
            <i v-if="Number(basic.alert_status) === 1" class="yun-icon yun-already-renew"></i>
            <i v-else class="yun-icon yun-downtime"></i>
          </el-col>
        </el-row>
        <el-row :gutter="12" class="">
          <el-col :span="4">监控协议：{{basic.protocol}}</el-col>
          <el-col :span="5">宕机联动：{{basic.linkage_result}}</el-col>
          <el-col :span="9">故障发生时间：{{basic.down_time}}</el-col>
          <el-col :span="6">故障持续时间：{{basic.duration}}</el-col>
        </el-row>
      </div>
      <div class="test">
        <div>
          <div class="line"></div>
          <div v-if="status === 1" class="tcLine1"></div>
          <div v-else-if="status === 2" class="tcLine2"></div>
          <div v-else-if="status === 3" class="tcLine3"></div>
          <div v-else-if="status === 4" class="tcLine4"></div>
          <div v-if="status === 4" class="caretRight4"><i class="el-icon-caret-right"></i></div>
          <div v-else class="caretRight"><i class="el-icon-caret-right"></i></div>
          <div v-if="status === 2" class="tcLineWaite"></div>
          <div v-else></div>
          <div class="step1">
            <div>
              <span v-if="status === 1">
                  <i class="yun-icon yun-icon-success yun-downtime-status"></i>
                </span>
              <span v-else-if="status < 1">
                  <i class="yun-icon yun-icon-wait-dis yun-downtime-done"></i>
                </span>
              <span v-else>
                  <i class="yun-icon yun-icon-wait yun-renew-success"></i>
                </span>
            </div>
            <div class="mesInfo">宕机</div>
          </div>
          <div class="step2">
            <div>
              <span v-if="status === 2">
                  <i class="yun-icon yun-icon-success yun-downtime-linkage"></i>
                </span>
              <span v-else-if="status < 2">
                  <i class="yun-icon yun-icon-wait-dis yun-downtime-linkage-done"></i>
                </span>
              <span v-else>
                  <i class="yun-icon yun-icon-wait yun-renew-success"></i>
                </span>
            </div>
            <!-- <div class="mesInfo">{{stepStatus|filterStatus}}</div> -->
            <div class="mesInfo">宕机联动</div>
          </div>
          <div class="step3">
            <div>
              <span v-if="status === 3">
                  <i class="yun-icon yun-icon-success yun-renew-linkage"></i>
                </span>
              <span v-else-if="status < 3">
                  <i class="yun-icon yun-icon-wait-dis yun-renew-done"></i>
                </span>
              <span v-else>
                  <i class="yun-icon yun-icon-wait yun-renew-success"></i>
                </span>
            </div>
            <div class="mesInfo">恢复</div>
          </div>
          <div class="step4">
            <div>
              <span v-if="status === 4">
                  <i class="yun-icon yun-icon-success yun-renew"></i>
                </span>
              <span v-else-if="status < 4">
                  <i class="yun-icon yun-icon-wait-dis yun-renew-linkage-done"></i>
                </span>
              <span v-else>
                  <i class="yun-icon yun-icon-wait el-icon-circle-check"></i>
                </span>
            </div>
            <div class="mesInfo">恢复联动</div>
          </div>
        </div>
      </div>
      <div class="messageInfo">
        <el-row :gutter="12" class="borderTest">
          <el-col :span="6">
            <div v-if="status < 1"></div>
            <div v-else-if="status > 1">
              <div>{{detailsData.step1.time}}</div>
            </div>
            <div v-else>
              <div>{{detailsData.step1.time}}</div>
              <div>
                <span>故障原因：</span>
                <span>{{detailsData.step1.down_reason}}</span>
              </div>
              <div>
                <span>故障通知：</span>
                <span>{{detailsData.step1.alert_type}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div v-if="status < 2"></div>
            <div v-else-if="status > 2">
              <div v-bind:class="{timeShow:Number(detailsData.step2.status)===1,timeHide:Number(detailsData.step2.status)===0}">{{detailsData.step2.time}}</div>
            </div>
            <div v-else>
              <div v-if="Number(detailsData.step2.status)===1">{{detailsData.step2.time}}</div>
              <div>
                <span>联动处理：</span>
                <span>{{detailsData.step2.down_operate}}</span>
              </div>
              <div v-if="Number(detailsData.step2.status)===1">
                <span>联动详情：</span>
                <span>{{detailsData.step2.linkage_result}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div v-if="status < 3"></div>
            <div v-else-if="status > 3">
              <div>{{detailsData.step3.time}}</div>
            </div>
            <div v-else>
              <div>{{detailsData.step3.time}}</div>
              <div>
                <span>故障持续：</span>
                <span>{{detailsData.step3.duration}}</span>
              </div>
              <div>
                <span>恢复通知：</span>
                <span>{{detailsData.step3.alert_type}}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div v-if="status < 4"></div>
            <div v-else-if="status > 4">
              <div v-if="Number(detailsData.step4.status)===1">{{detailsData.step4.time}}</div>
            </div>
            <div v-else>
              <div v-if="Number(detailsData.step4.status)===1">{{detailsData.step4.time}}</div>
              <div>
                <span>联动处理：</span>
                <span>{{detailsData.step4.resume_operate}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-dialog>
</console-page-layout>
</template>

<script>
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import ComboTable from 'common/components/ComboTable/ComboTable'
import SourceMonitorResource from '../../resource/SourceMonitorResource'
import ConversionTime from 'common/utils/conversionTime'
export default {
  components: {
    ConsolePageLayout,
    ConversionTime,
    ComboTable
  },
  data() {
    return {
      // stepStatus: 0,
      dialogTableVisible: false,
      announciatorData: [],
      pageSizes: [5, 10, 15, 20],
      pageSize: 10,
      total: 0,
      status: 1,
      finishStatus: 'success',
      basic: {},
      detailsData: {
        step1: {
          time: '',
          down_reason: '',
          alert_type: ''
        },
        step2: {
          time: '',
          down_operate: '',
          linkage_result: ''
        },
        step3: {
          time: '',
          alert_type: '',
          duration: ''
        },
        step4: {
          time: '',
          resume_operate: '',
          linkage_result: ''
        }
      }
    }
  },
  computed: {},
  created() {
    this.getMalfunction(1, this.pageSize)
  },
  // filters: {
  //   filterStatus(value) {
  //     const status = Number(value) === 0 ? '未设置' : '宕机联动'
  //     return status
  //   }
  // },
  methods: {
    getMalfunction(current, size) {
      this.getAlertList({
        page: current,
        per_page: size
      })
    },
    getAlertList(params) {
      SourceMonitorResource.getAlertList(params).then(response => {
        if (response.data.status.code === 1 && response.data.data) {
          const data = response.data.data
          this.total = parseInt(data.total, 10)
          this.announciatorData = []
          data.list.forEach((v, i) => {
            this.announciatorData.push({
              id: v.id,
              name: v.name,
              source_ip: v.source_ip,
              protocol: v.protocol,
              down_time: v.down_time,
              duration: ConversionTime.timeTohous(Number(v.duration)),
              status: v.status,
              resume_operate: v.resume_operate,
              resume_time: v.resume_time
            })
          })
        }
      })
    },
    showMalfunctionDetails(alertId) {
      const params = {
        alert_id: alertId
      }
      this.getMalfunctionDetails(params)
      this.dialogTableVisible = true
    },
    getMalfunctionDetails(params) {
      SourceMonitorResource.getMalfunctionDetails(params).then(response => {
        this.basic = {
          name: '暂无数据',
          source_ip: '暂无数据',
          alert_status: '暂无数据',
          protocol: '暂无数据',
          down_time: '暂无数据',
          linkage_result: '暂无数据',
          duration: 0,
          resume_time: '暂无数据'
        }
        if (response.data.status.code === 1 && response.data.data) {
          const data = response.data.data
          const step1 = data.step1
          const step2 = data.step2
          const step3 = data.step3
          const step4 = data.step4
          this.detailsData.step1 = step1
          this.detailsData.step2 = step2
          this.detailsData.step3 = step3
          this.detailsData.step3.duration = ConversionTime.timeTohous(Number(step3.duration))
          this.detailsData.step4 = step4
          if (!step4.time) {
            if (!step3.time) {
              if (!step2.time) {
                if (!step1.time) {
                  this.status = 0
                } else {
                  this.status = 1
                }
              } else {
                this.status = 2
              }
            } else {
              this.status = 3
            }
          } else {
            this.status = 4
          }
          // this.stepStatus = data.basic.type
          this.basic.alert_status = data.basic.alert_status
          this.basic.linkage_result = data.basic.linkage_result
          this.basic.down_time = data.basic.down_time
          this.basic.name = data.basic.name
          this.basic.protocol = data.basic.protocol
          this.basic.resume_time = data.basic.resume_time
          this.basic.protocol = data.basic.protocol
          this.basic.source_ip = data.basic.source_ip
          this.basic.duration = ConversionTime.timeTohous(Number(data.basic.duration))
        }
      })
    }
  }
}
</script>

<style scoped>
.line {
  border: 1px solid #dcdcdc;
  margin-top: 50px;
  width: 94%;
  margin-left: 3%;
}

.step1,
.step2,
.step3,
.step4 {
  display: block;
  position: absolute;
  margin-left: 7%;
}

.step2 {
  margin-left: 32%;
}

.step3 {
  margin-left: 57%;
}

.step4 {
  margin-left: 81%;
}

.test .yun-icon-success {
  width: 50px;
  height: 50px;
  margin-top: -50%;
}

.test .yun-icon-wait {
  width: 18px;
  height: 30px;
  margin-top: -50%;
  color: #79bf1e;
}

.test .yun-icon-wait-dis {
  width: 36px;
  height: 42px;
  margin-top: -50%;
  color: #79bf1e;
}

.tcLine1 {
  margin-top: -2px;
  border: 1px solid red;
  width: 25%;
}

.tcLineWaite {
  margin-top: -2px;
  border: 1px solid #79bf1e;
  width: 25%;
}

.tcLine2 {
  margin-top: -2px;
  border: 1px solid #2d90e6;
  width: 50%;
}

.tcLine3 {
  margin-top: -2px;
  border: 1px solid #79bf1e;
  width: 75%;
}

.tcLine4 {
  margin-top: -2px;
  border: 1px solid #79bf1e;
  width: 100%;
}

.messageInfo {
  margin-top: 75px;
}

.caretRight,
.caretRight4 {
  display: block;
  position: absolute;
  right: 30px;
  margin-top: -15px;
}

.caretRight4 {
  right: 14px;
}

.caretRight i {
  color: #ccc;
}

.caretRight4 i {
  color: #79bf1e;
}

.mesInfo {
  width: 100%;
  text-align: center;
}

</style><style lang="css">.announciatorMonitor_dialog .el-dialog--small {
  width: 40%!important;
  min-width: 760px!important;
}

.announciatorMonitor_dialog .el-steps {
  margin-left: 5%;
  margin-top: 40px;
}

.announciatorMonitor_dialog .el-step__head.is-text.is-process,
.announciatorMonitor_dialog .el-step__head.is-wait.is-text {
  color: #fff;
  background: none!important;
  border: none!important;
}

.steps_icon_style .el-step__head.is-text.is-process .yun-icon {
  width: 70px;
  height: 70px;
  display: table-caption;
  margin-left: -51%;
  margin-top: -31%;
  background-color: #fff;
}

.addMonitorDialog .el-step__description.is-success,
.addMonitorDialog .el-step__title.is-success {
  color: #79bf1e;
}

.addMonitorDialog .el-step__head.is-text.is-success {
  color: #fff;
  background-color: #79bf1e!important;
  border-color: #79bf1e!important;
}

.steps_icon_style .el-step__head.is-text.is-process+.el-step__main .el-step__title {
  font-size: 14px;
  line-height: 64px;
  display: inline-block;
  margin-left: -15%;
}


/*50*50      36*36     18*18*/

.monitorProject .yun-icon {
  width: 70px;
  height: 22px;
}

.steps_icon_style .yun-icon {
  width: 33px;
  height: 50px;
}

.domainTdWidth_span span div {
  margin: 3px auto;
  color: #20a0ff;
  text-align: left;
}
.timeShow{
  visibility: visible;
}
.timeHide{
  visibility: hidden;
}
</style>
