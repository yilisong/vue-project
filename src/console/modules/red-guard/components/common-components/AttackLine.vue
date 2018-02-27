<template lang="html">
<el-dialog :title="info" :visible.sync="dialogVisible" size="small" :before-close="handleClose" @open="getDetails">
  <!-- <div class="">

  </div> -->
  <ul>
    <li v-for="item in links" class="fit-line">
      <span class="link-date">{{item.date}}</span>
      <ul>
        <li v-for="content in item.lists" class="link-box">
          <div>{{content.time}}</div>
          <p>{{content.attackType}}<br> <span>访问url&nbsp;{{content.url}}</span></p>
        </li>
      </ul>
    </li>
  </ul>
</el-dialog>
</template>

<script>
import SourceGuardResource from '../../resource/SourceGuardResource'
import MultipleLineChart from '../chart-model/MultipleLineChart'
export default {
  components: {
    MultipleLineChart
  },
  props: {
    boxVisible: {
      type: Object
    },
    params: {
      type: Object
    },
    ip: {
      type: String
    },
    firstData: {
      type: Object
    }
  },
  computed: {
    info() {
      return '攻击链路 - ' + this.ip
    },
    dialogVisible: {
      get() {
        return this.boxVisible.show
      },
      set(newValue) {
        this.boxVisible.show = newValue
      }
    }
  },
  data() {
    return {
      links: [{
        date: '2017.08.23',
        lists: [{
          time: '17:23:56',
          attackType: '低频探测',
          url: 'http://www.cnforex.com/comment/sypl/'
        }, {
          time: '17:23:56',
          attackType: '低频探测',
          url: 'http://www.cnforex.com/comment/sypl/'
        }, {
          time: '17:23:56',
          attackType: '低频探测',
          url: 'http://www.cnforex.com/comment/sypl/'
        }]

      }, {
        date: '2017.08.23',
        lists: [{
          time: '17:23:56',
          attackType: '本账户攻击',
          url: 'http://www.cnforex.com/comment/sypl/'
        }, {
          time: '17:23:56',
          attackType: '本账户攻击',
          url: 'http://www.cnforex.com/comment/sypl/'
        }, {
          time: '17:23:56',
          attackType: '本账户攻击',
          url: 'http://www.cnforex.com/comment/sypl/'
        }]

      }]
    }
  },
  methods: {
    compare(a, b) {
      return a > b ? 1 : -1
    },
    compareObj(a, b) {
      return a.time > b.time ? 1 : -1
    },
    getDetails() {
      this.links = []
      SourceGuardResource.getwafAPTIpAttackLink(this.params).then(response => {
        const dataList = response.data.data.list
        console.log(dataList, 'datalist')
        if (this.firstData.first_url) dataList.push({
          attack_class: '首次访问',
          startTime: this.firstData.first_time,
          first_url: this.firstData.first_url
        })
        let date = []
        if (this.firstData.first_time) date.push(this.firstData.first_time.split(' ')[0])
        dataList.forEach(item => {
          date.push(item.startTime.split(' ')[0])
        })
        date = [...new Set(date)]
        date.sort(this.compare)
        this.links = []
        date.forEach(item => {
          this.links.push({
            date: item,
            lists: []
          })
        })
        date.forEach((item, index) => {
          dataList.forEach(data => {
            if (data.startTime.split(' ')[0] === item) {
              this.links[index].lists.push({
                time: data.startTime.split(' ')[1],
                attackType: data.attack_class,
                url: data.first_url
              })
            }
          })
          this.links[index].lists.sort(this.compareObj)
        })
      })
    },
    handleClose(done) {
      this.boxVisible.show = false
    }
  }
}
</script>

<style lang="css" scoped>
.fit-line {
  margin-top: -5px;
}

.link-date {
  background: #2d90e6;
  color: #fff;
  padding: 0px 5px;
  font-size: 13px;
  display: inline-block;
  line-height: 1.5em;
  position: relative;
}

.link-date+ul {
  margin-top: -4px;
  position: relative;
}

.link-date+ul::before {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  border: 1px solid #2d90e6;
  position: absolute;
  left: 88px;
  top: -13px;
  background: #fff;
  z-index: 1;
}

.link-date+ul::after {
  content: "";
  width: 1px;
  height: 19px;
  display: inline-block;
  background: #D6D6D6;
  position: absolute;
  top: -19px;
  left: 91px;
}

.link-box {
  position: relative;
  margin-left: 88px;
  div,
  p {
    display: inline-block;
  }
  div {
    position: absolute;
    height: 25px;
    right: 101%;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
  p {
    line-height: 1.2em;
    padding: 12px;
    border-left: 1px solid #D6D6D6;
    position: relative;
    margin-left: 3px;
    width: 80%;
    word-break: break-all;
    span {
      font-size: 12px;
    }
  }
  p::before {
    content: "-";
    color: #2d90e6;
    display: block;
    position: absolute;
    left: 0;
    top: 37%;
  }
}
</style>
