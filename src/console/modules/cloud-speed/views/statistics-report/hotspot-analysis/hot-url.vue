<template  lang="html">
<div>
  <div class="toolbar">
    <el-select v-model="selectValue" multiple filterable placeholder="默认所有域名" @change="changeDomain" @visible-change="searchInput($event)" id="searchInput_url">
      <el-option v-for="(item, index) in optionsList" :key="index" :label="item.domain" :value="item.domain"></el-option>
    </el-select>
    <span class="select-cunt-text">已选：<span class="select-cunt">{{ selectLength }}</span></span>
    <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
  </div>
  <div class="status_table" id="hotUrlTable">
    <el-table  v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="url" label="URL" width="800">
        <template scope="scope">
          <el-tooltip placement="top">
            <div slot="content">{{scope.row.url}}</div>
            <i-button type="text" @click="copyAliasName(scope.row)">{{scope.row.url}}</i-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="请求数"></el-table-column>
      <el-table-column prop="percent" label="占比"></el-table-column>
    </el-table>
  </div>
</div>
</template>
<script>
import DateSelection from 'common/components/DateSelect/date-selection'
import help from 'common/utils/help'

  export default {
    components: {
      DateSelection
    },
    data() {
      return {
        selectLength: '全部',
        loading: true,
        endTimevalue: '',
        startTimevalue: '',
        optionsList: '',
        selectValue: [],
        tableData: []
      }
    },
    created() {
      const params = { per_page:1000 }
      this.fetchGet('Web.Domain.list' , params).then(result => {
        if (result.ok) {
          result.json().then(res => {
            if (res && (res.status.code === 1) && res.data) {
              this.optionsList = res.data.list
            }
          })
        }
      }, e => {})
    },
    watch: {

    },
    methods: {
      changeDomain() {
        this.loading = true
        const params = {
          sub_domain:this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue
        }
        this.selectLength = this.selectValue.length
        this.fetchHotUrl(params)
      },
      searchInput(ev) {
        const search = document.getElementById('searchInput_url')
        const searchInput = search.childNodes[0].childNodes[1]
        if (ev === true) {
          searchInput.style.display = 'block'
        } else {
          searchInput.style.display = 'none'
        }
      },
      copyAliasName(row) {
        help.copyText(row.url)
        this.$message({
          showClose: true,
          message: '复制成功',
          type: 'success'
        })
      },
      consoleTimeValue(startTimevalue, endTimevalue) {
        this.loading = true
        this.startTimevalue = startTimevalue
        this.endTimevalue = endTimevalue
        const params = {
          sub_domain:this.selectValue,
          start_time: this.startTimevalue,
          end_time: this.endTimevalue
        }
        this.fetchHotUrl(params)
      },
      fetchHotUrl(params) {
        this.fetchPost('Web.Domain.Report.Visit.top', params).then(result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && (res.status.code === 1) && res.data) {
                this.loading = false
                this.tableData = res.data.top_request_url
                const totalLength = res.data.top_request_url.length
                const totalArr = [] /*申明请求次数数组*/
                for (let i = 0 ; i < totalLength ; i++) {
                  totalArr.push(res.data.top_request_url[i].count)
                }
                const total = eval(totalArr.join('+'))/*请求总数*/
                /*求占比*/
                const per = []
                function GetPercent(num, total) {
                  if (isNaN(num) || isNaN(total)) {
                    return '-'
                  }
                  return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00 + '%')
                }
                for (let j = 0 ; j < totalArr.length ; j++) {
                  this.tableData[j].percent = GetPercent(totalArr[j] , total)
                }
              }
            })
          }
        }, e => {})
      }
    }
  }
</script>

<style>
#hotUrlTable .i-button--text {
  width: 100%;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.el-select {
  /*width: 300px!important;*/
}
@media (max-width: 1280px) {
  .el-select {
    /*width: 167px!important;*/
  }
}
@media (max-width: 1366px) {
  .el-select {
    /*width: 240px!important;*/
  }
}
</style>
