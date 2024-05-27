const formatRIB = (number: string) => {
  if (number == 'null') return '-'
  return (
    number.substring(0, 3) +
    ' ' +
    number.substring(3, 6) +
    ' ' +
    number.substring(6, number.length - 2) +
    ' ' +
    number.substring(number.length - 2)
  )
}

const firstUpperCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function phoneNumber(phoneNumber: string | undefined | null) {
  if (phoneNumber == 'null') return 'N/A'
  if (!phoneNumber) return 'N/A'
  let newPhone = phoneNumber
  if (String(phoneNumber).length < 10) {
    newPhone = '0' + phoneNumber
  }
  // Remove non-numeric characters from the phone number
  const cleanedNumber = newPhone?.replace(/\D/g, '')

  // Check if the cleaned number has 10 digits
  if (cleanedNumber?.length === 10) {
    // Apply the desired formatting
    const formattedNumber = cleanedNumber.replace(
      /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
      '$1 $2 $3 $4 $5'
    )
    return formattedNumber
  } else {
    // If the number doesn't have 10 digits, return the original input
    return phoneNumber
  }
}

function number(value: number | undefined | null): string {
  if (value === 0) return '0'
  if (!value) return '-'

  const roundedValue = Math.round(value * 100) / 100

  const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return formattedValue
}

export const formatters = {
  formatRIB,
  firstUpperCase,
  phoneNumber,
  number
}
