<template lang="html">
<div class="content-padding base-border module-bg">
  <p class="inform-title">消息通知</p>
  <el-tabs v-model="active" type="card">
    <el-tab-pane label="服务消息" name="first" class="tab-item">
      <MessageList :messageData="serviceList" />
    </el-tab-pane>
    <el-tab-pane label="安全消息" name="second" class="tab-item">
      <MessageList :messageData="safetyList" />
    </el-tab-pane>
    <el-tab-pane label="故障消息" name="third" class="tab-item">
      <MessageList :messageData="malfunctionList" />
    </el-tab-pane>
    <el-tab-pane label="活动消息" name="fourth" class="tab-item">
      <MessageList :messageData="activeList" />
    </el-tab-pane>
  </el-tabs>
  <!-- <div class="product-update base-border">
    <div class="title">
      <span>产品更新</span>
    </div>
    <div class="message-content">
      <div v-for="i in productUpdate" :key="i">
        <a class="list-item" :href="'/about#/mediaReport?='+ i.id">
          {{ i.title }}
        </a>
      </div>
      <a class="more" href="/about#/mediaReport">更多...</a>
    </div>
  </div>
  <div class="product-update base-border">
    <div class="title">
      <span>安全情报</span>
    </div>
    <div class="message-content">
      <div v-for="i in safetySurvey" :key="i">
        <a class="list-item" :href="'/about#/mediaReport?='+ i.id">
          {{ i.title }}
        </a>
      </div>
      <a class="more" href="/about#/mediaReport">更多...</a>
    </div>
  </div> -->
</div>
</template>

<script>
import SourceOverviewResource from 'home/resource/SourceOverviewResource'
import MessageList from 'home/components/MessageList'

export default {
  name: 'MessageInform',
  components: {
    MessageList
  },
  data() {
    return {
      active: 'first',
      serviceList: [],
      safetyList: [],
      malfunctionList: [],
      activeList: [],
      productUpdate: [],
      safetySurvey: []
    }
  },
  mounted() {
    this.initMessage()
  },
  methods: {
    initMessage() {
      SourceOverviewResource.getMessageList().then(res => {
        const list = res.data.data.list
        this.serviceList = list.service_notice
        this.safetyList = list.security_notice
        this.malfunctionList = list.fault_notice
        this.activeList = list.event_notice
      })
      SourceOverviewResource.getProductInfo().then(res => {
        const list = res.data.data
        this.productUpdate = list.product_renew
        this.safetySurvey = list.safe_new
      })
    }
  }
}
</script>
<style>
.content-padding {
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    color: var(--primary-blue);
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 2px 2px 0 0;
    border-bottom-color: #fff;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item {
    font-size: 12px;
  }
}
</style>
<style scoped>
.inform-title {
  margin-bottom: 20px;
  font-size: 14px;
}

.tab-item {
  background: #ffffff;
  padding: 20px 20px 10px 20px;
  border: 1px solid #e6e6e6;
  border-top: 0;
}

.product-update {
  margin-top: 20px;
  background: #ffffff;
  .message-content {
    padding: 0 25px;
    font-size: 12px;
  }
  .title {
    color: #ffffff;
    padding: 5px 20px;
    height: 30px;
    line-height: 30px;
    background: var(--primary-blue);
  }
  .more {
    padding-top: 10px;
    border-top: 1px solid #e5e5e5;
    display: block;
    margin: 0;
    margin-bottom: 10px;
  }
  .list-item {
    margin: 10px 0;
    display: block;
    color: #333333;
  }
}
</style>
