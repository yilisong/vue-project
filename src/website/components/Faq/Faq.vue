<template>
<div class="faq" :class="whichFaq">
  <div class="container">
    <div class="faq-head">
      常见FAQ
    </div>
    <ul class="faq-list">
      <li class="faq-item" v-for="(item,index) in document" :class="[index === 0 ? 'active' : '']">
        <div class="faq-item-head" @click="toggleFaqItem($event)">
          {{ item.question }}
        </div>
        <div class="faq-item-body">
          {{ item.answer }}
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import './Faq.css'

export default {
  name: 'faq',
  props: {
    name: {
      type: String,
      required: true
    },
    document: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      whichFaq: ''
    }
  },
  created() {
    this.renderByMode()
  },
  methods: {
    toggleFaqItem(event) {
      const parent = event.target.parentNode
      const element = event.target.nextSibling
      let next
      if (element.nodeType === 1) {
        next = element
      } else {
        next = element.nextSibling
      }
      if (next.offsetParent === null) {
        parent.className = parent.className + ' ' + 'active'
      } else {
        parent.className = parent.className.replace(/\bactive\b/, '')
      }
    },
    renderByMode() {
      switch (this.name) {
        case 'yearlyCustomMade':
          this.whichFaq = 'faq-custom-made'
          break
        case 'PersonalGameProtect':
          this.whichFaq = 'faq-game-protect'
          break
        default:
          return
      }
    }
  }
}
</script>
