export function castValue(expectedType: string, value?: any): any {
  if (value === undefined) {
    return value
  }

  switch (expectedType) {
    case 'Number': {
      return castNumber(value)
    }
    case 'Date': {
      return castDate(value)
    }
    default:
      return value
  }
}

function castNumber(value?: any) {
  if (isNaN(value)) {
    throw new Error(`Value '${value}' is not a valid number`)
  }

  return Number(value)
}

function castDate(value?: any) {
  if (!Date.parse(value)) {
    throw new Error(`Value '${value}' is not a valid Date`)
  }

  return new Date(value)
}
