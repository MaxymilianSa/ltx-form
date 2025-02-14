<script setup lang="ts">
import type { DateRangeSelectorProps, ValueOptions } from '@/@types/date-range-selector'

defineProps<Pick<DateRangeSelectorProps, 'options'>>()

const model = defineModel<ValueOptions>()
</script>

<template>
  <select v-model="model">
    <option
      v-for="{ value, label, disabled } in options"
      :key="value"
      :disabled="disabled"
      :value="value"
    >
      {{ label }}
    </option>
  </select>
</template>
