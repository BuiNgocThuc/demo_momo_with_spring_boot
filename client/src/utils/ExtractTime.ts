export function formatISODate(dateTime: string): string {
  const date = new Date(dateTime)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}
export function formateTimestampToDateAndTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(',', '')
}

// utils/parseDate.ts
// utils/parseDate.ts
export const parseDateFromString = (dateString: string): Date | undefined => {
  if (dateString.length !== 8) {
    console.error('Invalid date format. Expected DDMMYYYY.')
    return undefined
  }

  const day = parseInt(dateString.slice(0, 2), 10)
  const month = parseInt(dateString.slice(2, 4), 10) - 1 // JS months are 0-indexed
  const year = parseInt(dateString.slice(4, 8), 10)

  // Validate the date components
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    console.error('Invalid date components.')
    return undefined
  }

  const date = new Date(year, month, day)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid time value for the provided date.')
    return undefined
  }

  return date
}
