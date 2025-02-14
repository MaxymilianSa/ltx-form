export const formatSingleDate = (value: string | Date): string => {
  if (!value) return ''

  const date = value instanceof Date ? value : new Date(value)

  if (isNaN(date.getTime())) return ''

  return date.toISOString().split('T')[0]
}

export const formatDate = (value: string | Date | Array<string | Date>): string | string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => formatSingleDate(item))
  }
  return formatSingleDate(value)
}
