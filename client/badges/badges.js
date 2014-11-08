var badges = [{
        name: "7 days Ecothon",
        description: "Saving at least 20% energy for 7 days"
    },
    {
        name: "5 days Ecothon",
        description: "Saving at least 20% energy for 2 days"
    },
    {
        name: "5 days Ecothon",
        description: "Saving at least 20% energy for 2 days"
    }
]


Router.route('/badges', function () {
    this.render('badges', {
        data: {
            badges: badges
        }
    });
});

Template.badges.events({
    'click .challenge-badge': function () {
        console.log(Meteor.userId() + this.name);
        var u = {};
        u['profile.completed.' + this.name] = {
            date: Date.now()
        };
        Meteor.users.update(Meteor.userId(), {
            $set: u
        });
    }
});

Template.badges.helpers({
    'completed': function () {
        var p = Meteor.user();
        console.log(this.name);
        if (p && p.profile && p.profile.completed && p.profile.completed[this.name]) {
            console.log(p.profile.completed[this.name].date);
            return moment(p.profile.completed[this.name].date).fromNow();
        }
    }
});
