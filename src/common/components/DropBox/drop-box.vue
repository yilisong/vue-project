<template>
<div class="wrapper">
  <ul class="part-list">
    <li class="i-drop" v-if="list.length > 2">
      <i :class="[showAll ? 'el-icon-caret-bottom':'el-icon-caret-left']" @click="showList"></i>
    </li>
    <li v-for="(item,index) in list" v-show="index < 2">
      {{ item }}
    </li>
  </ul>
  <ul class="all-list" v-show="showAll">
    <li class="i-drop">
      <i :class="[showAll ? 'el-icon-caret-bottom':'el-icon-caret-left']" @click="showList"></i>
    </li>
    <li v-for="(item,index) in list">
      {{ item }}
    </li>
  </ul>
</div>
</template>

<script>

export default {
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    showList() {
      this.showAll = !this.showAll
    }
  },
  data() {
    return {
      showAll: false
    }
  }
}
</script>

<style scoped>
.wrapper {

}
.i-drop {
  position: absolute;
  z-index: 10;
  top: 50%;
  right: 0;
  margin-top: -12px;
  cursor: pointer;
}
.part-list {

}
.all-list {
  position: absolute;
  z-index: 9;
  top: 6px;
  padding: 6px;
  margin-left: -6px;
  background-color: #fff;
  border: 1px solid #cdcdcd;
  white-space: nowrap;
}
</style>
