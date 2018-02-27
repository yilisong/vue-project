<template lang="html">
  <!-- 404页面定制 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">公益404</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>启用公益404页面，帮助孩子回家</p>
      </el-col>
      <el-col :span="6">
        <div class="fr">
          <el-select v-model="diyPage404.type" @change="updateDiyPage404(diyPage404.content)" placeholder="请选择">
            <el-option v-for="(item, index) in diyPage404.typeOption" :key="index" :label="item.label" :value="item.value">
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
    <upload-html v-if="diyPage404.type === 'custom'" :html="diyPage404.content" v-on:updateHtml="updateDiyPage404" ></upload-html>
    <el-row v-if="diyPage404.type === 'app404'" :gutter="20">
      <el-col :offset="3" :span="21">
        <div class="show404">
          <img src="../../assets/images/404.png" alt="">
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import UploadHtml from 'common/components/CustomizationPage/upload-html'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'

export default {
  name: 'page404',
  components: {
    UploadHtml,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      diyPage404: {
        init: true,
        content: '',
        type: 'default',
        typeOption: [{
            value: 'default',
            label: '默认源站错误页面'
          },
          {
            value: 'custom',
            label: '自定义HTML'
          },
          {
            value: 'app404',
            label: '公益404'
          }
        ]
      },
      tipContent: [
        '启用源站错误页面，当出错时直接返回源站错误页面',
        '当启用自定义HTML模式，可以通过编辑HTML代码来自定义404页面，代码中不能包含JS。'
      ]
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchDiyPage404()
  },
  methods: {
    fetchDiyPage404() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.diy_page_404`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (
                res &&
                res.status.code === 1 &&
                res.data &&
                res.data.diy_page_404
              ) {
                this.diyPage404.type = res.data.diy_page_404.type
                this.diyPage404.content = res.data.diy_page_404.content
              }
            })
          }
        },
        e => {}
      )
    },
    updateDiyPage404(html) {
      if (this.diyPage404.init) {
        this.diyPage404.init = false
        return
      }
      this.diyPage404.content = html
      let params
      if (this.diyPage404.type === 'off') {
        params = {
          status: 'off',
          type: 'custom',
          content: this.diyPage404.content
        }
      } else {
        params = {
          status: 'on',
          type: this.diyPage404.type,
          content: this.diyPage404.content
        }
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.diy_page_404`
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
    }
  }
}
</script>

<style scoped>
.show404 {
  padding-top: 28%;
  position:relative;
  img {
    width: 100%;
    vertical-align: middle;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
}
</style>
