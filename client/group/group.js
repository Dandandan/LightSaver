Template.group.events({
    'click #join': function (e) {
        e.preventDefault();
        console.log(this);
        Members.update(this.group._id, {
            $addToSet: {
                members: [{
                    _id: Meteor.userId()
                }]
            }
        }, {
            upsert: true
        });
        return false;
    }
});

Router.route('/group/:_id', function () {
    this.render('group', {
        data: function () {
            return {
                group: Groups.findOne(this.params._id),
                members: Members.findOne(this.params._id)
            }
        }
    });
});
