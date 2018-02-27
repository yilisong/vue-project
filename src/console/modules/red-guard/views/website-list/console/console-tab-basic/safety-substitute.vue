<template lang="html">
  <!-- 区域屏蔽 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">安全替身</p>
      </el-col>
      <el-col v-if="showContent" :span="21" class="description">
        <p>分区域、分时间对外提供替身访问控制，强烈建议在敏感时期启用镜像替身访问控制，可100%保障内容安全。</p>
      </el-col>
      <el-col v-if="showContent" :offset="3" :span="21" class="description">
        <p>当前服务不支持，您可以<a class="jumpLink" @click="goToService">联系商务</a>开通此项功能。</p>
      </el-col>
      <el-col v-if="!showContent" :span="15" class="description">
        <div v-if="hasDoubleMirror">
          <p>分区域、分时间对外提供替身访问控制，强烈建议在敏感时期启用替身镜像访问控制，可100%保障内容安全。您可以在
            <a class="jumpLink" href="/console/double-mirror#/doubleMirrorList">替身镜像</a>
            服务中更新或对其进行详细配置。
          </p>
        </div>
        <div v-else>
          <p>分区域、分时间对外提供替身访问控制，强烈建议在敏感时期启用替身镜像访问控制，可100%保障内容安全。您可以在
            <a class="jumpLink" href="/console/double-mirror#/doubleMirrorList">替身镜像</a>
            服务,检测到您尚未开启,<span class="jumpLink" @click="createSubstitueVisible = true">立即开启</span>
          </p>
        </div>
      </el-col>
      <el-col v-if="!showContent && hasDoubleMirror" :span="6">
        <div class="fr">
          <el-select v-model="status" @change="updateSafeSnap" class="fr" >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <div v-if="!showContent && hasDoubleMirror">
      <el-row :gutter="20">
        <el-col :offset="3" :span="21">
          <Tip class="tip" :content="tipContent" mode="static"/>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">替身使用时间</p>
        </el-col>
        <el-col :span="21">
          <el-radio-group v-model="useTimeMode" @change="updateSafeSnap">
            <el-radio label="all">全部时间</el-radio>
            <el-radio label="custom">指定时间</el-radio>
          </el-radio-group>
        </el-col>
        <el-row :gutter="20" class="time-row" v-if="useTimeMode === 'custom'">
          <el-col :offset="3" :span="21">
            <span class="lead description">星期</span>
            <el-checkbox class="checkAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group class="week" v-model="checkedWeeks" @change="handleCheckedWeeksChange">
              <el-checkbox v-for="week in weeks" :label="week.value" :key="week.value">{{week.label}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="time-row" v-if="useTimeMode === 'custom'">
          <el-col :offset="3" :span="21">
            <span class="lead">时间</span>
            <el-time-picker v-model="startValue" format="HH:mm" placeholder="--|--" @change="setStartTime"></el-time-picker>
            <el-time-picker v-model="endValue" format="HH:mm" placeholder="--|--" @change="setEndTime"></el-time-picker>
            <i-button type="primary" @click="handleAccessTime">确定</i-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <p class="item-name">区域模式</p>
        </el-col>
        <el-col :span="21">
          <el-radio-group v-model="zoneMode" @change="updateSafeSnap">
            <el-radio label="no">不启用</el-radio>
            <el-radio label="white">启用白名单</el-radio>
            <el-radio label="black">启用黑名单</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="21" v-show="zoneMode !== 'no'">
          <div class="region" v-loading="loading">
            <p class="description">启用区域替身</p>
            <select-region v-on:updateRegion="updateZoneLimitBlackList" v-if="zoneMode === 'black'" :listData="blackList"></select-region>
            <select-region v-on:updateRegion="updateZoneLimitWhiteList" v-if="zoneMode === 'white'" :listData="whiteList"></select-region>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="新增替身镜像" v-model="createSubstitueVisible" size="small" :close-on-click-modal="true">
      <Tip class="tip" :content="tipContentSubstitue" mode="static"/>
      <div>
        备份内容配置
        <el-radio-group v-model="backupContent">
          <el-radio :label="0">首页</el-radio>
          <el-radio :label="1">全站</el-radio>
        </el-radio-group>
      </div>
      <div>
        每日定时更新
        <el-switch v-model="regularUpdate" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
        </el-switch>
        采用独家智能算法，每日定时抓取页面内容
      </div>
      <div slot="footer">
        <i-button @click="createSubstitueVisible = false">取 消</i-button>
        <i-button type="primary" @click="handleSubmit">保 存</i-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import SourceGuardResource from 'redGuard/resource/SourceGuardResource'
import SourceSpeedResource from 'cloudSpeed/resource/SourceSpeedResource'
import SelectRegion from 'common/components/SelectRegion/SelectRegion'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import Help from 'common/utils/help'

const weekOptions = [
  {
    label: '星期一',
    value: '1'
  },
  {
    label: '星期二',
    value: '2'
  },
  {
    label: '星期三',
    value: '3'
  },
  {
    label: '星期四',
    value: '4'
  },
  {
    label: '星期五',
    value: '5'
  },
  {
    label: '星期六',
    value: '6'
  },
  {
    label: '星期日',
    value: '0'
  }
]
export default {
  name: 'zone-limit',
  components: {
    SelectRegion,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      forbid: false,
      createSubstitueVisible: false,
      tipContentSubstitue: ['网页主动抓取模式：YUNDUN爬虫会主动抓取网站所有内容'],
      backupContent: 0,
      regularUpdate: 0,
      hasDoubleMirror: false,
      showContent: false,
      dosage: '--',
      updateTime: '--',
      useTimeMode: '',
      zoneMode: '',
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
      init: 1,
      status: '',
      whiteList: [],
      blackList: [],
      tipContent: [],
      // select day
      checkAll: true,
      checkedWeeks: ['0', '1', '2', '3', '4', '5', '6'],
      weeks: weekOptions,
      checkedMapWeeks: ['0', '1', '2', '3', '4', '5', '6'],
      isIndeterminate: true,
      // select time
      startValue: '',
      endValue: '',
      startTime: '00:00',
      endTime: '23:59',
      loading: true
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.initJurisdiction()
  },
  methods: {
    initJurisdiction() {
      const params = {
        domain_id: this.domainId
      }
      SourceGuardResource.getWebsiteInfo(params).then(res => {
        const mealFlag = res.data.data.meal_flag
        console.log('mealFlag',mealFlag)
        if (Object.is(mealFlag, 'HW002B') || Object.is(mealFlag, 'HW004B')) {
          this.fetchSafeSnap()
          this.getDosage()
        } else {
          this.showContent = true
          this.forbid = true
        }
      })
    },
    goToService() {
      Help.linkService()
    },
    handleSubmit() {
      const domain = `${this.$store.state.website.domainInfo.domain}`
      const params = {
        domain: ['http://' + domain],
        backup_content: this.backupContent,
        regular_update: Number(this.regularUpdate)
      }
      SourceSpeedResource.addSubstitute(params).then(res => {
        this.windowMessage(res.data.status.message)
        this.createSubstitueVisible = false
        this.initJurisdiction()
      }).catch(res => {
        this.createSubstitueVisible = false
      })
    },
    getDosage() {
      const params = {
        domain: this.domainId
      }
      SourceGuardResource.queryDomainInfo(params).then(res => {
        const Data = res.data.data.alwaysOn
        const MirrorData = Data.mirrorData
        const MirrorInfo = Data.mirrorInfo
        if (MirrorInfo) {
          this.hasDoubleMirror = true
          this.dosage = MirrorData.backup_size
          this.updateTime = MirrorData.final_fetch_time
        }
        this.tipContent = [
          `1.当前替身大小 ${this.dosage}，最后更新时间 ${this.updateTime}。`,
          '2.启用前请在替身镜像中创建替身镜像。',
          '3.区域白名单模式下仅白名单中的区域启用替身，黑名单模式则仅黑名单中的区域不启用替身。',
          '4.支持按国家、省市维度进行区域访问控制配置'
        ]
      })
    },
    fetchSafeSnap() {
      SourceGuardResource.getSafeSnap(this.domainId).then(res => {
        const SafeSnap = res.data.data.safe_snap
        this.status = SafeSnap.status
        this.zoneMode = SafeSnap.zone_mode
        this.useTimeMode = SafeSnap.use_time_mode
        if (SafeSnap.blackList) {
          this.blackList = SafeSnap.blackList
        }
        if (SafeSnap.whiteList) {
          this.whiteList = SafeSnap.whiteList
        }
        if (SafeSnap.time_control) {
          this.checkedWeeks = SafeSnap.time_control.weeks
          if (SafeSnap.time_control.startTime) {
            this.startTime = SafeSnap.time_control.startTime
            const startHour = Number(this.startTime.split(':')[0])
            const startMin = Number(this.startTime.split(':')[1])
            this.startValue = new Date(2017, 6, 1, startHour, startMin)
          }
          if (SafeSnap.time_control.endTime) {
            this.endTime = SafeSnap.time_control.endTime
            const endHour = Number(this.endTime.split(':')[0])
            const endMin = Number(this.endTime.split(':')[1])
            this.endValue = new Date(2017, 6, 1, endHour, endMin)
          }
        }
        this.loading = false
      })
    },
    updateSafeSnap() {
      if (this.init < 2) {
        this.init++
        // return
      }
      this.loading = true
      const params = {
        status: this.status,
        zone_mode: this.zoneMode,
        use_time_mode: this.useTimeMode,
        blackList: this.blackList,
        whiteList: this.whiteList,
        time_control: {
          weeks: this.checkedWeeks,
          startTime: this.startTime,
          endTime: this.endTime
        }
      }
      SourceGuardResource.putSafeSnap(this.domainId, params).then(res => {
        this.windowMessage(res.data.status.message)
        this.fetchSafeSnap()
      })
    },
    updateZoneLimitBlackList(listDate) {
      this.blackList = listDate
      this.updateSafeSnap()
    },
    updateZoneLimitWhiteList(listDate) {
      this.whiteList = listDate
      this.updateSafeSnap()
    },
    handleCheckAllChange(event) {
      this.checkedWeeks = event.target.checked ? this.checkedMapWeeks : []
      this.isIndeterminate = false
    },
    handleCheckedWeeksChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.weeks.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.weeks.length
    },
    setStartTime(value) {
      this.startTime = value
    },
    setEndTime(value) {
      this.endTime = value
    },
    handleAccessTime() {
      let message = ''
      // check week
      if (!this.checkedWeeks.length) {
        message = '请至少选择一个确定的星期'
        this.$message({
          type: 'error',
          message
        })
        return
      }
      // check time
      const mapStartTime = Number(this.startTime.split(':').join(''))
      const mapEndTime = Number(this.endTime.split(':').join(''))
      if (mapStartTime >= mapEndTime) {
        message = '结束时间需要大于起始时间，请重新填写'
        this.$message({
          type: 'error',
          message
        })
        return
      }
      this.updateSafeSnap()
    }
  }
}
</script>

<style scoped>
.jumpLink {
  cursor: pointer;
}
.tag {
  width: 404px;
  margin: 15px 0;
}

.lead {
  margin-right: 20px;
}

.checkAll {}

.week {
  display: inline-block;
  margin-right: 10px;
}

.time-row {
  margin: 25px 0;
}
</style>
