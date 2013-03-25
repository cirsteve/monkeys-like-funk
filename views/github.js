(function (Backbone, _, $, undefined) {
    var __super__ = MNKY.PageView.prototype;
    
    MNKY.GithubPageView = MNKY.PageView.extend({
        template: MNKY.TMPL.monkeys_github,

        render: function () {
            __super__.render.call(this, arguments);
            this.user = new MNKY.GHE.UserModel();
            this.repos = new MNKY.GHE.ReposCollection();
            var userView, reposView, that = this;
            //user.on('change', this.renderUser)
            this.user.fetch({success: _.bind(this.renderUser, this)});

        },

        renderUser: function () {

            userView = new MNKY.GHE.UserView({model:this.user});

            this.$('#user-target').html(userView.el);
        }
    });
}(window.Backbone, window._, window.jQuery));
