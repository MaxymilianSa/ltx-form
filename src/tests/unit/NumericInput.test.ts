import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumericInput from '@/components/NumericInput.vue'

describe('NumericInput Component', () => {
  it('should render the component', () => {
    const wrapper = mount(NumericInput)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })

  it('should correctly bind v-model', async () => {
    const wrapper = mount(NumericInput, {
      props: { modelValue: 10 },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('10')

    await input.setValue('20')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([20])
  })

  it('should use default min value when input is empty', async () => {
    const wrapper = mount(NumericInput, {
      props: { min: 5 },
    })

    const input = wrapper.find('input')

    await input.setValue('')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([5])
  })

  it('should not allow values below min', async () => {
    const wrapper = mount(NumericInput, {
      props: { min: 5 },
    })

    const input = wrapper.find('input')

    await input.setValue('3')
    await input.trigger('blur')

    expect(wrapper.emitted('update:modelValue')!.pop()).toEqual([5])
  })

  it('should not allow values above max', async () => {
    const wrapper = mount(NumericInput, {
      props: { max: 50 },
    })

    const input = wrapper.find('input')

    await input.setValue('55')
    await input.trigger('blur')

    expect(wrapper.emitted('update:modelValue')!.pop()).toEqual([50])
  })

  it('should correctly handle non-numeric input', async () => {
    const wrapper = mount(NumericInput, {
      props: { min: 1, max: 100 },
    })

    const input = wrapper.find('input')

    await input.setValue('abc')
    await input.trigger('blur')

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([1])
  })
})
