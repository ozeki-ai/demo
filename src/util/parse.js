function range(value) {
  value = value.toLowerCase()
            .replace("one", "1")
            .replace("two", "2")
            .replace("three", "3")
            .replace("four",  "4")
            .replace("five",  "5")
            .replace("six",   "6")
            .replace("seven", "7")
            .replace("eight", "8")
            .replace("nine",  "9")
            .replace("ten",   "10")
            .replace("eleven", "11")
            .replace("twelve", "12")
  const reRange  = /.*?(\d*)\s*(-|to)\s*(\d*).*/i
  const reSingle = /.*?(\d*).*/i
  const reMonths = /\b(month|months|m)\b/i
  const isYears  = !reMonths.test(value)
  const duration = isYears ? "year" : "month"

  let match, low, high;
  if (match = reRange.exec(value)) {
    low  = parseInt(match[1])
    high = parseInt(match[3])
  } else if (match = reSingle.exec(value)) {
    low = high = parseInt(match[1])
  } else {
    low  = isYears ? 1 : 6
    high = isYears ? 3 : 12
  }
  return {
    low,
    high,
    duration
  }
}

export default {
  range
}
