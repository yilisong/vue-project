<template lang="html">
  <el-dialog title="推送" size="small" :visible.sync="sendVisible" class="small_el_dialog" :before-close="closeSendVisible">
    <div v-loading="loading">
      <el-row :gutter="15" class="test">
        <el-col :span="4" class="textRight">服务类型</el-col>
        <el-col :span="20">
          <el-select v-model="value" placeholder="请选择" @change="selectWebsiteOrPackages" @visible-change="clearWebsiteOptions">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="15" class="test">
        <el-col :span="4" class="textRight">网站</el-col>
        <el-col :span="20"  v-if="value === '2'">
          <el-select multiple v-model="websiteValueArr" placeholder="请选择" @change="batchChangeDomain">
            <el-option v-for="item in websiteOptions" :key="item.label" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-col>
        <el-col :span="20" v-else>
          <el-select v-model="websiteValue" placeholder="请选择" @change="changeDomain">
            <el-option v-for="item in websiteOptions" :key="item.label" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="15" class="test">
        <el-col :span="4" class="textRight">已绑定</el-col>
        <el-col :span="20">
          <el-table :data="serverList" style="width: 100%" class="sendSet">
            <el-table-column prop="serverkinds" label="服务类型" ></el-table-column>
            <el-table-column prop="serverobject" label="服务对象" ></el-table-column>
            <el-table-column label="操作" width="80">
            <template scope="scope">
                <i-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, serverList)">解除分配</i-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div slot="footer">
      <i-button @click="closeSendVisible" size="small">取 消</i-button>
      <i-button type="primary" @click="handleSendSubmit" size="small">确 定</i-button>
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
      serverList: [{
        serverkinds: '太极抗D plus版',
        serverobject: '套餐一',
        id: 22
      },{
        serverkinds: '太极抗D plus版',
        serverobject: '套餐二',
        id: 212
      }],
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
    sendVisible: {
      get() {
        // this.loading = true
        return this.$store.state.dialog.sendSet.visible
      },
      set: newValue => {}
    }
  },
  methods: {
    ...mapActions([
      'triggerSendSetVisible'
    ]),
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    closeSendVisible() {
      this.triggerSendSetVisible(false)
    },
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
    handleSendSubmit() {
      
    }
  }
}
</script>

<style lang="css" scoped>
  .test {
    margin-top: 20px;
  }
  .textRight {
    text-align: right;
  }
</style>
