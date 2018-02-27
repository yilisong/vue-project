<template lang="html">
<console-page-layout title="网站列表">
  <div class="card-content">
    <div class="header">
      <i-button type="default" icon="fa-cart-plus" class="margin-15r" @click="delAffirm">删除</i-button>
      <div class="fr">
        <el-input class="search" placeholder="请输入域名称进行模糊查询" v-model="searchParam.domain" size="small" :on-icon-click="handleSearch" icon="search">
        </el-input>
      </div>
    </div>
    <!-- table -->
    <div>
      <el-table :data="getWebsiteList" v-loading="tableLoading" element-loading-text="拼命加载中" fit stripe highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="24"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="" label="网站" min-width="120">
          <template scope="scope">
          <el-tooltip class="item" effect="dark" placement="top-start">
             <div slot="content">{{scope.row.domain}}</div>
             <div class="table-website">
               {{scope.row.domain}}
             </div>
          </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label-class-name="label-origin-padding" prop="" label="源站地址" min-width="150" width="160" align="left">
          <template scope="scope">
                <ShowBox :webList="scope.row.records"/>
            </template>
        </el-table-column>
        <el-table-column prop="" label="已开通服务" min-width="80" align="center">
          <template scope="scope">
            <!-- <a href="/console/red-guard#/websiteList">
              <i v-if="scope.row.hwws_status === '0'" class="red-guard"></i>
              <i v-else class="red-guard-active"></i>
            </a> -->
            <a href="/console/taichi-ddos#/websiteProtectList">
              <i v-if="scope.row.tjkd_status === '0'" class="taichi-ddos-web"></i>
              <i v-else class="taichi-ddos-web-active"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="" label="服务状态" min-width="60" align="center">
          <template scope="scope">
            <span v-if="scope.row.anti_status === 0">
              <i class="process-dot"></i>未开启
            </span>
            <span v-if="scope.row.anti_status === 1">
              <i class="succceed-dot"></i>防御中
            </span>
            <span v-if="scope.row.anti_status === 2">
              <i class="fail-dot"></i>已过期
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="套餐" min-width="60" align="center">
          <template scope="scope">
            {{ scope.row.meal_flag_name }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="到期时间" min-width="100" align="center">
          <template scope="scope">
            <ExpireTime :expireTime="scope.row.expire_time"/>
          </template>
          <i class="el-icon-circle-cross"></i>
        </el-table-column>
        <el-table-column label="操作" min-width="60" align="right">
          <template scope="scope">
            <div class="operation">
              <i-button :disabled="(scope.row.status !== '1' || scope.row.anti_status === 2)" type="text" size="small" @click="handleWebsiteOperate('console', scope.row)">管理</i-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 翻页 -->
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handlePaginationSizeChange" @current-change="handlePaginationCurrentPageChange" :page-sizes="paginationParam.pageSizes" :page-size="paginationParam.pageSize" :total="websiteTotal" :current-page="paginationParam.currentPage">
      </el-pagination>
    </div>
  </div>
</console-page-layout>
</template>


<script>
import ShowBox from 'common/components/ShowBox/show-box'
import ExpireTime from 'common/components/ExpireTime/ExpireTime'
import './assets/styles/website-help.css'
import SourceGuardResource from '../../resource/SourceGuardResource'
import ConsolePageLayout from 'common/components/layout/console-page-layout'
import * as types from '../../constants/mutation-types'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ConsolePageLayout,
    ShowBox,
    ExpireTime
  },
  data() {
    return {
      getWebsiteList: [],
      websiteTotal: 0,
      popoverArray: [],
      websiteList: [],
      searchParam: {
        domain: ''
      },
      //显示域名
      showDomain: false,
      // 分页
      paginationParam: {
        pageSizes: [10, 30, 50],
        pageSize: 10,
        currentPage: 1
      },
      // loading
      tableLoading: false,
      multipleSelection: []
    }
  },
  created() {
    this.fetchWebsiteList()
  },
  methods: {
    // 网站列表获取
    fetchWebsiteList(resetPage = false) {
      this.tableLoading = true
      this.paginationParam.currentPage = resetPage ? 1 : this.paginationParam.currentPage
      const params = {
        page: this.paginationParam.currentPage,
        per_page: this.paginationParam.pageSize,
        domain: this.searchParam.domain
      }
      SourceGuardResource.getWebsiteList(params).then(response => {
        console.log(response)
        const {
          list,
          total
        } = response.data.data
        this.getWebsiteList = list
        this.websiteTotal = Number(total)
        this.tableLoading = false
      })
    },
    // 查询和过滤显示
    handleSearch() {
      this.fetchWebsiteList(true)
    },
    // 网站控制操作
    handleWebsiteOperate(operate, row, index) {
      const id = row.domain_id
      // this.$store.dispatch('changeWebsite', row)
      switch (operate) {
        case 'console': //
          this.$router.push(`/websiteList/console/${id}/basic`)
          break
        default:
      }
    },
    // 列表分页
    handlePaginationSizeChange(size) {
      this.paginationParam.pageSize = size
      this.fetchWebsiteList(true)
    },
    handlePaginationCurrentPageChange(currentPage) {
      this.paginationParam.currentPage = currentPage
      this.fetchWebsiteList()
    },
    // 删除
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delAffirm() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择删除项!'
        })
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delWebsite(this.multipleSelection)
      })
    },
    delWebsite(selection) {
      const delArray = []
      selection.forEach(item => {
        delArray.push(item.domain_id)
      })
      const params = {
        ids: delArray
      }
      SourceGuardResource.delWebsite(params).then(res => {
        this.fetchWebsiteList()
        this.windowMessage(res.data.status.message)
      })
    }
  }
}
</script>
<style scoped>
.card-content {
  margin-top: 12px;
  background: var(--wrap-background);
  padding: 12px;
}

.table-website {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

ul li {
  list-style: none;
}

.header {
  margin-bottom: 12px;
}

.search {
  width: 300px;
}

.el-icon-hhws,
.el-icon-tjkd {
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.jumpLink {
  font-size: 14px;
}
</style>
<style>
.label-origin-padding {
  padding-left: 25px;
}
</style>
