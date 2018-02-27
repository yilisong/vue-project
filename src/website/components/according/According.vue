<template lang="html">
  <div class="case-box">
    <div class="sub-layout">
      <div class="">
        <h2>{{text.title}}</h2>
        <span class="describe">{{text.subtitle}}</span>
      </div>
      <ul class="cases" v-for="(item, index) in text.describe" :key="index">
        <li>{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'According',
  props: {
    text: {}
  }
}
</script>

<style scoped>
.case-box {
  div {
    h2 {
      padding: 65px 0px 40px 17px;
      font-weight: 100;
      width: 208px;
      font-size: 24px;
      display: inline-block;
      position: relative;
      top: -5px;
    }
    .describe {
      display: inline-block;
      width: 870px;
    }
  }
  .cases {
    padding-left: 225px;
    li {
      padding-left: 35px;
      padding-top: 13px;
      border-left: 1px dashed #1d8fe6;
      position: relative;
      font-size: 15px;
    }
    li::before {
      content: "";
      display: block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #1d8fe6;
      position: absolute;
      left: -4px;
      top: 18px;
    }
  }
}
</style>
