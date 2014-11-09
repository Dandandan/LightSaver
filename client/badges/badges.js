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
        var u = {};
        u['profile.completed.' + this.name] = {
            date: Date.now()
        };
        Meteor.users.update(Meteor.userId(), {
            $set: u, $inc : {'profile.score' : this.bonus}
        });
        var id = Color.findOne({field: "effect"})._id;
         Color.update(id, {$set: {value: "blink"}});

        var cid = Color.findOne({field: "color"})._id;
        var cval = Color.findOne({field: "color"}).value;
        Color.update(cid, {$set: {value: "#0f9d58"}});
        Session.set("color", "#0f9d58");
         Meteor.setTimeout(function() {
             Color.update(id, {$set: {value: "normal"}});
             Color.update(cid, {$set: {value: cval}})

            Session.set("color", cval);
         }, 10000);
    }
});

Template.badges.helpers({
    'completed': function () {
        var p = Meteor.user();
        if (p && p.profile && p.profile.completed && p.profile.completed[this.name]) {
            return moment(p.profile.completed[this.name].date).fromNow();
        }
    }
});
