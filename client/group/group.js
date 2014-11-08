Router.route('/group/:_id', function () {
    console.log(this);
    this.render('group', {
        data : function () {
            return Groups.findOne(this.params._id);
        }
    }
    );
});
