Session.set("color", "rgb(0,150,120)");


Template.registerHelper("hue", function() {
  return (tinycolor(Session.get('color')).toHsl().h + 60) % 360;
});

Template.header.rendered = function() {
  var $navbar = $('.navbar');

  // change background color
  this.autorun(function() {
    var color = Session.get('color'); // reactive
    $navbar.css('background-color', color);
  });
}