(function (Backbone, _, $, undefined) {
    var __super__ = MNKY.PageView.prototype;
    
    MNKY.IndexPageView = MNKY.PageView.extend({
        template: MNKY.TMPL.monkeys_index,

        events: function () {
            return {
                "click .index-nav li": "loadPage",
                "mouseenter .index-nav li": "showBlurb",
                "mouseleave .index-nav li": "hideBlurb"
            };
        },

        loadPage: function (e) {
            var page = $(e.target).attr("id");
            MNKY.router.navigate(page, {trigger:true});
        },

        showBlurb: function (e) {
            var blurb = $(e.target).attr("id");
            this.$('.monkey-icon').hide();
            this.$('.blurbs').find('.'+blurb).show('fast');
        },

        hideBlurb: function (e) {
            this.$('.blurbs').find(':visible').hide();
            this.$('.monkey-icon').show('fast');

        }
    });
}(window.Backbone, window._, window.jQuery));
