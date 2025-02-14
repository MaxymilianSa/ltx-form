export type DateRangeSelectorProps = {
  options: SingleOption[]
  values?: DateRangeSelectorValues
  datePicker?: {
    minDate?: string | Date
    maxDate?: string | Date
  }
  numericInput?: {
    min?: number
    max?: number
  }
}

export type ValueOptions =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'date from-to'
  | 'date-from'
  | 'date-to'

export type DateRangeSelectorValues = {
  unit?: ValueOptions
  numeric?: number
  date?: string | string[] | Date | Date[]
}

export type SingleOption = {
  label: string
  value: ValueOptions
  disabled?: boolean
}
