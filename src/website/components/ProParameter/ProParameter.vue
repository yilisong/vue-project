<template>
<div class="parameter">
  <div class="container">
    <h2 class="title">功能参数</h2>
    <ul class="params">
      <li class="a-param" v-for="(item,index) in documents"  :class="[index === 0 ? 'active' : '']">
        <div class="params-name">
          <slot :name="item.icon"></slot>
          <h3 class="title-param">{{ item.title }}</h3>
          <span class="detail">详情</span>
        </div>
        <ul class="params-explain" v-if="item.explains">
          <li v-for="(textItem,index) in item.explains">
            <span class="param-title" v-if="textItem.subTitle">{{ textItem.subTitle }}</span>
            <span class="param-info">{{ textItem.text }}</span>
          </li>
        </ul>
        <ul class="params-explain" :class="item.name" v-else="item.parameters">
          <li v-for="(textItem,index) in item.parameters">
            <template v-if="textItem.describe">
              <div :class="textItem.describe">
                <span class="param-title">{{ textItem.subTitle }}</span>
                <span class="param-one">{{ textItem.first }}</span>
                <span class="param-two">{{ textItem.second }}</span>
                <span class="param-three">{{ textItem.third }}</span>
              </div>
            </template>
            <template v-else>
              <span class="param-title">{{ textItem.subTitle }}</span>
              <span class="param-one">{{ textItem.first }}</span>
              <span class="param-two">{{ textItem.second }}</span>
              <span class="param-three">{{ textItem.third }}</span>
            </template>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import './ProParameter.css'
import $ from 'jquery'
import accordion from '../../modules/production/assets/js/accordion'

export default {
  props: {
    documents: {
      type: Array,
      require: true
    }
  },
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {
    accordion('.params')
  },
  methods: {

  }
}
</script>
