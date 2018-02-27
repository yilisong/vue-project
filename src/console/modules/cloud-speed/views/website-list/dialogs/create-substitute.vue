<!-- 添加替身镜像 -->
<template lang="html">
  <el-dialog title="新增替身镜像" v-model="createSubstitueVisible" :before-close="cloesTheDialog" size="small" :close-on-click-modal="true" @open="init">
    <Tip class="tip" :content="tipContent" mode="static"/>
    <!-- <div>
      请选择协议
      <el-switch on-color="#2d90e6" off-color="#2d90e6" v-model="protocol" on-value="https" off-value="http" on-text="https" off-text="http">
      </el-switch>
    </div> -->
    <div>
      备份内容配置
      <el-radio-group v-model="backupContent">
        <el-radio :label="0">首页</el-radio>
        <el-radio :label="1">全站</el-radio>
      </el-radio-group>
    </div>
    <div>
      每日定时更新
      <el-switch v-model="regularUpdate" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
      </el-switch>
      采用独家智能算法，每日定时抓取页面内容
    </div>
    <div slot="footer">
      <i-button @click="triggerCreateSubstituteVisible(false)">取 消</i-button>
      <i-button type="primary" @click="handleSubmit">保 存</i-button>
    </div>
  </el-dialog>
</template>

<script>
import SourceSpeedResource from 'cloudSpeed/resource/SourceSpeedResource'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'
import { mapActions } from 'vuex'

export default {
  components: {
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      loading: true,
      tipContent: ['网页主动抓取模式：YUNDUN爬虫会主动抓取网站所有内容'],
      backupContent: 0,
      regularUpdate: 0,
      protocol: 'http'
    }
  },
  created() {},
  computed: {
    createSubstitueVisible() {
      return this.$store.state.dialog.createSubstitue.visible
    },
    domainId() {
      return this.$store.state.website.domain.id
    }
  },
  methods: {
    ...mapActions([
      'triggerCreateSubstituteVisible',
      'refreshAlwaysOnlineRefresh'
    ]),
    init() {},
    cloesTheDialog() {
      this.triggerCreateSubstituteVisible(false)
    },
    handleSubmit() {
      const domain = `${this.$store.state.website.domain.name}`
      const params = {
        domain: ['http://' + domain],
        backup_content: this.backupContent,
        regular_update: Number(this.regularUpdate)
      }
      SourceSpeedResource.addSubstitute(params).then(res => {
        this.refreshAlwaysOnlineRefresh(true)
        this.triggerCreateSubstituteVisible(false)
      })
    }
  }
}
</script>

<style scoped>

</style>
