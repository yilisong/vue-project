import styles from './ProStructure.module.css'

const ProStructure = {
  props: {
    name: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      background: styles.bgFrameTaichiddosapp
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      switch (this.name) {
        case 'taichi-ddos-app':
          this.background = styles.bgFrameTaichiddosapp
          break
        case 'taichi-ddos-dns':
          this.background = styles.bgFrameTaichiddosdns
          break
        case 'taichi-ddos-plus':
          this.background = styles.bgFrameTaichiddosplus
          break
        case 'taichi-ddos-web':
          this.background = styles.bgFrameTaichiddosweb
          break
        case 'cloud-speed':
          this.background = styles.bgFrameCloudspeed
          break
        case 'cloud-monitor':
          this.background = styles.bgFrameCloudmonitor
          break
        case 'double-mirror':
          this.background = styles.bgFrameDoublemirror
          break
        case 'red-guard':
          this.background = styles.bgFrameRedguard
          break
        default:
          return
      }
    },
    destory() {}
  },
  render() {
    return (
      <div class={[styles.frame]}>
        <div class={['container']}>
          <h2 class={[styles.title]}>产品架构</h2>
          <div class={[this.background]} />
        </div>
      </div>
    )
  },
  destroyed() {
    this.destory()
  }
}

export default ProStructure
