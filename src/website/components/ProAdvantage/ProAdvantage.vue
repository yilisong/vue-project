<template>
<div class="advantage" :class="theme">
  <div class="container">
    <h2 class="title">
      产品优势
    </h2>
    <ul class="advantages">
      <li class="an-advantage" :class="serviceAdvantage" v-for="(item,index) in documents">
        <slot :name="item.icon"></slot>
        <div class="item-title">
          {{ item.title }}
        </div>
        <div class="item-info">
          {{ item.info }}
        </div>
        <em v-if="isLight" class="dot-blue"></em>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import './ProAdvantage.css'

export default {
  props: {
    name: {
      type: String,
      require: true
    },
    documents: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      isLight: true,
      theme: 'theme-light',
      serviceAdvantage: 'advantage-fourth'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      switch (this.name) {
        case 'ssl-certificate':
          this.serviceAdvantage = 'advantage-fourth'
          break
        case 'taichi-ddos-app':
          this.theme = 'theme-dark'
          this.serviceAdvantage = 'advantage-third advantage-taichi-app'
          this.isLight = false
          break
        case 'taichi-ddos-dns':
          this.theme = 'theme-dark'
          this.serviceAdvantage = 'advantage-third advantage-taichi-dns'
          this.isLight = false
          break
        case 'taichi-ddos-plus':
          this.theme = 'theme-dark'
          this.serviceAdvantage = 'advantage-fourth advantage-taichi-plus'
          this.isLight = false
          break
        case 'taichi-ddos-web':
          this.theme = 'theme-dark'
          this.serviceAdvantage = 'advantage-fourth advantage-taichi-web'
          this.isLight = false
          break
        case 'hadoop-risk-detect':
          this.theme = 'theme-dark'
          this.serviceAdvantage = 'advantage-fourth advantage-hadoop-risk-detect'
          this.isLight = false
          break
        case 'cloud-speed':
          this.serviceAdvantage = 'advantage-fourth'
          break
        default:
          return
      }
    }
  }
}
</script>

<style scoped>

.advantage {
  padding-top: 1px;
  padding-bottom: 60px;
}

.an-advantage {
  display: inline-block;
  margin-bottom: 40px;
  text-align: center;
  vertical-align: top;
  .item-title {
    padding-bottom: 22px;
    margin-bottom: 24px;
    border-bottom: 1px solid #343434;
  }
  .item-info {
    font-size: 12px;
    line-height: 22px;
    text-align: justify;
  }
}
</style>
