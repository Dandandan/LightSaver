Router.route('/settings', function () {
    this.render('settings');
});

Template.settings.events({
    'submit #settingsform': function (event) {
        event.preventDefault();
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.mpare': $("#mpareId").val()
            }
        });
        Router.go('/');
    }
});
