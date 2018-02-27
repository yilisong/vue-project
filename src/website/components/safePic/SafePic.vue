<template lang="html">
  <div class="block sub-layout">
    <div class="fl">
      <span class="title">{{text.title}}</span>
    </div>
    <div class="fr">
      <p class="item" v-for="(item,index) in text.describe" :key="index">{{item}}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafePic',
  props: {
    text: {}
  }
}
</script>

<style scoped>
.block {
  color: #ffffff;
  padding-top: 50px;
}

.fl {
  width: 225px;
  float: left;
}

.fr {
  width: 870px;
  float: right;
  .item {
    padding-bottom: 40px;
  }
}

.title {
  font-size: 24px;
  position: relative;
  top: -5px;
}
</style>
