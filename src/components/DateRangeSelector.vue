<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { datepickerValueOptions, numericInputValueOptions } from '@/const/options'
import type { DateRangeSelectorProps, DateRangeSelectorValues } from '@/@types/date-range-selector'

import UnitSelector from './UnitSelector.vue'
import NumericInput from './NumericInput.vue'
import DatePicker from './DatePicker.vue'

const { options, numericInput, modelValue, datePicker } = defineProps<DateRangeSelectorProps>()

const model = ref<DateRangeSelectorValues>({
  unit: options[0]?.value,
  ...modelValue,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: DateRangeSelectorValues): void
}>()

const isNumeric = computed(
  () => model.value.unit && numericInputValueOptions.includes(model.value.unit),
)
const isDate = computed(() => model.value.unit && datepickerValueOptions.includes(model.value.unit))
const isDateRange = computed(() => model.value?.unit === 'date from-to')

watch(
  () => modelValue,
  (newValue) => {
    if (newValue) model.value = newValue
  },
  { deep: true },
)

watch(
  model,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  { deep: true },
)
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
