import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateRangeSelector from '@/components/DateRangeSelector.vue'
import UnitSelector from '@/components/UnitSelector.vue'
import NumericInput from '@/components/NumericInput.vue'
import DatePicker from '@/components/DatePicker.vue'
import type { SingleOption } from '@/@types/date-range-selector'

describe('DateRangeSelector Integration', () => {
  const options: SingleOption[] = [
    { value: 'year', label: 'Year' },
    { value: 'date-from', label: 'Date From' },
    { value: 'date from-to', label: 'Date From-To' },
  ]

  it('should render the component and child components', () => {
    const wrapper = mount(DateRangeSelector, {
      props: { options, numericInput: { min: 0, max: 100 } },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(UnitSelector).exists()).toBe(true)
  })

  it('should show NumericInput when unit is numeric', async () => {
    const wrapper = mount(DateRangeSelector, {
      props: { options, numericInput: { min: 0, max: 100 } },
    })

    const unitSelector = wrapper.findComponent(UnitSelector)
    await unitSelector.find('select').setValue('year')

    expect(wrapper.findComponent(NumericInput).exists()).toBe(true)
    expect(wrapper.findComponent(DatePicker).exists()).toBe(false)
  })

  it('should show DatePicker when unit is date-related', async () => {
    const wrapper = mount(DateRangeSelector, {
      props: { options, modelValue: { unit: 'date-from', date: '2025-01-01' } },
    })

    const unitSelector = wrapper.findComponent(UnitSelector)
    await unitSelector.find('select').setValue('date-from')

    expect(wrapper.findComponent(DatePicker).exists()).toBe(true)
    expect(wrapper.findComponent(NumericInput).exists()).toBe(false)
  })

  it('should correctly handle min/max values for numeric input', async () => {
    const wrapper = mount(DateRangeSelector, {
      props: { options, numericInput: { min: 10, max: 50 } },
    })

    const unitSelector = wrapper.findComponent(UnitSelector)
    await unitSelector.find('select').setValue('year')

    const numericInput = wrapper.findComponent(NumericInput)
    expect(numericInput.props().min).toBe(10)
    expect(numericInput.props().max).toBe(50)
  })

  it('should correctly handle min/max dates for DatePicker', async () => {
    const wrapper = mount(DateRangeSelector, {
      props: {
        options,
        datePicker: { minDate: '2025-01-01', maxDate: '2025-12-31' },
        modelValue: { unit: 'date-from', date: '2025-06-15' },
      },
    })

    const datePicker = wrapper.findComponent(DatePicker)
    expect(datePicker.props().minDate).toBe('2025-01-01')
    expect(datePicker.props().maxDate).toBe('2025-12-31')
  })
})
