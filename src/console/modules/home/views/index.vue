<template lang="html">
<div>
  <MigrateTip />
  <row :gutter="10">
    <col :span="24">
      <OverviewHead />
    </col>
  </row>
  <row :gutter="20" class="overview-content">
    <col :xs="24" :sm="24" :md="24" :lg="18">
      <div class="grid-content bg-purple">
        <row :gutter="20">
          <col :span="12">
            <TodayData />
          </col>
          <col :span="12">
            <MessageFlowmeter />
          </col>
        </row>
        <row :gutter="20">
          <col :span="24">
              <FlowmeterTendency />
          </col>
        </row>
        <row>
          <div class="media-query-show">
            <MessageInform />
          </div>
        </row>
        <row :gutter="20">
          <col :span="24">
            <AvailableServices />
          </col>
        </row>
      </div>
    </col>
    <col class="media-query-hide" :xs="0" :sm="0" :md="0" :lg="6">
      <div class="grid-content bg-purple-light">
        <row :gutter="20">
          <col :span="24">
            <div class="media-query-hide">
              <Advertisement />
            </div>
          </col>
        </row>
        <row :gutter="20">
          <col :span="24">
            <div class="media-query-hide">
              <MessageInform />
            </div>
          </col>
        </row>
      </div>
    </col>
    <col :span="24">
      <div class="grid-content bg-purple-light">
        <DisabledServices />
      </div>
    </col>
  </row>
</div>
</template>

<script>
import MigrateTip from './MigrateTip'
import OverviewHead from './OverviewHead'
import TodayData from './TodayData'
import MessageFlowmeter from './MessageFlowmeter'
import FlowmeterTendency from './FlowmeterTendency'
import AvailableServices from './AvailableServices'
import DisabledServices from './DisabledServices'
import Advertisement from './Advertisement'
import MessageInform from './MessageInform'
import {
  mapActions
} from 'vuex'

export default {
  name: 'OverView',
  components: {
    MigrateTip,
    OverviewHead,
    TodayData,
    MessageFlowmeter,
    FlowmeterTendency,
    AvailableServices,
    DisabledServices,
    Advertisement,
    MessageInform
  },
  data() {
    return {
      itemValue: '',
      validContent: false
    }
  },
  created() {
    this.getBasicApplicationInfo()
    this.getTJKDInfo()
    this.getWEBCDNInfo()
    this.getCloudSafeInfo()
    this.getCloudCalc()
  },
  methods: {
    ...mapActions([
      'getBasicApplicationInfo',
      'getTJKDInfo',
      'getWEBCDNInfo',
      'getCloudSafeInfo',
      'getCloudCalc'
    ])
  }
}
</script>

<style scoped>
.overview-content {
  padding: 20px;
}

@media (max-width: 1600px) {
  .media-query-hide {
    display: none;
  }
}

@media (min-width: 1600px) {
  .media-query-show {
    display: none;
  }
}

/*media-query-show*/

.red {
  height: 50px;
  background-color: #ccc;
}
</style>


<style>
@media (min-width: 1200px) {
  .col-lg-18 {
    width: 100% !important;
  }
}
@media (min-width: 1600px) {
  .col-lg-18 {
    width: 75% !important;
  }
}
@media (min-width: 1600px) {
  .col-lg-6 {
    width: 25% !important;
  }
}
@media (min-width: 1366px) {
  .col-md-24 {
    width: 100%;
  }
}
</style>
