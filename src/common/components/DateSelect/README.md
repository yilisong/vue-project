# dateSelection

> dateSelection Component for showing helpful text into the dom flow

## Usage

```html

=。=！！！ Date range is 90 days  (Don't ask me why, because it is the product) 

<template>
  <dateSelection v-on:timevalue="consoleTimeValue"></dateSelection>
</template>

<script>
import DateSelection from 'common/components/DateSelect/date-selection'

export default {
  components: {
    DateSelection
  },
  data() {
    return {
      endTimevalue: '',
      startTimevalue: ''
    }
  },
  methods() {
    consoleTimeValue(startTimevalue, endTimevalue) {
      this.startTimevalue = startTimevalue
      this.endTimevalue = endTimevalue
      /*默认触发今天情况*/
    }
  }
}
</script>


[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Yundun
