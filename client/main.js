Session.set("color", "rgb(0,250,120)");


Template.registerHelper("hue", function() {
  return (tinycolor(Session.get('color')).toHsl().h + 60) % 360;
});
