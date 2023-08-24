function range(value) {
  const reRange  = /.*\b(.*?)\s*(-|to)\s*(\S*)\b(.*)/i
  const reMonths = /\b(month|months|m)\b/i
  const isYears  = !reMonths.test(value)
  const isRange  = reRange.test(value)
  const duration = isYears ? "year" : "month"
  const low      = isRange && reRange.exec(value)[1] || (isYears ? 1 : 1)
  const high     = isRange && reRange.exec(value)[3] || (isYears ? 3 : 12)
  return {
    low,
    high,
    duration
  }
}

export default {
  range
}
