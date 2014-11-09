var badges = [
    {
        name: "Ecothon (7 days)",
        description: "Saving at least 20% energy for 7 days",
        bonus:400
    },
    {
        name: "Ecothon (5 days)",
        description: "Saving at least 20% energy for 2 days",
        bonus:300
    },
    {
        name: "Ecothon (2 days)",
        description: "Saving at least 20% energy for 2 days",
        bonus:300
    },
    {
        name: "Down to Zero! (1 hour)",
        description: "Net zero energy for one hour",
        bonus:300
    },
    {
        name: "Down to Zero! (2 hours)",
        description: "Net zero energy for two hours",
        bonus:300
    },
    {
        name: "Down to Zero! (1 day)",
        description: "Net zero energy for one day",
        bonus:300
    },
    {
        name: "Don't be so Ecoistic(1)!",
        description: "Win 1 challenge in your group",
        bonus:300
    },
    {
        name: "Don't be so Ecoistic(5)!",
        description: "Win 5 challenges in your group",
        bonus:300
    }
];


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
            $set: u, $inc : {'profile.score' : this.bonus}
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
