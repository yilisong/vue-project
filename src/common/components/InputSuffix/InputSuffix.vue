<template>
<div class="suffix-input">
  <input @blur="handleOut" @focus="handleIn" class="el-input__inner" type="text" @change="handleCheckedSuffixChange" v-model="inputList" placeholder="请输入内容">
  <div v-if="visible" class="suffix-select">
    <div class="inline-block">
      <el-checkbox-group class="suffix-box" v-model="checkBoxList" @change="handleCheckedBox">
        <el-row :gutter="12">
          <el-col :span="8">
            <div class="suffix-name">常用静态文件</div>
            <el-checkbox label="js" @change="handleRemove"></el-checkbox>
            <el-checkbox label="css" @change="handleRemove"></el-checkbox>
            <el-checkbox label="html" @change="handleRemove"></el-checkbox>
            <el-checkbox label="rar" @change="handleRemove"></el-checkbox>
            <el-checkbox label="iso" @change="handleRemove"></el-checkbox>
            <el-checkbox label="exe" @change="handleRemove"></el-checkbox>
            <el-checkbox label="apk" @change="handleRemove"></el-checkbox>
            <el-checkbox label="ipa" @change="handleRemove"></el-checkbox>
          </el-col>
          <el-col :span="8">
            <div class="suffix-name">常用图片</div>
            <el-checkbox label="jpg" @change="handleRemove"></el-checkbox>
            <el-checkbox label="png" @change="handleRemove"></el-checkbox>
            <el-checkbox label="gif" @change="handleRemove"></el-checkbox>
            <el-checkbox label="jpeg" @change="handleRemove"></el-checkbox>
            <el-checkbox label="bmp" @change="handleRemove"></el-checkbox>
            <el-checkbox label="ico" @change="handleRemove"></el-checkbox>
            <el-checkbox label="webp" @change="handleRemove"></el-checkbox>
          </el-col>
          <el-col :span="8">
            <div class="suffix-name">常用影音文件</div>
            <el-checkbox label="mp3" @change="handleRemove"></el-checkbox>
            <el-checkbox label="flv" @change="handleRemove"></el-checkbox>
            <el-checkbox label="swf" @change="handleRemove"></el-checkbox>
            <el-checkbox label="rmvb" @change="handleRemove"></el-checkbox>
            <el-checkbox label="wmv" @change="handleRemove"></el-checkbox>
            <el-checkbox label="mp4" @change="handleRemove"></el-checkbox>
            <el-checkbox label="rm" @change="handleRemove"></el-checkbox>
            <el-checkbox label="avi" @change="handleRemove"></el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'input-suffix',
  props: {
    inputSuffixList: {
      type: String
    }
  },
  data() {
    return {
      visible: false,
      inputList: '',
      checkBoxList: [],
      removeValue: ''
    }
  },
  created() {
    this.initList()
    Array.prototype.indexOf = function(val) {
      for (let i = 0; i < this.length; i++) {
        if (this[i] === val) return i
      }
      return -1
    }
    Array.prototype.remove = function(val) {
      const index = this.indexOf(val)
      if (index > -1) {
        this.splice(index, 1)
      }
    }
  },
  mounted() {
    const $body = document.getElementsByTagName('body')[0]
    $body.addEventListener('click', this.showContent, false)
  },
  watch: {
    inputList() {
        this.checkBoxList = this.inputList.split('|')
    }
  },
  methods: {
    handleIn() {
      this.visible = true
    },
    handleOut() {
      this.visible = true
    },
    showContent(e) {
      if (!this.$el.contains(e.target)) {
        this.visible = false
      }
    },
    initList() {
      this.inputList = this.inputSuffixList
      if (!this.inputList) {
        this.checkBoxList = this.inputList.split('')
      } else {
        this.checkBoxList = this.inputList.split('|')
      }
    },
    handleRemove(el) {
      this.removeValue = el.target.value
    },
    handleCheckedBox() {
      this.inputList = this.inputList.split('|')
      if (this.inputList.includes(this.removeValue)) {
        this.inputList.remove(this.removeValue)
      }
      this.inputList = [...new Set([...this.inputList, ...this.checkBoxList])]
      this.inputList = this.inputList.join('|')
      this.handleCheckedSuffixChange()
    },
    handleCheckedSuffixChange() {
      this.checkBoxList = this.inputList.split('|')
      this.$emit('resSuffixList', this.inputList)
    }
  }
}
</script>
<style scoped>
.suffix-input {
  position: relative;
}

.suffix-select {
  min-width: 320px;
  position: absolute;
  z-index: 999;
  background: #fff;
}

.el-checkbox {
  width: 50px;
}

.suffix-box {
  border: 1px solid #eeeeee;
  padding: 10px;
}

.inline-block {
  padding: 10px 5px;
}

.inline-block div+div {
  padding-top: 5px;
}

.suffix-name {
  /*display: inline-block;
  width: 120px;*/
  font-size: 12px;
}

.el-checkbox {
  width: 50px;
  margin: 10px 15px;
}
</style>
<style>
.el-table {
  overflow: visible !important;
}

.el-table .cell,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  overflow: visible !important;
}

.el-table__body-wrapper {
  overflow: visible !important;
}
</style>
