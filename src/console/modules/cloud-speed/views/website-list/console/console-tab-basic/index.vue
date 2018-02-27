<template lang="html">
<div>
  <!-- 防DDOS -->
<defense-ddos class="config-bg"></defense-ddos>
  <!-- 防CC/访客鉴别 -->
<defense-cc class="config-bg"></defense-cc>
  <!-- 云IDS -->
<cloud-ids class="config-bg"></cloud-ids>
  <!-- 防盗链 -->
<defense-refer class="config-bg"></defense-refer>
  <!-- 区域屏蔽 -->
<zone-limit class="config-bg"></zone-limit>
  <!-- 访问控制-黑名单 -->
<visit-limit class="config-bg"></visit-limit>
</div>
</template>

<script>
import '../../assets/styles/website-help.css'
import DefenseDdos from './defense-ddos'
import DefenseCc from './defense-cc'
import CloudIds from './cloud-ids'
import DefenseRefer from './defense-refer'
import ZoneLimit from './zone-limit'
import VisitLimit from './visit-limit'
import { mapActions } from 'vuex'
export default {
  components: {
    DefenseDdos,
    DefenseCc,
    CloudIds,
    DefenseRefer,
    ZoneLimit,
    VisitLimit
  },
  methods: {
    ...mapActions([
      'changeWebsite'
    ])
  }
}
</script>
<style scoped>
.el-table .cell,
.el-table__body-wrapper,
.el-table,
.el-card {
  overflow: visible;
}
</style>
