<template lang="html">
  <!-- 内容替换 -->
  <el-card class="item-padding">
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">内容替换</p>
      </el-col>
      <el-col :span="15" class="description">
        <p>过滤和替换敏感信息、反动言论和淫秽内容。您还可以使用<a class="jumpLink" href="/console/shield-eye#/propertyList">盾眼</a>对网页敏感信息进行实时监控。</p>
      </el-col>
      <el-col :span="6">
        <el-select v-model="status" @change="updateContentReplace" class="fr" >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="3" :span="21">
        <Tip class="tip" :content="tipContent" mode="static"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">自定义敏感词</p>
      </el-col>
      <el-col :span="21">
        <InputEdit :valueType="valueType" v-on:updateItem="updateContentReplace" :listData="diyWords" upperLimit="20"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <p class="item-name">敏感词替换为</p>
      </el-col>
      <el-col :span="21">
        <el-popover :value="errorTip" popper-class="popover-error" ref="popoverError" placement="top" width="200" trigger="manual" content="请输入正确内容!">
        </el-popover>
        <el-input :class="{'is-error':errorTip}" v-popover:popoverError class="url-input" v-model="replaceTo" placeholder="请输入内容" @blur="updateContentReplace"></el-input>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Tip from 'common/components/Tip/Tip'
import InputEdit from 'common/components/InputEdit/input-edit'
import TipDirective from 'common/components/Tip/Tip.directive'
import RULE from 'common/utils/verify'
import SourceGuardResource from 'src/console/modules/red-guard/resource/SourceGuardResource'

export default {
  name: 'content-replace',
  components: {
    Tip,
    InputEdit
  },
  directives: {
    tip: TipDirective
  },
  data() {
    return {
      domainId: '',
      valueType: '',
      errorTip: false,
      replaceTo: '',
      diyWords: [],
      options: [{
          value: 'off',
          label: 'OFF'
        },
        {
          value: 'default',
          label: '默认'
        },
        {
          value: 'custom',
          label: '自定义'
        }
      ],
      init: true,
      status: '',
      url: '',
      tipContent: [
        '1.默认模式：使用YUNDUN专人定期更新的敏感词库。',
        '2.自定义模式：敏感词库取YUNDUN默认词库与用户自定义敏感词并集。',
        '3.敏感词默认替换为“**”。',
        '4.自定义敏感词上限20个。'
      ]
    }
  },
  mounted() {
    this.domainId = this.$route.params.id
    this.fetchContentReplace()
  },
  methods: {
    fetchContentReplace() {
      SourceGuardResource.getContentReplace(this.domainId).then(res => {
        const data = res.data.data.content_replace
        if (data.status === 'on') {
          this.status = data.mode
        } else {
          this.status = data.status
        }
        this.diyWords = data.diy_words || []
        this.replaceTo = data.replace_to
      })
    },
    updateContentReplace() {
      if (this.init) {
        this.init = false
        return
      }
      this.errorTip = false
      let params
      if (this.status === 'off') {
        params = {
          status: 'off',
          replace_to: this.replaceTo,
          diy_words: this.diyWords
        }
      } else {
        params = {
          status: 'on',
          mode: this.status,
          replace_to: this.replaceTo,
          diy_words: this.diyWords
        }
      }
      SourceGuardResource.putContentReplace(this.domainId, params).then(res => {
        this.windowMessage(res.data.status.message)
      })
    }
  }
}
</script>

<style scoped>
</style>
