<template lang="html">
  <div v-if="showTip">
    <row class="migrate-tip" :gutter="0">
      <col :span="2" class="custom-width">
        <span class="tip-title">
        </span>
      </col>
      <col :span="1">
        <i class="segmentation"></i>
      </col>
      <col :span="19">
        <p class="tip-content" v-if="migrated">
          上海云盾
          <a href="http://v4.yundun.com/domainList" class="tip-link" target="_blank">旧版站点</a>
          即将停止服务，将于2017年10月25日开始将您在旧版添加的域名升级到新版，升级期间旧版控制台可能无法进行正常操作，升级后可享更优质服务和节点资源，具体请前往新版
          <a href="/console/cloud-resolving#/domainList" class="tip-link">云解析</a>、
          <a href="/console/cloud-speed#/websiteList" class="tip-link">云加速</a>
          进行管理操作。
          <span class="tip-link" @click="explainDialog = true">升级说明</span>
        </p>
        <p class="tip-content one-line" v-else>
          <a href="http://v4.yundun.com/domainList" class="tip-link" target="_blank">旧版站点</a>
          添加的域名已升级至本站点，支持对已升级的域名进行配置管理。技术支持为您提供7x24服务和保障。
          <span class="tip-link" @click="handleOpenDialog">升级说明</span>
        </p>
      </col>
      <col :span="2" class="custom-close-width">
        <span class="close-btn" @click="showTip = false">
          <i class="el-icon-close"></i>
        </span>
      </col>
    </row>
    <el-dialog title="升级说明" :visible.sync="explainDialog" size="small">
      <ul class="explain-content">
        <li>
          <i class="again-dot"></i>
          <p>升级期间可能无法进行域名管理操作；</p>
        </li>
        <li>
          <i class="again-dot"></i>
          <p>升级到新版本后，将为您提供更高级灵活防护策略，分配更优良防护节点，显著提升整体防护加速能力；</p>
        </li>
        <li>
          <i class="again-dot"></i>
          <p>老用户迁移后遇到任何操作性疑问请直接联系<span class="tip-link" @click="goToService">技术支持</span>，将免费提供7x24技术支持服务；</p>
        </li>
        <li>
          <i class="again-dot"></i>
          <p>老用户任何建议和需求可直接反馈给<a onclick="parent.location='mailto:product@yundun.com'" class="tip-link">产品经理</a>(<span class="cursor-pointer" @click="copyEmail">product@yundun.com</span>)，提供合理反馈的老用户将获取相应产品8折折扣优惠券。</p>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <i-button @click="explainDialog = false">取 消</i-button>
      </span>
    </el-dialog>
    <el-dialog title="升级说明" :visible.sync="migratedExplainDialog" size="small">
      <ul class="explain-content">
        <li>
          <i class="again-dot"></i>
          <p>迁移后的套餐对应关系</p>
          <i-table class="i-table" :data="migrateTableData" border>
            <i-table-column prop="old" label="旧平台套餐">
            </i-table-column>
            <i-table-column prop="fresh" label="新平台套餐">
            </i-table-column>
          </i-table>
        </li>
        <li>
          <i class="again-dot"></i>
          <p>升级到新版本后，将为您提供更高级灵活防护策略，分配更优良防护节点，显著提升整体防护加速能力；</p>
        </li>
        <li>
          <i class="again-dot"></i>
          <p>老用户迁移后遇到任何操作性疑问请直接联系
            <span class="tip-link" @click="goToService">技术支持</span>，
            将免费提供7x24技术支持服务；
            <a href="/static/pdf/migrateTipText.pdf" download="上海云盾云加速操作手册.pdf" class="tip-link">下载云加速操作手册</a>
          </p>
        </li>
        <li>
          <i class="again-dot"></i>
          <p>老用户任何建议和需求可直接反馈给<a onclick="parent.location='mailto:product@yundun.com'" class="tip-link">产品经理</a>(<span class="cursor-pointer" @click="copyEmail">product@yundun.com</span>)，提供合理反馈的老用户将获取相应产品8折折扣优惠券。</p>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <i-button @click="migratedExplainDialog = false">取 消</i-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import help from 'common/utils/help'
import CommonResource from 'common/resource/CommonResource'

export default {
  name: 'MigrateTip',
  data() {
    return {
      explainDialog: false,
      migratedExplainDialog: false,
      showTip: false,
      migrated: true,
      migrateTableData: [
        {
          old: '旧版站点NS模式接入',
          fresh: '云解析，云加速'
        },
        {
          old: '旧版站点CNAME模式接入',
          fresh: '云加速'
        }
      ]
    }
  },
  created() {
    CommonResource.getMemberMigrateTeam().then(response => {
      const data = response.data.data
      if (data.migrate_team === '1') {
        if (data.is_migrate === '2') {
          this.migrated = false
        }
        this.showTip = true
      }
    })
  },
  methods: {
    goToService() {
      help.linkService()
    },
    copyEmail() {
      help.copyText('product@yundun.com')
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
    },
    handleOpenDialog() {
      if (this.migrated) {
        this.explainDialog = true
      } else {
        this.migratedExplainDialog = true
      }
    }
  }
}
</script>

<style scoped>
.i-table {
  margin-top: 10px;
}

.custom-width {
  width: 150px;
}

.custom-close-width {
  width: 30px;
}

.migrate-tip {
  color: #333333;
  height: 60px;
  background-image: linear-gradient(to right, #ffcea7, #ffe9ae);
}

.tip-title {
  font-size: 16px;
  line-height: 60px;
  margin-left: 30px;
  margin-right: 20px;
  .note {
    width: 24px;
    margin-right: 10px;
    height: 22px;
    position: relative;
    top: 4px;
  }
}

.segmentation {
  position: absolute;
  top: 10px;
  display: inline-block;
  height: 40px;
  border-right: 1px solid #e5bc97;
}

.tip-link {
  cursor: pointer;
  color: var(--primary-blue);
  font-weight: 900;
}

.support-link {
  cursor: pointer;
  color: var(--primary-blue);
}

.tip-content {
  margin-left: 20px;
  font-size: 14px;
  line-height: 20px;
  padding-top: 12px;
}

.one-line {
  line-height: 35px;
}

.explain-content {
  margin-left: 10px;
  li {
    position: relative;
    line-height: 30px;
  }
}

.again-dot {
  position: absolute;
  top: 11px;
  left: -10px;
}

.close-btn {
  float: right;
  position: relative;
  cursor: pointer;
  top: 20px;
}
</style>
