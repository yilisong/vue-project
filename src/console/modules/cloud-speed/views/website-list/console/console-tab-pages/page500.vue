<template lang="html">
  <!-- 500页面定制 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">500页面定制</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>定制专属500页面，不开启时默认使用源站错误页面</p>
      </el-col>
      <el-col :span="6">
        <div class="fr">
          <el-select v-model="diyPage500.type" @change="updateDiyPage500(diyPage500.content)" placeholder="请选择">
            <el-option v-for="(item, index) in diyPage500.typeOption" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21">
        <Tip class="tip" :content="tipContent" mode="static"/>
      </el-col>
    </el-row>

    <upload-html v-if="diyPage500.type === 'custom'" :html="diyPage500.content" v-on:updateHtml="updateDiyPage500" ></upload-html>

          <!-- <p>1.当启用自定义HTML模式，可以通过编辑HTML代码来自定义500页面，代码中不能包含JS</p>
          <p>2.当启用自定义图片模式，可以上传一张图片作为500页面，图片格式png、jpg、jpeg，大小上限为5MB</p>
          <p>3.启用源站错误页面模式，当出错时直接返回源上的错误页面。</p> -->

    <!-- 图片 -->
    <!-- <el-row :gutter="20" v-if="diyPage500.type === 'pic'">
      <el-col :offset="4" :span="20">
        <div class="fr">
          <i-button type="primary">立即上传</i-button>
        </div>
        <el-upload class="avatar-uploader" action="//jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload" :on-remove="handleRemove">
          <img v-if="diyPage500.picture.imageUrl" :src="diyPage500.picture.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog v-model="diyPage500.picture.dialogVisible" size="tiny">
          <img width="100%" :src="diyPage500.picture.dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </el-row> -->
  </el-card>
</template>

<script>
import UploadHtml from 'common/components/CustomizationPage/upload-html'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'

export default {
  name: 'page500',
  components: {
    UploadHtml,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      diyPage500: {
        init: true,
        content: '',
        type: 'origin',
        typeOption: [
          // {
          //   value: 'default',
          //   label: 'off'
          // },
          {
            value: 'custom',
            label: '自定义HTML'
          },
          {
            value: 'origin',
            label: '默认源站错误页面'
          }
        ],
        picture: {
          imageUrl: '',
          dialogImageUrl: '',
          dialogVisible: false
        }
      },
      tipContent: ['当启用自定义HTML模式，可以通过编辑HTML代码自定义500页面，代码中不能包含JS']
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchDiyPage500()
  },
  methods: {
    fetchDiyPage500() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.diy_page_500`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.diy_page_500) {
                this.diyPage500.type = res.data.diy_page_500.type
                this.diyPage500.content = res.data.diy_page_500.content
              }
            })
          }
        },
        e => {}
      )
    },
    updateDiyPage500(html) {
      if (this.diyPage500.init) {
        this.diyPage500.init = false
        return
      }
      this.diyPage500.content = html
      let params
      if (this.diyPage500.type === 'off') {
        params = {
          status: 'off',
          type: 'custom',
          content: this.diyPage500.content
        }
      } else {
        params = {
          status: 'on',
          type: this.diyPage500.type,
          content: this.diyPage500.content
        }
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.diy_page_500`
      this.fetchPut(url, params).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              this.windowMessage(res)
            })
          }
        },
        e => {}
      )
    },
    handleAvatarScucess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
/*@import '../../assets/styles/website-help.css';*/
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
