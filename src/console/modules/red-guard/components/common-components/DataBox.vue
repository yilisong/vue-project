<template lang="html">
<div class="total-count">
  <h1 v-for="(item,index) in displayData" :class="colorName">{{item.value}}<span>{{item.unit}}</span></h1>
  <h1 v-if="displayData.length===0">暂无数据</h1>
  <h4>{{title}}</h4>
</div>
</template>

<script>
export default {
  computed: {
    colorType() {
      return this.colorName
    }
  },
  data() {
    return {
      basicData: [{
          splitNum: 3,
          unit: '亿'
        }, {
          splitNum: 2456,
          unit: '万'
        },
        {
          splitNum: 7894,
          unit: '次'
        }
      ]
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    colorName: {
      type: String,
      default: 'blue'
    },
    displayData: {
      type: Array
    }

  }
}
</script>

<style lang="css" scoped="">
.total-count {
  border: 1px solid #D6D6D6;
  padding: 30px 15px;
  background: #fff;
}

.total-count h1 {
  display: inline-block;
  font-weight: normal;
  font-size: 3em;
  line-height: 1;
  span {
    font-size: 0.5em;
    padding: 0 3px;
    color: #333;
  }
}

.total-count h4 {
  font-weight: 100;
  font-size: 1.1em;
}

.blue {
  color: #2d90e6;
}

.orange {
  color: #FF7814;
}

.gray {
  color: #999CA2;
}

.slate-gray {
  color: #748C9D;
}
</style>
