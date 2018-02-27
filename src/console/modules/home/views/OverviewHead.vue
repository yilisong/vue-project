<template lang="html">
  <div class="overview-head">
    <span class="balance">账户余额</span>
    <span class="balance-num">{{ balance }}</span>
    <span class="balance-unit">元</span>
    <a href="/console/finance-center#/rechargeList?recharge=1" class="recharge">充值</a>
    <span class="division"></span>
    <a href="/console/finance-center#/rechargeList">
      <i-button type="text">充值管理</i-button>
    </a>
    <span class="division"></span>
    <a href="/console/finance-center#/orderList">
      <i-button type="text">订单管理</i-button>
    </a>
    <span class="division"></span>
    <a href="/console/finance-center#/invoiceList">
      <i-button type="text">发票管理</i-button>
    </a>
    <div class="pull-right">
      <span class="attention">关注我们</span>
      <span class="division"></span>
      <el-popover ref="wechat" placement="bottom" width="120" trigger="hover">
      </el-popover>
      <span v-popover:wechat>微信订阅号</span>
      <span> / </span>
      <el-popover ref="service" placement="bottom" width="120" trigger="hover">
      </el-popover>
      <span v-popover:service>微信服务号</span>
    </div>
  </div>
</template>

<script>
import SourceOverviewResource from 'home/resource/SourceOverviewResource'

export default {
  data() {
    return {
      balance: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      SourceOverviewResource.getBalance().then(res => {
        this.balance = res.data.data.balance
      })
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/overview.css';
.overview-head {
  height: 50px;
  background-color: #f0f0f0;
  padding: 20px;
  line-height: 50px;
  border-bottom: 1px solid #e5e5e5;
}

.balance {
  font-size: 14px;
  color: #333333;
  margin-right: 12px;
}

.balance-num {
  font-size: 26px;
  color: var(--primary-blue);
}

.balance-unit {
  font-size: 16px;
  color: var(--primary-blue);
  margin-right: 36px;
}

.recharge {
  @extend yun-btn;
  padding: 5px 19px;
  border-radius: 2px;
}

.division::before {
  @extend division-line;
  height: 19px;
  color: #cdcdcd;
}

.attention {
  margin-left: 12px;
}

.wechat {
  width: 120px;
  height: 126px;
}

.we-code {
  position: relative;
  top: 3px;
}
</style>
