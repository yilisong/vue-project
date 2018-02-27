<template>
<div class="application" :class="theme">
  <div class="container">
    <h2 class="title">
      应用场景
    </h2>
    <div class="tabs">
      <ul class="tab-hd clearfix">
        <li v-for="(item,index) in documents.titles" :class="[index === 0 ? 'active' : '',width]">
          {{ item }}
        </li>
      </ul>
      <ul class="tab-bd">
        <li v-for="(item,index) in documents.explains">
          <slot :name="item.icon"></slot>
          <p class="app-explain">
            <template v-for="(textItem,index) in item.text">
              {{ textItem }} <br>
            </template>
          </p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import './AppScenarios.css'
import $ from 'jquery'
import tabs from 'website/modules/production/assets/js/tabs'

export default {
  props: {
    name: {
      type: String,
      require: true
    },
    documents: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      theme: 'theme-light',
      width: 'third'
    }
  },
  created() {
    this.init()
  },
  mounted() {
    tabs('.tabs')
  },
  methods: {
    init() {
      switch (this.name) {
        case 'cloud-monitor':
          this.width = 'second'
          break
        case 'ssl-certificate':
          this.width = 'sixth'
          break
        case 'cloud-speed':
          this.width = 'fourth'
          break
        case 'taichi-ddos-plus':
        case 'taichi-ddos-app':
          this.theme = 'theme-dark'
          this.width = 'third'
          break
        case 'taichi-ddos-web':
          this.theme = 'theme-dark'
          this.width = 'first'
          break
        case 'server-guard':
          this.theme = 'theme-dark'
          this.width = 'first'
          break
        default:
          return
      }
    }
  }
}
</script>

<style scoped>
.tabs {
  width: 1110px;
  margin: 0 auto;
  border: 1px solid #444;
  font-size: 14px;
  color: var(--text-primary);
  background-color: #2e2e2e;
}

.tab-hd li {
  float: left;
  margin-right: -1px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  border-right: 1px solid #444;
  border-bottom: 1px solid #444;
  cursor: pointer;
  &:last-child {
    border-right: 0;
  }
  &.active {
    margin-top: -1px;
    border-top: 2px solid var(--primary-blue);
    border-bottom-width: 0;
  }
}

.theme-light .tab-hd {
  background-color: #f6f6f6;
  li.active,
  li:hover {
    background-color: #fff;
  }
}

.tab-bd {
  padding-left: 58px;
  padding-top: 80px;
  height: 184px;
  overflow: hidden;
}

.tab-bd li {
  display: none;
  width: 935px;
  height: 99px;
  line-height: 1.5;
  &:first-child {
    display: list-item;
  }
}
</style>
