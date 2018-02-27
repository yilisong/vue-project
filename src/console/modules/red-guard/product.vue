<template lang="html">
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb" :isProduct="false">
    <transition :name="mainTransition" mode="out-in">
      <router-view></router-view>
    </transition>
    <div slot="product">
      <ConsoleProduct :content="content" :banner="banner" :name="name">
        <span slot="btn"><a href="#" class="experience-btn" v-on:click="goToService">咨询商务</a></span>
      </ConsoleProduct>
    </div>
  </console-layout>
</template>

<script>
import ConsoleProduct from 'common/components/ConsoleProduct/ConsoleProduct'
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'
import help from 'common/utils/help'
import 'src/common/components/ConsoleProduct/red-guard/styles/RedGuard.css'

export default {
  mixins: [routerSync(require('redGuard/constants/app-menu'))],
  components: {
    ConsoleProduct,
    ConsoleLayout
  },
  data() {
    return {
      content: [
        {
          title: '人工智能',
          description: ['拥有大数据和人工智能两大核心技术，智能识别并防御未知威胁。']
        },
        {
          title: '安全替身',
          description: ['全球独创的页面内容虚拟镜像服务，保证网页内容100%安全。']
        },
        {
          title: '海量特征',
          description: ['十年安全研究实践经验，积累了海量且完备的设备指纹、漏洞、黑客档案等特征库。']
        },
        {
          title: '黑客追溯',
          description: ['基于人工智能、海量特征库和WEB蜜罐，站在客户视角对黑客进行全网追溯。']
        },
        {
          title: '业务安全',
          description: ['实时解决恶意爬虫、垃圾注册、恶意登陆、业务被刷等业务安全问题。']
        },
        {
          title: '高性能架构',
          description: ['云端分布式集群部署，资源弹性可扩展，支持海量域名。']
        }
      ],
      banner: {
        title: '红网卫士 (云WAF)',
        description: [
          '红网卫士是基于海量攻击特征和YUNDUN智脑打造出的新一代企业级云WAF产品。为政府、企业客户的WEB应用提供入侵、篡改、漏洞、WebShell、业务安全等类型的防护；通过大数据行为模型对黑客进行全网追溯，让攻击可感知、可防御、可追溯、可推演。'
        ]
      },
      name: 'redGuard'
    }
  },
  created() {},
  methods: {
    goToService() {
      help.linkService()
    }
  }
}
</script>

<style scope>
</style>
