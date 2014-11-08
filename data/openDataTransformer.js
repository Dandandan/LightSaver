
calculateOpenDataUsage = function(dataset, totalYearUsage) {
  return _.map(dataset, function(tsUsage) {
    return {
      ts: moment(tsUsage['Datumtijd'], "DD-MM-YYYY HH:mm").unix(),
      value: tsUsage.value * totalYearUsage * 4000
    }
  })
}