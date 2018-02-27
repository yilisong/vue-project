<template lang="html">
<div class="message-flowmeter content-padding base-border module-bg">
  <row :gutter="40">
    <col :span="12" class="divis">
      <div>
        <p class="message-title">通知短信</p>
        <div class="message-item">
          <span>本月赠送条数</span>
          <span class="pull-right">{{ data.sms_system_presented }} 条</span>
        </div>
        <div class="message-item">
          <span class="remain-title">账号剩余</span>
          <span class="pull-right"><span class="show-num">{{ data.sms_total }}</span> 条</span>
        </div>
        <a href="/payment#/setting-message" class="purchase base-border">购买</a>
      </div>
    </col>
    <col :span="12">
      <div>
        <p class="message-title">CDN加速流量</p>
        <div class="message-item">
          <span>本月赠送流量</span>
          <span class="pull-right">50 G</span>
          <!-- <span class="pull-right">{{ data.cdn_system_presented }} G</span> -->
        </div>
        <div class="message-item">
          <span class="remain-title">账号剩余</span>
          <!-- <span>账号剩余</span> -->
          <span class="pull-right"><span class="show-num">{{ data.cdn_total }}</span> G</span>
        </div>
        <!-- <a href="/console/finance-center#/rechargeList" class="purchase base-border disabled">购买</a> -->
        <a href="/payment#/cloud-speed" target="_blank" class="purchase base-border">购买</a>
      </div>
    </col>
  </row>
</div>
</template>

<script>
import SourceOverviewResource from 'home/resource/SourceOverviewResource'

export default {
  name: 'MessageFlowmeter',
  data() {
    return {
      data: {}
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      SourceOverviewResource.getMessageFlowmeter().then(res => {
        this.data = res.data.data
      })
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/overview.css';
.remain-title {
  position: relative;
  top: 5px;
}
.content-padding {
  padding: 25px;
}

.message-flowmeter {
  height: 140px;
}

.message-flowmeter:hover {
  border: 1px solid var(--primary-blue);
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, .1);
}

.purchase {
  margin-top: 11px;
  width: 54px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border: 1px solid #cdcdcd;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  color: #333333;
  float: left;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
}

.purchase:hover {
  @extend yun-btn;
  background: #e9f4fc;
  border: 1px solid var(--primary-blue);
}

.disabled {
  color: #848484;
  background: #e6e6e6;
  cursor: not-allowed;
  border-color: #cdcdcd;
}

.disabled:hover {
  color: #848484;
  background: #e6e6e6;
  cursor: not-allowed;
  border-color: #cdcdcd;
}

.message-title {
  font-size: 14px;
  margin-bottom: 20px;
}

.message-item {
  margin: 10px 0;
}

.divis {
  border-right: 1px solid #e5e5e5;
}

.show-num {
  font-size: 18px;
  color: var(--primary-blue);
}
</style>
