
Template.home_logged_in.rendered = function() {
  var $canvas = this.$('canvas');
  var canvas = $canvas.get(0);
  var ctx = canvas.getContext("2d");
  var myLineChart;

  var resize = function() {
    canvas.width = $(window).width();
    canvas.height = $(window).height() * 0.8;
    $canvas.css({width: canvas.width, height: canvas.height});
    makeChart();
  }

  var makeChart = function() {
    var d = data();
    myLineChart = new Chart(ctx).Line(d, {
      showScale: false,
      showTooltips: false,
      scaleShowLabels: false,
    });
  }

  this.autorun(function(d) {
    makeChart();
  });

  $(window).resize(resize);
  resize();

}

var data = function() {
  var userId = property(Meteor.user(), 'profile.mpare');
  
  userId = 1; // user 1 by default XXX


  var fromTimestamp = moment().unix() - 24*60*60 * 2;
  var toTimestamp = moment().unix() - 24*60*60;



  // live mpare usage

  var data = property(Energy.findOne({userid: userId, historicaldata: true}), 'content.data');
  chartData = _.last(data || [], 8000); // last day usage per 10 seconds
  chartData = _.filter(chartData, function(d) { return d.ts > fromTimestamp && d.ts < toTimestamp; });
  chartData = _.map(chartData, function(d) { return parseInt(d.value); });

  
  // take average of every 180 entries (30 minutes)
  var result = [];
  var avg = [];
  chartData = _.each(chartData, function(e) {
    avg.push(e);
    if (avg.length >= 180) {
      result.push(_.reduce(avg, function(memo, num){ return memo + num; }, 0) / avg.length);
      avg = [];
    }
  });
  if (avg.length > 0)
    result.push(_.reduce(avg, function(memo, num){ return memo + num; }, 0) / avg.length);




  // open data usage of zipcode

  var zipcode = '1011AJ';
  var zipEntry = _.findWhere(standaardjaarverbruik.liander, {POSTCODE_VAN: zipcode});
  var yearUsage = zipEntry.SJV;
  var chartData2 = calculateOpenDataUsage(profielE1A.profiel, yearUsage);
  chartData2 = _.filter(chartData2, function(entry) { return entry.ts > fromTimestamp && entry.ts < toTimestamp; });
  chartData2 = _.pluck(chartData2, 'value');

  var result2 = [];
  var avg2 = [];
  chartData2 = _.each(chartData2, function(e) {
    avg2.push(e);
    if (avg2.length >= 2) {
      result2.push(_.reduce(avg2, function(memo, num){ return memo + num; }, 0) / avg2.length);
      avg2 = [];
    }
  });
  if (avg2.length > 0)
    result2.push(_.reduce(avg2, function(memo, num){ return memo + num; }, 0) / avg2.length);
  
  return {
      labels: _.range(48),
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(150,150,255,0.2)",
              strokeColor: "rgba(150,150,255,1)",
              pointColor: "rgba(150,150,255,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: result
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(250,250,170,0.2)",
              strokeColor: "rgba(250,250,170,1)",
              pointColor: "rgba(250,250,170,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: result2
          }
      ]
  };
}

Template.home_logged_in.helpers({
  'currentUsage': function() {
    var userId = parseInt(property(Meteor.user(), 'profile.mpare'));
    var energy = property(Energy.findOne({userid: userId, internalName: "p1_power"}), 'content');
    return energy;
  }
});
