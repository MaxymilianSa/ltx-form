<script setup lang="ts">
import { watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'

import type { DateRangeSelectorValues, DateRangeSelectorProps } from '@/@types/date-range-selector'

const { range } = defineProps<
  {
    range?: boolean
  } & DateRangeSelectorProps['datePicker']
>()

const model = defineModel<DateRangeSelectorValues['date']>()

watch(
  () => range,
  (newRange) => {
    if (model.value !== undefined && model.value !== null) {
      if (!newRange && Array.isArray(model.value)) {
        model.value = model.value[0]
      } else if (newRange && !Array.isArray(model.value)) {
        model.value = [model.value as string, '']
      }
    }
  },
  { immediate: true },
)
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
