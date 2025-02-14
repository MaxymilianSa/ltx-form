<script setup lang="ts">
import { computed, watch, watchEffect } from 'vue'

import { datepickerValueOptions, numericInputValueOptions } from '@/const/options'
import type { DateRangeSelectorProps, DateRangeSelectorValues } from '@/@types/date-range-selector'

import { formatDate } from '@/utils/helpers'

import UnitSelector from './UnitSelector.vue'
import NumericInput from './NumericInput.vue'
import DatePicker from './DatePicker.vue'

const { options, numericInput } = defineProps<DateRangeSelectorProps>()

const model = defineModel<DateRangeSelectorValues>({
  default: {
    unit: '',
    numeric: 0,
    date: '',
  },
})

watch(
  () => model.value,
  (newValue) => {
    if (!newValue) return
    if (!newValue.unit) newValue.unit = options[0]?.value || ''
    if (newValue.numeric === undefined) newValue.numeric = 0
    if (!newValue.date) newValue.date = formatDate(new Date())
  },
  { deep: true, immediate: true },
)

const isNumeric = computed(
  () => model.value?.unit && numericInputValueOptions.includes(model.value.unit),
)
const isDate = computed(
  () => model.value?.unit && datepickerValueOptions.includes(model.value.unit),
)
const isDateRange = computed(() => model.value?.unit === 'date from-to')

watchEffect(() => {
  if (!model.value || !model.value.unit) return
  model.value.date = model.value.unit === 'date from-to' ? ['', ''] : ''
})
</script>

<template>
  <div class="date-range-selector">
    <UnitSelector :options="options" v-model="model.unit" />
    <NumericInput
      v-if="isNumeric"
      v-model.number="model.numeric"
      :min="numericInput?.min"
      :max="numericInput?.max"
    />
    <DatePicker
      v-if="isDate"
      v-model="model.date"
      :range="isDateRange"
      :min-date="datePicker?.minDate"
      :max-date="datePicker?.maxDate"
    />
  </div>
</template>
