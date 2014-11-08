Router.route('/settings', function () {
    this.render('settings');
});

Template.settings.events({
    'submit #settingsform': function (event) {
        event.preventDefault();
        var mpareId = $("#settingsform select").val();
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.mpare': mpareId
            }
        });
        Router.go('/');
    }
});
