<template lang="html">
  <div class="">
    <div class="fl">
      <span class="blue-block"></span>
      <span class="title">{{text.title}}</span>
    </div>
    <div class="fr">
      <p class="item-p-fuck" v-for="(item,index) in text.describe" :key="index">{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Distribution',
  props: {
    text: {}
  }
}
</script>

<style scoped>
.fl {
  width: 225px;
  float: left;
}

.fr {
  width: 870px;
  float: right;
  .item-p-fuck {
    padding-bottom: 30px;
  }
}

.blue-block {
  width: 17px;
  height: 26px;
  background: #37dbf2;
  display: inline-block;
}

.title {
  font-size: 24px;
  position: relative;
  top: -5px;
}
</style>
