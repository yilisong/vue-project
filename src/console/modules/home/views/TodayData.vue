  <template lang="html">
  <div class="big-data content-padding base-border module-bg">
    <p class="title">今日安全大数据</p>
    <row :gutter="20">
      <col :span="8">
        <div class="base-border data-block">
          <p>
            <span class="attack-count" v-for="(item,index) in wafData">{{item.splitNum}}<span>{{item.unit}}</span></span>
          </p>
          <p class="data-desc">
            WAF攻击总次数
          </p>
        </div>
      </col>
      <col :span="8">
        <div class="base-border data-block">
          <p>
            <span class="attack-count" v-for="(item,index) in ccData">{{item.splitNum}}<span>{{item.unit}}</span></span>
          </p>
          <p class="data-desc">
            CC攻击总次数
          </p>
        </div>
      </col>
      <col :span="8">
        <div class="base-border data-block">
          <p>
            <span class="attack-count">{{ bandwidth.data }}<span>{{ bandwidth.unit }}</span></span>
          </p>
          <p class="data-desc">
            DDoS攻击带宽峰值
          </p>
        </div>
      </col>
    </row>
  </div>
</template>

<script>
import SourceOverviewResource from 'home/resource/SourceOverviewResource'

export default {
  name: 'TodayData',
  data() {
    return {
      wafData: [],
      ccData: [],
      bandwidth: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    format(data) {
      data = data.slice(0, data.length - 1)
      const result = []
      for (let i = data.length; i > 0; i -= 4) {
        if (i < 4) {
          result.push(data.slice(0, i))
        } else {
          result.push(data.slice(i - 4, i))
        }
      }
      let resultData = []
      switch (result.length) {
        case 1:
          resultData = [
            {
              splitNum: result[0],
              unit: '次'
            }
          ]
          break
        case 2:
          resultData = [
            {
              splitNum: result[1],
              unit: '万'
            },
            {
              splitNum: parseInt(result[0], 10),
              unit: '次'
            }
          ]
          break
        case 3:
          resultData = [
            {
              splitNum: result[2],
              unit: '亿'
            },
            {
              splitNum: parseInt(result[1], 10),
              unit: '万'
            },
            {
              splitNum: parseInt(result[0], 10),
              unit: '次'
            }
          ]
          break
        default:
      }
      return resultData
    },
    init() {
      SourceOverviewResource.getTodayData().then(res => {
        const data = res.data.data
        this.wafData = this.format(data.waf_data)
        this.ccData = this.format(data.cc_data)
        this.bandwidth = data.ddos_data
      })
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/overview.css';
.big-data {
  height: 140px;
}

.big-data:hover {
  border: 1px solid var(--primary-blue);
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, .1);
}

.title {
  margin-bottom: 20px;
  font-size: 14px;
}

.content-padding {
  padding: 25px;
}

.data-block {
  text-align: center;
  padding: 20px;
  color: #333333;
  cursor: pointer;
  margin-bottom: 0 !important;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
}

.data-block:hover {
  background: var(--primary-blue);
  color: #ffffff;
  border-color: var(--primary-blue);
}

.data-desc {
  font-size: 12px;
  text-align: center;
}
.attack-count {
  font-size: 26px;
  span {
    font-size: 16px;
  }
}
</style>
