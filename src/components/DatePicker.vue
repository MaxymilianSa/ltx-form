<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'

import type { DateRangeSelectorValues, DateRangeSelectorProps } from '@/@types/date-range-selector'

defineProps<
  {
    range?: boolean
  } & DateRangeSelectorProps['datePicker']
>()

const model = defineModel<DateRangeSelectorValues['date']>()
</script>

<template>
  <VueDatePicker
    v-model="model"
    :multi-calendars="range"
    :range="range"
    auto-apply
    :enable-time-picker="false"
    format="yyyy-MM-dd"
    model-type="yyyy-MM-dd"
    :min-date="minDate"
    :max-date="maxDate"
    :clearable="false"
  />
</template>
