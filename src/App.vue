<script setup lang="ts">
import { ref } from 'vue'

import type { DateRangeSelectorProps, DateRangeSelectorValues } from './@types/date-range-selector'
import DateRangeSelector from './components/DateRangeSelector.vue'

const values = ref<DateRangeSelectorValues>({
  unit: 'year',
  numeric: 10,
})

const options: DateRangeSelectorProps['options'] = [
  { value: 'date from-to', label: 'Date From - Date To' },
  { value: 'date-from', label: 'Date From' },
  { value: 'date-to', label: 'Date To' },
  { value: 'year', label: 'Years' },
  { value: 'quarter', label: 'Quarters' },
  { value: 'month', label: 'Months' },
  { value: 'week', label: 'Weeks' },
  { value: 'day', label: 'Days' },
  { value: 'hour', label: 'Hours', disabled: true },
  { value: 'minute', label: 'Minutes', disabled: true },
]
</script>

<template>
  <main>
    <DateRangeSelector
      :options="options"
      v-model="values"
      :date-picker="{
        minDate: '2025-01-01',
        maxDate: '2025-12-31',
      }"
      :numeric-input="{
        min: 0,
        max: 100,
      }"
    />
    <pre>{{ values }}</pre>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}
</style>
