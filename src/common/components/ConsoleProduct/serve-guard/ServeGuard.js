import '../ConsoleProduct.css'
import '../taichi-ddos/styles/TaichiDdos.css'
import './styles/ServeGuard.css'

const ConsoleProduct = {
  props: {
    banner: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value1: 30,
      tooltip: false,
      min: 0,
      max: 200
    }
  },
  created() {},
  mounted() {},
  methods: {},
  created() {},
  render() {
    return (
      <div class="product-body">
        <div class="product-title">
          <div class="banner">
            <div class="banner-title">
              <span class="title-text">
                {this.banner.title}
              </span>
            </div>
            <div class="banner-desc">
              {this.banner.description.map((item, index) =>
                <p>
                  {item}
                </p>
              )}
            </div>
            {this.$slots.btn}
            <p>
              <i class="el-icon-information info-icon" />
              全新
              <a class="url-text" href="#">
                {this.banner.title}
              </a>即将上线
            </p>
          </div>
        </div>
        <div class="content">
          <p class="content-title">应用场景</p>
          <div class="content-desc">
            <p>服务器在日常运行中会遭受来自各方的威胁，如端口扫描、DDoS、CC等攻击。</p>
            <p>
              服卫士支持Windows Server全系列操作系统（Windows2003/Windows2008/Windows2012 32位
              64位）。
            </p>
            <p>
              采用NDIS驱动层和应用层相结合，具有防DDoS攻击、防CC攻击、端口扫描防护、动态显示包过滤情况监控、端口等管理功能，保障Windows
              Server系列服务器安全。{' '}
            </p>
          </div>
        </div>
      </div>
    )
  },
  destroyed() {
    this.destory()
  }
}

export default ConsoleProduct
