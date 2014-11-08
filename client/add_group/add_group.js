Router.route('add_group', function() {
    this.render('add_group');
});

AutoForm.addHooks('insertGroup', {
    onSuccess: function () {
        Router.go('groups');
    }
}, true);
