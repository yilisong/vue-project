<template  lang="html">
  <span class="right wrapper">
    <el-button v-bind:class="{ active: dateStatus[0] }" @click="handleButtonDateToday">今天</el-button>
    <el-button v-bind:class="{ active: dateStatus[1] }" @click="handleButtonDateYesterday">昨天</el-button>
    <el-button v-bind:class="{ active: dateStatus[2] }" @click="handleButtonDateSevendays">7天</el-button>
    <el-button @click="handleButtonDateLogChange" v-show="buttonSelfShow" v-bind:class="{ active: dateStatus[3] }">自定义</el-button>
    <span class="block" v-show='buttonShow'>
      <span class="demonstration">从</span>
      <el-date-picker v-model="startTimevalue" type="date" placeholder="选择开始时间" :picker-options="pickerOptions" @change="timeSelectStar" format="yyyy-MM-dd"></el-date-picker>
      <span class="demonstration">到</span>
      <el-date-picker v-model="endTimevalue" type="date" placeholder="选择结束时间" :picker-options="pickerOptions" @change="timeSelectEnd" format="yyyy-MM-dd"></el-date-picker>
      <el-button v-bind:class="{ active: dateStatus[4] }" @click="handleButtonDateSelfLogChange">查询</el-button>
    </span>
  </span>
</template>
<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        startTimevalue: '',
        endTimevalue: '',
        dateStatus: [true, false, false, false, false],
        buttonShow: false,
        buttonSelfShow: true,
        start: '',
        end: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
                   time.getTime() >= Date.now()
          }
        }
      }
    },
    watch: {

    },
    created() {
      this.handleButtonDateToday()
    },
    methods: {
      timeSelectStar(timeRange) {
        this.startTimevalue = timeRange
      },
      timeSelectEnd(timeRange) {
        this.endTimevalue = timeRange
      },
      handleButtonDateToday() {
        this.buttonShow = false
        this.buttonSelfShow = true
        this.dateStatus = [true, false, false, false, false]
        const time = moment().format('YYYY-MM-DD hh:mm:ss')
        this.start = time.slice(0, 10) + ' 00:00:00'
        this.end = time.slice(0, 10) + ' 23:59:59'
        this.$emit('timevalue', this.start, this.end)
      },
      handleButtonDateYesterday() {
        this.buttonShow = false
        this.buttonSelfShow = true
        this.dateStatus = [false, true, false, false, false]
        const time = moment().subtract(1,'days').format('YYYY-MM-DD HH:mm:ss')
        this.start = time.slice(0, 10) + ' 00:00:00'
        this.end = time.slice(0, 10) + ' 23:59:59'
        this.$emit('timevalue', this.start, this.end)
      },
      handleButtonDateSevendays() {
        this.buttonShow = false
        this.buttonSelfShow = true
        this.dateStatus = [false, false, true, false, false]
        const time = moment().subtract(6,'days').format('YYYY-MM-DD HH:mm:ss')
        this.start = time.slice(0, 10) + ' 00:00:00'
        this.end = moment().format('YYYY-MM-DD hh:mm:ss').slice(0, 10) + ' 23:59:59'
        this.$emit('timevalue', this.start, this.end)
      },
      handleButtonDateLogChange() {
        this.buttonShow = true
        this.buttonSelfShow = false
        this.dateStatus = [false, false, false, false, true]
        this.startTimevalue = ''
        this.endTimevalue = ''
      },
      handleButtonDateSelfLogChange() {
        if (this.startTimevalue === '') {
          this.$message({
            showClose: true,
            message: '开始时间不能为空！',
            type: 'error'
          })
          return false
        } else if (this.endTimevalue === '') {
          this.$message({
            showClose: true,
            message: '结束时间不能为空！',
            type: 'error'
          })
          return false
        } else if (this.startTimevalue > this.endTimevalue) {
          this.$message({
            showClose: true,
            message: '开始时间不能大于结束时间！',
            type: 'error'
          })
          return false
        } else {
          this.buttonShow = false
          this.buttonSelfShow = true
          this.dateStatus = [false, false, false, true, false]
          this.startTimevalue = this.startTimevalue + ' 00:00:00'
          this.endTimevalue = this.endTimevalue + ' 23:59:59'
          this.$emit('timevalue', this.startTimevalue, this.endTimevalue)
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="css" scoped>
.active{
  background: #20a0ff;
  color: #fff!important;
  border-color: #20a0ff;
}
.right{
  float: right;
}
</style>
