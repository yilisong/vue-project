<template lang="html">
<!--只是为特定的数据显示做的下拉模板，非组件-->
<!--域名列表 主备线路-->
<!--应用场景 表格-->
<div class="list-container">
  <ul class="web-origin-domain" v-bind:class="{'active-web-origin-domain':contentShow}">
    <li v-if="" @click="showList">
      <i class="el-icon-caret-bottom el-icon--right position-adjust" v-if="webListLength>2"></i>
    </li>
    <li v-for="(item,index) in webList" v-show="index <= 1 ||contentShow" :value="index">
      <span v-show="iconShow" class="yun-icon circuit-type" v-bind:class="[item.view==='primary'?'yun-view-main':'yun-view-backup']"></span>
      <span class="domain-value">{{item.value}}</span>
    </li>
  </ul>
</div>
</template>

<script>
import '../../assets/styles/daoshu-theme/index.css'
export default {
  mounted() {
    const $body = document.getElementsByTagName('body')[0]
    $body.addEventListener('click', this.closeView, false)
  },
  computed: {
    webListLength() {
      if (this.webList)
        return this.webList.length
    }
  },
  data() {
    return {
      contentShow: false,
      contentStatus: false,
      content: [{
        view: 'primary',
        value: '192.185.3.4'
      }, {
        view: 'A',
        value: '1.1.1.1'
      }, {
        view: 'primary',
        value: '1.1.1.1'
      }, {
        view: 'A',
        value: '1.1.1.1'
      }, {
        view: 'primary',
        value: '1.1.1.1'
      }]
    }
  },
  methods: {
    showList() {
      this.contentShow = !this.contentStatus
      this.contentStatus = this.contentShow
    },
    closeView(e) {
      if (!this.$el.contains(e.target))
        this.contentShow = false
    }
  },
  props: {
    webList: {
      type: null
    },
    iconShow: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="css">
.list-container {
  width: 100%;
  margin: 0 auto;
  ul {
    li {
      line-height: 18px;
    }
  }
}

.active-web-origin-domain {
  border: 1px solid #d6d6d6;
  box-shadow: 0 0 25px var(--border-gray);
  background: #fff;
  /*transition: background-color .2s ease-in-out;*/
  z-index: 9999;
  /*表格内*/
  position: absolute!important;
  /*left: 6px;*/
  top: 6px;
}

.web-origin-domain {
  width: inherit;
  /*border: 1px solid #fff;*/
  text-align: left;
  padding: 5px;
  li {
    position: relative;
    .circuit-type {
      width: 12px;
      height: 12px;
      position: absolute;
      top: 3px;
      left: 2px;
    }
    .position-adjust {
      position: absolute;
      width: 10px;
      height: 10px;
      right: 30px;
      top: 16px;
      z-index: 999;
      cursor: pointer;
    }
    .domain-value {
      margin-left: 20px;
    }
  }
}
</style>
