<template lang="html">
  <!-- 永远在线 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">永远在线</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>当源站出现宕机，将已存在的替身镜像内容提供访客访问。</p>
      </el-col>
      <el-col :span="6">
        <el-select v-if="isJoinUp" v-model="alwaysOnline.status" @change="updateAlwaysOnline" class="fr">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="description">
      <el-col :offset="3" :span="21">
        <div v-if="isJoinUp">
          <Tip class="tip" :content="tipContent" mode="static"/>
        </div>
        <div v-else-if="isRemain">
          <div>
            未检测到替身镜像，启用前请创建 <a class="a-link" @click="triggerCreateSubstituteVisible(true)"> 替身镜像 </a>
          </div>
        </div>
        <div v-else>
          <div>
            请先前往 <a class="a-link" href="/console/double-mirror#/doubleMirrorList"> 替身镜像 </a>购买存储空间，并创建相应到替身，方可开启本功能
          </div>
        </div>
      </el-col>
    </el-row>
    <create-substitute></create-substitute>
  </el-card>
</template>

<script>
import ConsoleTabPerformResource from 'cloudSpeed/resource/ConsoleTabPerformResource'
import SourceSpeedCommonResource from 'cloudSpeed/resource/SourceSpeedCommonResource'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import CreateSubstitute from '../../dialogs/create-substitute'
import { mapActions } from 'vuex'

export default {
  name: 'always-online',
  components: {
    Tip,
    CreateSubstitute
  },
  directives: {
    tip: TipDirective
  },
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
      alwaysOnline: {
        init: true,
        status: ''
      },
      tipContent: ['已开启替身镜像'],
      isJoinUp: false,
      isRemain: false
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.init()
  },
  computed: {
    refresh() {
      console.log('computed',this.$store.state.panel.alwaysOnlineRefresh)
      return this.$store.state.panel.alwaysOnlineRefresh
    }
  },
  watch: {
    refresh() {
      console.log('watch',this.$store.state.panel.alwaysOnlineRefresh)
      if (this.$store.state.panel.alwaysOnlineRefresh) {
        this.init()
        this.refreshAlwaysOnlineRefresh(false)
      }
    }
  },
  methods: {
    ...mapActions([
      'triggerCreateSubstituteVisible',
      'refreshAlwaysOnlineRefresh'
    ]),
    init() {
      const params = {
        domain: this.domainId
      }
      SourceSpeedCommonResource.queryDomainInfo(params).then(res => {
        const alwaysOn = res.data.data.alwaysOn
        if (alwaysOn.mirrorInfo) {
          this.isJoinUp = true
        } else {
          if (alwaysOn.remain) {
            this.isRemain = true
          } else {
          }
        }
      }).catch(res => {
      })
      this.fetchAlwaysOnline()
    },
    fetchAlwaysOnline() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.always_online`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (
                res &&
                res.status.code === 1 &&
                res.data &&
                res.data.always_online
              ) {
                this.alwaysOnline.status = res.data.always_online.status
              }
            })
          }
        },
        e => {}
      )
    },
    updateAlwaysOnline() {
      if (this.alwaysOnline.init) {
        this.alwaysOnline.init = false
        // return
      }
      const params = {
        status: this.alwaysOnline.status
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.always_online`
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
