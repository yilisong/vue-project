import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './ConsoleProduct.css'

const ConsoleProduct = {
  props: {
    content: {
      type: Array,
      required: true
    },
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
      max: 200,
      swiperImg: [],
      released: false
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 5,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        autoplay: 5000,
        width: 1280,
        height: 318,
        slideToClickedSlide: true
      })
    },
    bindImg(name) {
      this.content.forEach((value, index) => {
        import(`common/components/ConsoleProduct/${name}/images/swiper${index +
          1}.png`).then(imgUrl => {
          this.swiperImg.push(imgUrl)
        })
      })
    },
    destory() {}
  },
  created() {
    switch (this.name) {
      case 'taichiDdos':
        // import('./taichi-ddos/styles/TaichiDdos.css')
        this.bindImg('taichi-ddos')
        this.released = true
        break
      case 'taichiDns':
        // import('./taichi-dns/styles/TaichiDns.css')
        this.bindImg('taichi-dns')
        this.released = true
        break
      case 'taichiPlus':
        // import('./taichi-plus/styles/TaichiPlus.css')
        this.bindImg('taichi-plus')
        this.released = true
        break
      case 'gameShield':
        // import('./game-shield/styles/GameShield.css')
        this.bindImg('game-shield')
        this.released = true
        break
      case 'cloudMonitor':
        // import('./cloud-monitor/styles/CloudMonitor.css')
        this.bindImg('cloud-monitor')
        break
      case 'shieldEye':
        // import('./shield-eye/styles/ShieldEye.css')
        this.bindImg('shield-eye')
        this.released = true
        break
      case 'observeRisk':
        // import('./observe-risk/styles/ObserveRisk.css')
        this.bindImg('observe-risk')
        break
      case 'redGuard':
        // import('./red-guard/styles/RedGuard.css')
        this.bindImg('red-guard')
        this.released = true
        break
      default:
    }
  },
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
              <i class="el-icon-information info-icon" />全新<a
                class="url-text"
                href="#">
                {this.banner.title}
              </a>
              {this.released ? '已上线，敬请体验' : '即将上线'}
            </p>
          </div>
        </div>
        <div class={['swiper-container']}>
          <div class="swiper-wrapper">
            {this.content.length === 1
              ? this.content[0]
              : this.content.map((item, index) =>
                  <div class={['swiper-slide']} key={index}>
                    <div>
                      <div class="img-block">
                        <img src={this.swiperImg[index]} />
                      </div>
                      <p class="item-title">
                        {item.title}
                      </p>
                      {item.description.map((desc, index) =>
                        <p class="item-desc">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                )}
          </div>
          <div class="swiper-pagination" />
        </div>
      </div>
    )
  },
  destroyed() {
    this.destory()
  }
}

export default ConsoleProduct
