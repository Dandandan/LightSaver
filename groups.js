Groups = new Mongo.Collection("groups");
Groups.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  description: {
    type: String,
    label: "Description",
    max: 200
  },
  creator: {
    type: String,
    label: "Author",
    autoValue: function() {
      return Meteor.userId();
    }
  },
}));
