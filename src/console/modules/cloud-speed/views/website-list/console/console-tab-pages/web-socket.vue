<template lang="html">
  <!-- WebSocket -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">WebSocket</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>开启WebSocket服务</p>
      </el-col>
      <el-col :span="6">
        <!-- <el-switch class="fr" v-model="websocket.status" @change="updateWebsocket">
        </el-switch> -->
        <el-select v-model="websocket.status" @change="updateWebsocket" class="fr" >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'web-socket',
  data() {
    return {
      options: [
        {
          value: 'on',
          label: 'ON'
        },
        {
          value: 'off',
          label: 'OFF'
        }
      ],
      websocket: {
        status: '',
        init: true
      }
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchWebsocket()
  },
  methods: {
    fetchWebsocket() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.websocket`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.websocket) {
                this.websocket.status = res.data.websocket.status
              }
            })
          }
        },
        e => {}
      )
    },
    updateWebsocket() {
      if (this.websocket.init) {
        this.websocket.init = false
        return
      }
      const params = {
        status: this.websocket.status
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.websocket`
      this.fetchPut(url, params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              this.windowMessage(res)
            })
          }
        },
        e => {}
      )
    }
  }
}
</script>

<style scoped>
</style>
