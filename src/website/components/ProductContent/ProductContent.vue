<template>
<div :class="style">
  <div class="item-heading" ref="title" v-bind:class="{ fixed: isFixed }">
    <span v-for="(item, index) in itemBlock" :key="index" v-on:click="jump(index)" class="title">
      {{ item.title }}
    </span>
  </div>
  <div class="item-content" v-for="(item, index) in itemBlock" :key="index">
    <slot :name="item.slot"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductContent',
  props: {
    color: {
      type: String
    },
    itemBlock: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      scrolled: false,
      isFixed: false,
      titleTop: 1,
      style: ''
    }
  },
  created() {
    this.selectStyle()
  },
  mounted() {
    this.$nextTick(function() {
      this.titleTop = this.$refs.title.offsetTop
      window.addEventListener('scroll', this.onScroll)
    })
  },
  methods: {
    jump(index) {
      const titleBar = document.querySelector('.item-heading')
      const jump = document.querySelectorAll('.item-content')
      let total
      if (this.isFixed) {
        total = jump[index].offsetTop
      } else {
        total = jump[index].offsetTop - titleBar.clientHeight
      }
      let distance =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      let step = total / 50
      if (total > distance) {
        smoothDown()
      } else {
        const newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }

      function smoothDown() {
        if (distance < total) {
          distance += step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }

      function smoothUp() {
        if (distance > total) {
          distance -= step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
    },
    onScroll() {
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop
      if (scrolled >= this.titleTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }

      // add judge
      const jump = document.querySelectorAll('.item-content')
      const distance = document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      const titles = document.querySelector('.item-heading').children
      jump.forEach((item,index,arr) => {
        const isInside = (arr[index].offsetTop <= distance) && (arr[index + 1] && arr[index + 1].offsetTop > distance) || (arr[index] && !arr[index + 1] && arr[index].offsetTop <= distance)
        if (isInside) {
          addClass(titles[index], 'active')
        } else {
          removeClass(titles[index], 'active')
        }
      })

      function hasClass(el, cls) {
        return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
      }

      function addClass(el, cls) {
        if (!hasClass(el, cls)) {
          el.className += ' ' + cls
        }
      }

      function removeClass(el, cls) {
        if (hasClass(el, cls)) {
          const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
          el.className = el.className.replace(reg,'')
        }
      }
    },
    selectStyle() {
      switch (this.color) {
        case 'dark':
          this.style = 'dark'
          break
        default:
          this.style = 'light'
      }
    }
  }
}
</script>

<style>
.item-heading {
  height: 48px;
  text-align: center;
  .title {
    display: inline-block;
    margin-right: 50px;
    margin-left: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    line-height: 28px;
    cursor: pointer;
  }
}

.fixed {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
}

.light {
  .item-heading {
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
  }
  .fixed {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .05)
  }
  .title.active {
    color: #2d90e6;
  }
}

.dark {
  .item-heading {
    border-top: 1px solid #252525;
    border-bottom: 1px solid #252525;
    color: #b9b9b9;
    background-color: rgba(34, 34, 34, 1);
  }
  .fixed {
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .39);
  }
  .title.active {
    color: #2d90e6;
  }
}
</style>
