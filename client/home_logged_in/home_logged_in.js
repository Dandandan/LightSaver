
Template.home_logged_in.rendered = function() {
  var $canvas = this.$('canvas');
  var canvas = $canvas.get(0);
  var ctx = canvas.getContext("2d");
  var myLineChart;

  var resize = function() {
    canvas.width = $(window).width();
    canvas.height = $(window).height() * 0.3;
    $canvas.css({width: canvas.width, height: canvas.height});
    makeChart();
  }

  var makeChart = function() {
    myLineChart = new Chart(ctx).Line(data(), {
      showScale: false,
      showTooltips: false,
    });
  }

  $(window).resize(resize);
  resize();

}

var data = function() {
  return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,250,0.2)",
              strokeColor: "rgba(220,220,250,1)",
              pointColor: "rgba(220,220,250,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 86, 27, 90]
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
