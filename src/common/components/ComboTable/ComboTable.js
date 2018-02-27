import styles from './ComboTable.module.css'
import dynamicProps from 'vue-dynamic-props'

const ComboTable = {
  mixins: [dynamicProps()],
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default: () => [20, 50, 100]
    },
    pageSize: {
      type: Number,
      default: 20
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changeCurrent(page) {
      this.current = page
    },
    handleSizeChange(size) {
      const { dynamicProps } = this
      dynamicProps.pageSize = size
      this.$emit(
        'on-size-change',
        dynamicProps.currentPage,
        dynamicProps.pageSize
      )
    },
    handleCurrentChange(current) {
      const { dynamicProps } = this
      dynamicProps.currentPage = current
      this.$emit(
        'on-current-change',
        dynamicProps.currentPage,
        dynamicProps.pageSize
      )
    }
  },
  render() {
    const { dynamicProps } = this
    return (
      <div>
        {(this.$slots.headerLeft || this.$slots.headerRight) && (
          <div class={[styles.monitorHeader, 'clearfix']}>
            {this.$slots.headerLeft && (
              <div class="pull-left">{this.$slots.headerLeft}</div>
            )}
            {this.$slots.headerRight && (
              <div class="pull-right">{this.$slots.headerRight}</div>
            )}
          </div>
        )}
        <div class={styles.monitorBody}>{this.$slots.body}</div>
        <div class={[styles.monitorFooter, 'clearfix']}>
          <div>
            <page
              layout="total, sizes, prev, pager, next, jumper"
              on-size-change={this.handleSizeChange}
              on-current-change={this.handleCurrentChange}
              page-sizes={dynamicProps.pageSizes}
              page-size={dynamicProps.pageSize}
              total={dynamicProps.total}
              current-page={dynamicProps.currentPage}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ComboTable
