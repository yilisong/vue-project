<template lang="html">
  <!-- 移动端跳转 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">移动端跳转</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>将来自移动终端的请求自动重定向到指定的URL</p>
      </el-col>
      <el-col :span="6">
        <!-- <el-switch class="fr" v-model="mobileJump.status" @change="updateMobileJump()">
        </el-switch> -->
        <el-select v-model="mobileJump.status" @change="updateMobileJump" class="fr" >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21">
        <Tip class="tip" :content="tipContent" mode="static"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="3" class="description">跳转后URL</el-col>
      <el-col :span="18">
        <el-popover :value="errorTip" popper-class="popover-error" ref="popoverError" placement="top" width="200" trigger="manual" content="请输入正确内容!">
        </el-popover>
        <el-input :class="{'is-error':errorTip}" v-popover:popoverError class="url-input" v-model="mobileJump.url" placeholder="请输入内容" @blur="updateMobileJump"></el-input>
        <!-- <i-button type="primary" @click="updateMobileJump">添加</i-button> -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import RULE from 'common/utils/verify'

export default {
  name: 'mobile-jump',
  components: {
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      errorTip: false,
      changeUrl:'',
      options: [{
        value: 'on',
        label: 'ON'
      }, {
        value: 'off',
        label: 'OFF'
      }],
      mobileJump: {
        init: true,
        status: '',
        url:''
      },
      tipContent: [
        '输入跳转后的URL，以http(https)开头'
      ]
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchMobileJump()
  },
  methods: {
    fetchMobileJump() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.mobile_jump`
      this.fetchGet(url, {}).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data && res.data.mobile_jump) {
              this.mobileJump.status = res.data.mobile_jump.status
              this.mobileJump.url = res.data.mobile_jump.jump_url
              this.changeUrl = this.mobileJump.url
            }
          })
        }
      }, e => {})
    },
    updateMobileJump() {
      if (this.mobileJump.init) {
        this.mobileJump.init = false
        return
      }
      // if (this.changeUrl === this.mobileJump.url) {
      //   return
      // }
      this.errorTip = false
      if (!RULE.defaultUrl.test(this.mobileJump.url)) {
        this.errorTip = true
        return
      }
      const params = {
        status: this.mobileJump.status,
        jump_url: this.mobileJump.url
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.mobile_jump`
      this.fetchPut(url, params).then(result => {
        if (result.ok) {
          result.json().then(res => {
            this.windowMessage(res)
          })
        }
      }, e => {})
    }
  }
}
</script>

<style scoped>
/*@import '../../assets/styles/website-help.css';*/
</style>
