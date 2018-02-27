import styles from './ProductBanner.module.css'

const ProductBanner = {
  props: {
    icon: {
      type: String
    },
    fontColor: {
      type: String,
      require: true,
      default: 'black'
    },
    documents: {
      type: Object,
      require: true
    },
    name: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      background: styles.taichiddoswebBackground,
      titleColor: styles.titleColorBlack,
      subTitle: styles.subDarkTitle
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      switch (this.name) {
        case 'taichi-ddos-app':
          this.background = styles.taichiddosappBackground
          break
        case 'taichi-ddos-dns':
          this.background = styles.taichiddosdnsBackground
          break
        case 'taichi-ddos-plus':
          this.background = styles.taichiddosplusBackground
          break
        case 'taichi-ddos-web':
          this.background = styles.taichiddoswebBackground
          break
        case 'hadoop-risk-detect':
          this.background = styles.hadoopriskdetectBackground
          break
        case 'cloud-speed':
          this.background = styles.cloudspeedBackground
          this.titleColor = styles.titleColorDark
          this.subTitle = styles.subBlackTitle
          break
        case 'ssl-certificate':
          this.background = styles.sslcertificateBackground
          this.titleColor = styles.titleColorDark
          this.subTitle = styles.subBlackTitle
          break
        case 'risk-detect':
          this.background = styles.riskdetectBackground
          this.titleColor = styles.titleColorDark
          this.subTitle = styles.subBlackTitle
          break
        case 'server-guard':
          this.background = styles.serverguardBackground
          break
        case 'red-guard':
          this.background = styles.redguardBackground
          this.titleColor = styles.titleColorDark
          this.subTitle = styles.redguardSubtitle
          break
        case 'cloud-host':
          this.background = styles.cloudhostBackground
          this.titleColor = styles.titleColorDark
          this.subTitle = styles.subBlackTitle
          break
        case 'double-mirror':
          this.background = styles.doublemirrorBackground
          this.titleColor = styles.titleColorDark
          this.subTitle = styles.doublemirrorSubtitle
          break
        case 'cloud-monitor':
          this.background = styles.cloudmonitorBackground
          this.titleColor = styles.titleColorDark
          this.subTitle = styles.cloudmonitorSubtitle
          break
        case 'cloud-resolving':
          this.background = styles.cloudresolvingBackground
          this.titleColor = styles.titleColorDark
          this.subTitle = styles.subBlackTitle
          break
        default:
          return
      }
    },
    destory() {}
  },
  created() {},
  render() {
    return (
      <div class={[styles.bannerHeight, this.background]}>
        <div class={[styles.container, styles.content]}>
          <p>
            <span class={[this.titleColor, styles.titleFont, styles.title]}>
              {this.documents.title}
            </span>
            {this.$slots.icon}
          </p>
          <p class={this.subTitle}>
            {this.documents.subTitle}
          </p>
          {this.$slots.btns}
        </div>
      </div>
    )
  },
  destroyed() {
    this.destory()
  }
}

export default ProductBanner
