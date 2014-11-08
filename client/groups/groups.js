Router.route('groups', function () {
    this.render('groups', {
        data: function () {
            return {
                groups: Groups.find()
            }
        }
    });
});
