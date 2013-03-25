(function (Backbone, _, $, undefined) {
    MNKY.PageView = Backbone.View.extend({
        initialize: function () {
            this.render();
            $('#content').html(this.el);
            return this;
        },

        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    })
}(window.Backbone, window._,  window.jQuery));
