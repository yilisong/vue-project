<template lang="html">
<!-- 区域屏蔽 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3">
      <p class="item-name">区域屏蔽</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>可根据业务需求，允许或禁止特定区域的终端用户对网站资源的访问</p>
    </el-col>
    <el-col :span="6">
      <div class="fr">
        <!-- <span class="help">帮助</span> -->
        <!-- <el-switch @change="updateZoneLimit" v-model="zoneLimit.status">
          </el-switch> -->
        <el-select v-model="zoneLimit.status" @change="updateZoneLimit" class="fr">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :offset="3" :span="21">
      <Tip class="tip" :content="tipContent" mode="static" />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :offset="3" :span="3" class="description">允许访问区域</el-col>
    <el-col :span="10" class="size-fit">
      <div class="">
        <el-radio-group class="" v-model="zoneLimit.mode" @change="updateZoneLimit">
          <el-radio class="radio" label="whiteList">开启白名单模式</el-radio>
          <el-radio class="radio" label="blackList">开启黑名单模式</el-radio>
        </el-radio-group>
        <div class="region" v-loading="loading">
          <select-region v-on:updateRegion="updateZoneLimitBlackList" v-if="zoneLimit.mode === `blackList`" :listData="zoneLimit.blackList"></select-region>
          <select-region v-on:updateRegion="updateZoneLimitWhiteList" v-if="zoneLimit.mode === `whiteList`" :listData="zoneLimit.whiteList"></select-region>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="time-control">
    <el-col :offset="6" :span="3" class="description">访问控制时间</el-col>
    <el-col :span="15">
      <el-checkbox v-model="showTime" @change="triggerShowTime"></el-checkbox>
    </el-col>
  </el-row>
  <div v-show="showTime">
    <el-row :gutter="20" class="time-row">
      <el-col :offset="6" :span="18">
        <span class="lead">星期</span>
        <el-checkbox class="checkAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group class="week" v-model="checkedWeeks" @change="handleCheckedWeeksChange">
          <el-checkbox v-for="week in weeks" :label="week.value" :key="week.value">{{week.label}}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="time-row">
      <el-col :offset="6" :span="18">
        <span class="lead">时间</span>
        <el-time-picker v-model="startValue" format="HH:mm" placeholder="--|--" @change="setStartTime"></el-time-picker>
        <el-time-picker v-model="endValue" format="HH:mm" placeholder="--|--" @change="setEndTime"></el-time-picker>
        <i-button type="primary" @click="handleAccessTime">确定</i-button>
      </el-col>
    </el-row>
  </div>
</el-card>
</template>

<script>
import SelectRegion from 'common/components/SelectRegion/SelectRegion'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'

const weekOptions = [{
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
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      zoneLimit: {
        init: 1,
        mode: '',
        status: 'on',
        whiteList: [],
        blackList: []
      },
      tipContent: [
        '可根据业务需求，允许或禁止特定区域的终端用户对网站资源的访问。',
        '开启白名单后只允许白名单中地区访问，开启黑名单后只禁止黑名单中 地区访问域名。',
        '支持按国家、省市维度进行配置'
      ],
      // select day
      checkAll: true,
      checkedWeeks: [],
      weeks: weekOptions,
      checkedMapWeeks: ['0', '1', '2', '3', '4', '5', '6'],
      isIndeterminate: true,
      // select time
      startValue: new Date(2017, 6, 1, 0, 0),
      endValue: new Date(2017, 6, 1, 23, 59),
      startTime: '00:00',
      endTime: '23:59',
      showTime: false,
      loading: true
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchZoneLimit()
  },
  methods: {
    fetchZoneLimit() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.zone_limit`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            this.loading = false
            if (res && (res.status.code === 1) && res.data && res.data.zone_limit) {
              console.log('this time====', res.data)
              this.zoneLimit.status = res.data.zone_limit.status
              this.zoneLimit.mode = res.data.zone_limit.mode
              this.zoneLimit.blackList = res.data.zone_limit.blackList
              this.zoneLimit.whiteList = res.data.zone_limit.whiteList
              const data = res.data
              if (data.zone_limit.time_control) {
                this.showTime = Boolean(res.data.zone_limit.time_control_flag)
                this.checkedWeeks = data.zone_limit.time_control.weeks
                if (data.zone_limit.time_control.startTime) {
                  this.startTime = data.zone_limit.time_control.startTime
                  const startHour = Number(this.startTime.split(':')[0])
                  const startMin = Number(this.startTime.split(':')[1])
                  this.startValue = new Date(2017, 6, 1, startHour, startMin)
                }
                if (data.zone_limit.time_control.endTime) {
                  this.endTime = data.zone_limit.time_control.endTime
                  const endHour = Number(this.endTime.split(':')[0])
                  const endMin = Number(this.endTime.split(':')[1])
                  this.endValue = new Date(2017, 6, 1, endHour, endMin)
                }
              }
            }
          })
        }
      }, e => {})
    },
    updateZoneLimit() {
      if (this.zoneLimit.init < 3) {
        this.zoneLimit.init++
          return
      }
      this.loading = true
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.zone_limit`
      let timeControlFlag
      if (this.showTime === true) {
        timeControlFlag = 1
      } else {
        timeControlFlag = 0
      }
      const params = {
        status: this.zoneLimit.status,
        mode: this.zoneLimit.mode,
        blackList: this.zoneLimit.blackList,
        whiteList: this.zoneLimit.whiteList,
        time_control: {
          weeks: this.checkedWeeks,
          startTime: this.startTime,
          endTime: this.endTime
        },
        time_control_flag: timeControlFlag
      }
      this.fetchPut(url, params).then(result => {
        if (result.ok) {
          result.json().then(res => {
            this.windowMessage(res)
            this.fetchZoneLimit()
          })
        }
      }, e => {})
    },
    updateZoneLimitBlackList(listDate) {
      this.zoneLimit.blackList = listDate
      this.updateZoneLimit()
    },
    updateZoneLimitWhiteList(listDate) {
      this.zoneLimit.whiteList = listDate
      this.updateZoneLimit()
    },
    handleCheckAllChange(event) {
      this.checkedWeeks = event.target.checked ? this.checkedMapWeeks : []
      this.isIndeterminate = false
    },
    handleCheckedWeeksChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.weeks.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.weeks.length
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
      console.log(this.startTime, this.endTime, 'TIME===')
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
      this.updateZoneLimit()
    },
    triggerShowTime() {
      if (!this.showTime) {
        this.updateZoneLimit()
      }
    }
  }
}
</script>

<style scoped>
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
  margin: 10px 0;
}

@media screen and (min-width:1199px) and (max-width:1401px) {
  .size-fit {
    width: 60%;
  }
}

.time-control {
  margin-top: 12px;
}
</style>
