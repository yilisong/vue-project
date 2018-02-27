<template lang="html">
<div class="input-edit">
  <el-input :class="{'is-error':validContent}" class="url-input" v-model="itemValue" placeholder="请输入内容" @blur="verifyUrl"></el-input>
  <el-button type="info" @click="addItem(itemValue)">添加</el-button>
  <div class="tag">
    <el-tag :closable="true" @close="handleClose(item)" :close-transition="false" class="list-item" :key="index" v-for="(item, index) in listData" type="gray">{{item}}</el-tag>
  </div>
</div>
</template>

<script>
import RULE from 'common/utils/verify'

export default {
  name: 'input-edit',
  props: {
    listData: {},
    noValid: {
      type: Boolean,
      default: true
    },
    validType: {
      type: String,
      default: ''
    },
    upperLimit: {
      type: String,
      default: '20'
    }
  },
  data() {
    return {
      itemValue: '',
      validContent: false
    }
  },
  created() {},
  methods: {
    verifyUrl(value) {
      let isError
      switch (this.validType) {
        case '':
          return
          break
        case 'domain':
          isError = true
          if (!RULE.defenseReferDomain.test(this.itemValue)) {
            this.validContent = true
          } else {
            this.validContent = false
            isError = false
          }
          return isError
          break
        case 'ip':
          isError = true
          if (
            !RULE.ipRangeReg.test(this.itemValue) &&
            !RULE.cidrREG.test(this.itemValue)
          ) {
            this.validContent = true
          } else if (
            RULE.ipReg192.test(this.itemValue) ||
            RULE.ipReg10.test(this.itemValue) ||
            RULE.ipReg172.test(this.itemValue)
          ) {
            this.validContent = true
          } else {
            this.validContent = false
            isError = false
          }
          return isError
          break
        default:
          return isError
      }
    },
    handleClose(item) {
      this.listData.splice(this.listData.indexOf(item), 1)
      this.$emit('updateItem', this.listData)
    },
    addItem(item) {
      if (this.verifyUrl()) {
        this.$message({
          showClose: true,
          message: '请输入正确格式',
          type: 'error'
        })
        return
      }
      if (!this.itemValue) {
        this.$message({
          showClose: true,
          message: '请输入内容',
          type: 'error'
        })
        return
      }
      for (const arrayItem of this.listData) {
        if (Object.is(this.itemValue, arrayItem)) {
          this.$message({
            showClose: true,
            message: '输入内容已存在',
            type: 'error'
          })
          return
        }
      }
      console.log('length', this.listData.length, this.upperLimit)
      if (this.listData.length >= this.upperLimit && this.upperLimit) {
        this.$message({
          showClose: true,
          message: '已达规则上线',
          type: 'error'
        })
        return
      }
      this.listData.push(item)
      this.$emit('updateItem', this.listData)
      this.itemValue = ''
    }
  }
}
</script>

<style scoped>
.list-item {
}

.tag {
  width: 320px;
  margin-bottom: 12px;
}

.el-tag {
  margin-top: 12px;
}

.input-edit {

}
</style>
