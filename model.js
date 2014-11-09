Energy = new Mongo.Collection("energy");
Color = new Mongo.Collection('color')



Meteor.startup(function(){
  if (Meteor.isServer) {
    Color.upsert({field: "color"}, {$set: {field: "color", value: "blue"}});
    Color.upsert({field: "effect"}, {$set: {field: "effect", value: "blink"}});
  }
});

if (Meteor.isServer) {
  Meteor.publish('color', function() {
    return Color.find();
  });
}