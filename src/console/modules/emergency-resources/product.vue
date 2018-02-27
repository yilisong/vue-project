<template lang="html">
  <console-layout :appMenu="appMenu" :breadcrumb="breadcrumb" :isProduct="false">
    <transition :name="mainTransition" mode="out-in">
      <router-view></router-view>
    </transition>
    <div slot="product">
      <ConsoleProduct :content="content" :banner="banner" :name="name">
        <span slot="btn"><a href="#" class="experience-btn">敬请期待</a></span>
      </ConsoleProduct>
    </div>
  </console-layout>
</template>

<script>
import ConsoleProduct from 'common/components/ConsoleProduct/ConsoleProduct'
import ConsoleLayout from 'common/components/layout/console-layout'
import routerSync from 'common/mixins/routerSync'
import 'src/common/components/ConsoleProduct/cloud-monitor/styles/CloudMonitor.css'

export default {
  mixins: [routerSync(require('./constants/AppMenu'))],
  components: {
    ConsoleProduct,
    ConsoleLayout
  },
  data() {
    return {
      content: [
        {
          title: '高性能架构',
          description: ['监控节点遍布全国，支持多种协议，支持海量监控任务。']
        },
        {
          title: '容灾',
          description: ['云内DNS解析联动，多种切换算法，保证业务稳定。']
        },
        {
          title: '精准',
          description: ['多线路，多监控点联合监控，保证监控结果准确无误报和漏报。']
        },
        {
          title: '多维告警',
          description: ['支持短信、邮件、微信和URL回调等多种告警方式，保证告警信息准确送达。']
        }
      ],
      banner: {
        title: '云监控',
        description: [
          '云监控为应用系统提供全生命周期服务可用性闭环监控。监控涵盖HTTP/HTTPS/TCP等协议。支持云端宕机智能联动切换，有效提升运维效率。'
        ]
      },
      name: 'cloudMonitor'
    }
  },
  created() {}
}
</script>
