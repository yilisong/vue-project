<template lang="html">
<div class="">
  <el-dialog :title="info" :visible.sync="dialogVisible" size="small" :before-close="handleClose" @open="getDetails">
    <ul class="info-show">
      <li>
        攻击时间：{{detailData.Timestamp}}
      </li>
      <li>
        攻击IP：{{detailData.remote_addr}}
      </li>
      <li>归属地：{{detailData.country}}{{detailData.province}}{{detailData.city}}</li>
      <li>请求方法：{{detailData.method}}</li>
      <li>攻击流量：{{detailData.request_length}}</li>
      <li>操作系统：{{detailData.user_agent_os}}</li>
      <li>请求来源：{{detailData.http_referer}}</li>
      <li>攻击url：{{detailData.request_url }}</li>
      <li>UserAgent：{{detailData.user_agent_browser}}</li>
    </ul>
    <!-- <span slot="footer" class="dialog-footer">
    <i-button @click="dialogVisible = false">取 消</i-button>
    <i-button type="primary" @click="dialogVisible = false">确 定</i-button>
  </span> -->
  </el-dialog>
</div>
</template>

<script>
import SourceGuardResource from '../../resource/SourceGuardResource'
export default {
  props: {
    boxVisible: {
      type: Object
    },
    params: {
      type: Object
    },
    ip: {
      type: String
    }
  },
  computed: {
    info() {
      return '攻击事件详情 - ' + this.ip
    },
    dialogVisible: {
      get() {
        return this.boxVisible.show
      },
      set(newValue) {
        this.boxVisible.show = newValue
      }
    }
  },
  data() {
    return {
      detailData: [],
      loading: false
    }
  },
  methods: {
    getDetails() {
      this.detailData = ''
      this.loading = true
      SourceGuardResource.getwafAttackLogDetail(this.params).then(
        response => {
          this.loading = false
          this.detailData = response.data.data
        }
      )
    },
    handleClose(done) {
      this.boxVisible.show = false
    }
  }
}
</script>

<style lang="css" scoped>
.info-show {
  word-break: break-all;
}
</style>
