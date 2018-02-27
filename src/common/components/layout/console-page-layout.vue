<template>
<div class="page-wrap">
  <div class="page-header">
    <span class="title">{{title}}</span>
  </div>
  <slot name="tab"></slot>
  <div class="page-body">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    title: ''
  }
}
</script>

<style>
.page-area {
}
</style>

<style scoped>
.page-area {
  background-color: #ffffff;
  position: relative;
  background-color: #f2f2f2;
  height: calc(100vh - 121px);
  width: 100%;
  overflow-y: scroll;
  transition: all .5s;
  line-height: 1.5;
}

.page-wrap {
  margin: 12px;
  /*border: 1px solid #eaeefb;*/
  border-radius: 4px;
  /*background-color: #fff;*/
  /*overflow: hidden;*/
  /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
}

.page-header {
  /*position: relative;*/
  margin: 12px 0;
  padding: 12px;
  color: #324057;
  /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  box-shadow: 0px 4px 20px -2px rgba(0, 0, 0, .12);
}

.page-header .title {
  display: inline-block;
  font-size: 14px;
  padding-left: 12px;
  height: 20px;
  border-left: 3px solid var(--primary-blue);
}

.page-body {
  /*padding: 12px;*/
}
</style>
