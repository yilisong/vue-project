<template lang="html">
<div class="">
  <div v-for="(item,index) in messageData" :key="index">
    <div class="message-item cursor-pointer" @click="goToDetail(item.id)">
      <i v-if="Object.is(item.read_flag, '0')" class="again-dot read-flag"></i>
      <div class="title">{{ item.msg_title }}</div>
      <div class="pull-right">{{ item.notice_time }}</div>
    </div>
  </div>
  <a class="more" href="/console/message-center#/messageList">更多...</a>
</div>
</template>

<script>
export default {
  name: 'MessageList',
  props: {
    messageData: {
      type: Array
    }
  },
  data() {
    return {}
  },
  watch: {
    messageData() {}
  },
  methods: {
    goToDetail(id) {
      window.location.href = `/console/message-center#/messageList/detail/${id}`
    }
  }
}
</script>

<style scoped>
.title {
  color: #000000;
  margin-bottom: 4px;
  width: 130px;
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;
}

.message-item {
  position: relative;
  padding: 5px;
  margin: 0;
  padding-top: 15px;
  border-bottom: 1px solid #e5e5e5;
  div {
    display: inline-block;
  }
}

.message-item:hover {
  background: #f7f7f7;
}

.read-flag {
  position: absolute;
  left: -7px;
  top: 20px;
}
</style>
<style>
.el-tabs__item {
  height: 30px;
  line-height: 30px;
  color: #333333;
}

.el-tabs__item:hover {
  color: var(--primary-blue)
}

.el-tabs__item.is-active {
  color: var(--primary-blue)
}
</style>
