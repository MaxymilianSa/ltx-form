import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'
import VueDatePicker from '@vuepic/vue-datepicker'

describe('DatePicker Component', () => {
  it('should render the component', () => {
    const wrapper = mount(DatePicker, {
      props: { range: false },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(VueDatePicker).exists()).toBe(true)
  })

  it('should correctly bind v-model for a single date', async () => {
    const wrapper = mount(DatePicker, {
      props: { range: false, modelValue: '2025-01-01' },
    })

    const datePicker = wrapper.findComponent(VueDatePicker)
    expect(datePicker.props().modelValue).toBe('2025-01-01')

    await wrapper.setProps({ modelValue: '2025-02-01' })
    expect(datePicker.props().modelValue).toBe('2025-02-01')

    await datePicker.vm.$emit('update:modelValue', '2025-03-01')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2025-03-01'])
  })

  it('should correctly bind v-model for date range', async () => {
    const wrapper = mount(DatePicker, {
      props: { range: true, modelValue: ['2025-01-01', '2025-01-07'] },
    })

    const datePicker = wrapper.findComponent(VueDatePicker)

    expect(datePicker.props().modelValue).toEqual(['2025-01-01', '2025-01-07'])

    await wrapper.setProps({ modelValue: ['2025-02-01', '2025-02-10'] })
    expect(datePicker.props().modelValue).toEqual(['2025-02-01', '2025-02-10'])

    await datePicker.vm.$emit('update:modelValue', ['2025-03-01', '2025-03-10'])

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['2025-03-01', '2025-03-10']])
  })

  it('should pass min and max dates to VueDatePicker', () => {
    const wrapper = mount(DatePicker, {
      props: { minDate: '2025-01-01', maxDate: '2025-12-31' },
    })

    const datePicker = wrapper.findComponent(VueDatePicker)
    expect(datePicker.props().minDate).toBe('2025-01-01')
    expect(datePicker.props().maxDate).toBe('2025-12-31')
  })

  it('should enable range mode when `range` prop is true', () => {
    const wrapper = mount(DatePicker, {
      props: { range: true },
    })
    const datePicker = wrapper.findComponent(VueDatePicker)
    expect(datePicker.props().range).toBe(true)
    expect(datePicker.props().multiCalendars).toBe(true)
  })

  it('should disable range mode when `range` prop is false', () => {
    const wrapper = mount(DatePicker, {
      props: { range: false },
    })
    const datePicker = wrapper.findComponent(VueDatePicker)
    expect(datePicker.props().range).toBe(false)
    expect(datePicker.props().multiCalendars).toBe(false)
  })

  it('should update model value correctly when range prop changes', async () => {
    const wrapper = mount(DatePicker, {
      props: { range: false, modelValue: '2025-01-01' },
    })

    const datePicker = wrapper.findComponent(VueDatePicker)
    expect(datePicker.props().modelValue).toBe('2025-01-01')

    await wrapper.setProps({ range: true })
    expect(datePicker.props().modelValue).toEqual(['2025-01-01', ''])

    await wrapper.setProps({ range: false })
    expect(datePicker.props().modelValue).toBe('2025-01-01')
  })
})
