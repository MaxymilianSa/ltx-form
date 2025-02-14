import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UnitSelector from '@/components/UnitSelector.vue'
import type { SingleOption } from '@/@types/date-range-selector'

describe('UnitSelector Component', () => {
  const options: SingleOption[] = [
    { value: 'year', label: 'Year' },
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week', disabled: true },
  ]

  it('should render the component', () => {
    const wrapper = mount(UnitSelector, {
      props: { options },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render correct number of options', () => {
    const wrapper = mount(UnitSelector, {
      props: { options },
    })
    const selectOptions = wrapper.findAll('option')
    expect(selectOptions.length).toBe(options.length)
  })

  it('should correctly bind v-model', async () => {
    const wrapper = mount(UnitSelector, {
      props: { options, modelValue: 'year' },
    })

    const select = wrapper.find('select')
    expect(select.element.value).toBe('year')

    await select.setValue('month')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['month'])
  })

  it('should disable options correctly', () => {
    const wrapper = mount(UnitSelector, {
      props: { options },
    })
    const disabledOptions = wrapper.findAll('option:disabled')
    expect(disabledOptions.length).toBe(1)
    expect((disabledOptions[0].element as HTMLSelectElement).value).toBe('week')
  })
})
