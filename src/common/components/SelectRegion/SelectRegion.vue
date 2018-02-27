<template lang="html">
<div class="input-edit" v-loading="loading">
  <el-select v-model="zoneLimit.country" filterable placeholder="国家" @change="handleSelectCountry">
    <el-option v-for="(item,index) in region.country" :key="index" :label="item.country_name" :value="item.country_code">
    </el-option>
  </el-select>
  <el-select v-model="zoneLimit.city" filterable placeholder="省市" @change="handleSelectCity">
    <el-option v-for="(item,index) in region.city" :key="index" :label="item.province_name" :value="item.province_code">
    </el-option>
  </el-select>
  <el-button type="info" @click="addRegion(zoneLimit.country,zoneLimit.city)">添加</el-button>
  <div class="tag">
    <el-tag :closable="true" @close="handleClose(item)" :close-transition="true" class="list-item" :key="index" v-for="(item, index) in listData" type="gray">{{item.zone_name}}</el-tag>
  </div>
</div>
</template>

<script>
import SourceSelectRegionResource from './SourceSelectRegionResource'

export default {
  name: 'SelectRegion',
  props: {
    listData: {}
  },
  data() {
    return {
      loading: true,
      region: {
        country: [],
        city: []
      },
      zoneLimit: {
        country: 'CN',
        city: '11'
      },
      selectRegion: {
        zone_code: {
          country_code: '',
          province_code: ''
        },
        zone_name: ''
      }
    }
  },
  created() {
    this.fetchCountryRegion()
  },
  methods: {
    fetchCountryRegion() {
      SourceSelectRegionResource.getRegion().then(result => {
        this.region.country = result.data.data
        this.fetchCityRegion('CN')
      })
    },
    fetchCityRegion(city) {
      const params = {
        country_code: city
      }
      SourceSelectRegionResource.getRegion(params).then(result => {
        this.region.city = result.data.data
        this.loading = false
      })
    },
    handleSelectCountry(countryCode) {
      this.zoneLimit.city = ''
      this.fetchCityRegion(countryCode)
    },
    handleSelectCity(zone) {},
    addRegion(country, city) {
      this.selectRegion.zone_code.country_code = country
      this.selectRegion.zone_code.province_code = city
      this.listData.push(this.selectRegion)
      this.$emit('updateRegion', this.listData)
    },
    handleClose(item) {
      this.listData.splice(this.listData.indexOf(item), 1)
      this.$emit('updateRegion', this.listData)
    }
  }
}
</script>

<style scope>
/*@import '../../assets/styles/website-help.css';*/
.list-item {
  margin-top: 12px;
  margin-right: 15px;
}

.region {
  margin-top: 15px;
}
</style>
