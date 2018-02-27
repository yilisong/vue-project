<template lang="html">
<div v-if="show" class="base-border carousel">
  <span class="close" @click="show = false"><i class="el-icon-close"></i></span>
  <el-carousel indicator-position="none"  height="240px">
    <el-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-item">
        <!-- <img v-if="Object.is(item, 1)" class="carousel-pic" src="../assets/images/banner001.jpg" alt=""> -->
        <img v-if="Object.is(item, 1)" class="carousel-pic" src="../assets/images/banner002.jpg" alt="">
        <img v-if="Object.is(item, 2)" class="carousel-pic" src="../assets/images/banner003.jpg" alt="">
        <img v-if="Object.is(item, 3)" class="carousel-pic" src="../assets/images/banner004.jpg" alt="">
        <img v-if="Object.is(item, 4)" class="carousel-pic" src="../assets/images/banner005.jpg" alt="">
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import SourceOverviewResource from 'home/resource/SourceOverviewResource'

export default {
  name: 'Advertisement',
  data() {
    return {
      show: true
    }
  },
  created() {},
  methods: {}
}
</script>

<style>
.el-carousel__button {
  background: var(--primary-blue);
}
</style>
<style scoped>
.close {
  cursor: pointer;
  font-size: 14px;
  z-index: 9;
  color: #fff;
  position: absolute;
  top: 12px;
  right: 25px;
}

.carousel {
  border: none;
  margin-bottom: 20px;
}

.carousel-item {
  width: 100%;
}

.carousel-pic {
  width: 100%;
}
</style>
