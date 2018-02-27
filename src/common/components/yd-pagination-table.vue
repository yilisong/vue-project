<template lang="">
<div class="">
  <div class="header" v-if="$slots.header">
    <slot name="header"></slot>
  </div>
  <div class="">
    <slot></slot>
  </div>
  <el-pagination
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handlePaginationSizeChange"
    @current-change="handlePaginationCurrentPageChange"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="totalCount"
    :current-page="currentPage">
  </el-pagination>
</div>
</template>

<script>
export default {
  props: {
    pageTotalCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pageSizes: [10, 20, 50],
      pageSize: 10,
      currentPage: 1
    }
  },
  computed: {
    totalCount() {
      return this.pageTotalCount
    }
  },
  methods: {
    handlePaginationSizeChange(size) {
      this.pageSize = size
      this.$emit('size-change', this.pageSize)
    },
    handlePaginationCurrentPageChange(currentPage) {
      this.currentPage = currentPage
      this.$emit('current-change', this.currentPage)
    },
    pageSizeReset() {
      this.pageSize = 1
      this.$emit('size-change', this.pageSize)
    }
  }
}
</script>

<style scoped>
  .header {
    margin-bottom: 20px;
  }
</style>
