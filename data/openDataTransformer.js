calculateOpenDataUsage = function(dataset, totalYearUsage) {
  return _.map(dataset, function(tsUsage) {
    return {
      ts: tsUsage['Datumtijd'],
      value: tsUsage.value * totalYearUsage * 4000
    }
  })
}
