<template lang="html">
  <div class="">
    <el-row :gutter="20">
      <el-col :offset="3" :span="21">
        <el-button type="primary" @click="updateDiyPage">提交</el-button>
        <el-button @click="dialogVisible = true">预览</el-button>
        <el-input class="upload-html diy-input" type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="<h1></h1>" v-model="diyPageContent">
        </el-input>
      </el-col>
    </el-row>
    <el-dialog title="预览页面" :visible.sync="dialogVisible" size="large">
      <div v-html="diyPageContent"></div>
    </el-dialog>
  </div>
</template>


<script>

export default {
  name: 'upload-html',
  props: {
    html: {}
  },
  data() {
    return {
      diyPageContent: '',
      dialogVisible: false
    }
  },
  mounted() {
    this.diyPageContent = this.html
  },
  methods: {
    updateDiyPage() {
      if (!this.diyPageContent) {
        this.$message({
          showClose: true,
          message: '不能为空！',
          type: 'error'
        })
        return
      }
      this.$emit('updateHtml', this.diyPageContent)
    }
  }
}
</script>

<style scope>
.diy-input {
  margin-top: 30px;
}
</style>
