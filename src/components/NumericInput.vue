<script setup lang="ts">
const { min, max } = defineProps<{
  min?: number
  max?: number
}>()

const model = defineModel<number>()

const validateInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = Number(target.value)

  model.value = !target.value.trim() || isNaN(value) ? min ?? 0 : value
}

const enforceLimits = () => {
  if (model.value === null || model.value === undefined || isNaN(model.value)) {
    model.value = min ?? 0
    return
  }

  if (min !== undefined && model.value < min) model.value = min
  if (max !== undefined && model.value > max) model.value = max
}
</script>

<template>
  <input
    type="number"
    :min="min"
    :max="max"
    :value="model"
    @input="validateInput"
    @blur="enforceLimits"
  />
</template>
