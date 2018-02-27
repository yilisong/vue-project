<template>
<div class="">
  <span class="linkButtom" @click="clickOpen">咨询商务</span>
</div>
</template>

<script>
import Help from 'common/utils/help'

export default {
  name: 'LinkService',
  data() {
    return {}
  },
  methods: {
    clickOpen() {
      Help.linkService()
    }
  }
}
</script>
<style scoped>
.linkButtom {
  margin-top: 20px;
  display: inline-block;
  width: 118px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  cursor: pointer;
  color: #b9b9b9;
  border-color: #848484;
}
</style>
