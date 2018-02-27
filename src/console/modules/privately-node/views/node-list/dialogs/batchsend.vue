<template lang="html">
  <el-dialog title="批量推送" size="small" :visible.sync="batchSendVisible" class="small_el_dialog" :before-close="closeBatchSendVisible">
    <div v-loading="loading">
      <el-row :gutter="15" class="test">
        <el-col :span="6">服务类型</el-col>
        <el-col :span="18">
          <el-select v-model="value" placeholder="请选择" @change="selectWebsiteOrPackages" @visible-change="clearWebsiteOptions">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="15" class="test">
        <el-col :span="6">网站</el-col>
        <el-col :span="18"  v-if="value === '2'">
          <el-select multiple v-model="websiteValueArr" placeholder="请选择" @change="batchChangeDomain">
            <el-option v-for="item in websiteOptions" :key="item.label" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col :span="18" v-else>
          <el-select v-model="websiteValue" placeholder="请选择" @change="changeDomain">
            <el-option v-for="item in websiteOptions" :key="item.label" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div slot="footer">
      <el-button @click="closeBatchSendVisible" size="small">取 消</el-button>
      <el-button type="primary" @click="handleBatchSendSubmit" size="small">推 送</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      ipWhiteList: [],
      loading: false,
      websiteOptions: [{
        value: '1',
        label: 'www.baidu.com'
      }, {
        value: '2',
        label: 'www.yundun.com'
      }],
      websiteValue: '',
      websiteValueArr: [],
      options: [{
        value: '1',
        label: '套餐'
      }, {
        value: '2',
        label: '网站'
      }],
      value: ''
    }
  },
  created() {

  },
  computed: {
    batchSendVisible: {
      get() {
        // this.loading = true
        return this.$store.state.dialog.batchSendSet.visible
      },
      set: newValue => {}
    }
  },
  methods: {
    ...mapActions([
      'triggerBatchSendSetVisible'
    ]),
    selectWebsiteOrPackages() {
        
    },
    clearWebsiteOptions() {
      this.websiteValue = '' 
      this.websiteValueArr = []
    },
    batchChangeDomain() {
      console.log(this.websiteValueArr)
    },
    changeDomain() {
      console.log(this.websiteValue)
    },
    closeBatchSendVisible() {
      this.triggerBatchSendSetVisible(false)
    },
    handleBatchSendSubmit() {
      
    }
  }
}
</script>

<style lang="css" scoped>
  .test {
    margin-top: 20px;
  }
</style>
