<template>
<div>
  <el-checkbox-group class="suffix-select" v-model="checkList" @change="handleCheckedSuffixChange">
    <el-row :gutter="20">
      <el-col :span="8" class="test">
        <span class="suffix-name">常用静态文件</span>
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
        <span class="suffix-name">常用图片</span>
        <el-checkbox label="jpg" @change="handleRemove"></el-checkbox>
        <el-checkbox label="png" @change="handleRemove"></el-checkbox>
        <el-checkbox label="gif" @change="handleRemove"></el-checkbox>
        <el-checkbox label="jpeg" @change="handleRemove"></el-checkbox>
        <el-checkbox label="bmp" @change="handleRemove"></el-checkbox>
        <el-checkbox label="ico" @change="handleRemove"></el-checkbox>
        <el-checkbox label="webp" @change="handleRemove"></el-checkbox>
      </el-col>
      <el-col :span="8">
        <span class="suffix-name">常用影音文件</span>
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
</template>

<script>
export default {
  name: 'suffix-select',
  props: {
    suffixList: {
      type: String
    }
  },
  data() {
    return {
      checkList: [],
      removeValue: ''
    }
  },
  created() {
    this.initList()
  },
  watch: {
    updateList(newValue) {
      this.initList()
    }
  },
  computed: {
    updateList: {
      get() {
        return this.suffixList
      }
    }
  },
  mounted() {
    console.log(this.$el.style.width)
  },
  methods: {
    initList() {
      if (this.suffixList === '') {
        this.checkList = this.suffixList.split('')
      } else {
        this.checkList = this.suffixList.split('|')
        this.handleCheckedSuffixChange()
      }
    },
    handleRemove(el) {
      this.removeValue = el.target.value
    },
    handleCheckedSuffixChange() {
      this.$emit('changeSuffixList', this.checkList, this.removeValue)
    }
  }
}
</script>
<style scoped>
.suffix-select {
  border: 1px solid #eeeeee;
  padding: 10px;
}

.test {
  /*border-left: 1px solid red;*/
}

.inline-block {
  padding: 10px 5px;
}

.inline-block div+div {
  padding-top: 5px;
}

.suffix-name {
  display: inline-block;
  width: 120px;
  font-size: 13px;
}

.el-checkbox {
  width: 50px;
  margin: 10px 15px;
}
</style>
