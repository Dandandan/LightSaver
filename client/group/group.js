Template.group.events({
    'click #join': function (e) {
        e.preventDefault();
        Members.update(this.group._id, {
            $addToSet: {
                members: {
                    _id: Meteor.userId()
                }
            }
        }, {
            upsert: true
        });
        return false;
    }
});

Router.route('/group/:_id', function () {
    Meteor.subscribe("userData");
    this.render('group', {
        data: function () {
            return {
                group: Groups.findOne(this.params._id),
                members: Members.findOne(this.params._id)
            }
        }
    });
});
