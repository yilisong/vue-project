<template lang="html">
<!-- 502/504页面定制 -->
<el-card class="item-padding">
  <el-row :gutter="20">
    <el-col :span="3" class="block-fit">
      <p class="item-name">502/504页面定制</p>
    </el-col>
    <el-col :span="15" class="description">
      <p>定制专属502/504页面，不开启时默认使用YUNDUN提供的错误页面</p>
    </el-col>
    <el-col :span="6">
      <div class="fr">
        <el-select v-model="diyPage502Or504.type" @change="updateDiyPage502Or504(diyPage502Or504.content)" placeholder="请选择">
          <el-option v-for="(item, index) in diyPage502Or504.typeOption" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :offset="3" :span="21">
      <Tip class="tip" :content="tipContent" mode="static" />
    </el-col>
  </el-row>
  <upload-html v-if="diyPage502Or504.type === 'custom'" :html="diyPage502Or504.content" v-on:updateHtml="updateDiyPage502Or504"></upload-html>
  <!-- <el-row :gutter="20">
      <el-col :offset="4" :span="20">
        <el-card> -->
  <!-- <p>1.当启用自定义HTML模式，可以通过编辑HTML代码来自定义502页面，代码中不能包含JS</p>
          <p>2.当启用自定义图片模式，可以上传一张图片作为502页面，图片格式png、jpg、jpeg，大小上限为5MB</p>
          <p>3.启用源站错误页面模式，当出错时直接返回源上的错误页面。</p> -->
  <!-- <div class="fr">
            <i-button type="primary" @click="updateDiyPage502Or504">立即上传</i-button>
          </div>
          <el-input type="textarea" class="upload-html" :autosize="{ minRows: 10, maxRows: 20}" placeholder="<h1></h1>" v-model="diyPage502Or504.content">
          </el-input>
        </el-card>
      </el-col>
    </el-row> -->
</el-card>
</template>

<script>
import UploadHtml from 'common/components/CustomizationPage/upload-html'
import Tip from 'common/components/Tip/Tip'
import TipDirective from 'common/components/Tip/Tip.directive'

export default {
  name: 'page502',
  components: {
    UploadHtml,
    Tip
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      diyPage502Or504: {
        init: true,
        content: '',
        type: 'default',
        typeOption: [{
            value: 'default',
            label: '默认YUNDUN错误页面'
          },
          {
            value: 'custom',
            label: '自定义HTML'
          }
          // {
          //   value: 'origin',
          //   label: '源站错误页面'
          // }
        ]
      },
      tipContent: ['当启用自定义HTML模式，可以通过编辑HTML代码自定义502页面，代码中不能包含JS']
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchDiyPage502Or504()
  },
  methods: {
    fetchDiyPage502Or504() {
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.diy_page_502_or_504`
      this.fetchGet(url, {}).then(
        result => {
          if (result.ok) {
            result.json().then(res => {
              if (res && res.status.code === 1 && res.data && res.data.diy_page_502_or_504) {
                this.diyPage502Or504.type = res.data.diy_page_502_or_504.type
                this.diyPage502Or504.content = res.data.diy_page_502_or_504.content
              }
            })
          }
        },
        e => {}
      )
    },
    updateDiyPage502Or504(html) {
      if (this.diyPage502Or504.init) {
        this.diyPage502Or504.init = false
        return
      }
      this.diyPage502Or504.content = html
      let params
      if (this.diyPage502Or504.type === 'off') {
        params = {
          status: 'off',
          type: 'custom',
          content: this.diyPage502Or504.content
        }
      } else {
        params = {
          status: 'on',
          type: this.diyPage502Or504.type,
          content: this.diyPage502Or504.content
        }
      }
      const url = `Web.Domain.DomainId.${this.domainId}.Settings.diy_page_502_or_504`
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
/*@import '../../assets/styles/website-help.css';*/

@media screen and (min-width:1199px) and (max-width:1401px) {
  .block-fit {
    position: relative;
    height: 14px;
    p {
      position: absolute;
      left: 5px;
    }
  }
}
</style>
