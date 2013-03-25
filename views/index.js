(function (Backbone, _, $, undefined) {
    var __super__ = MNKY.PageView.prototype;
    
    MNKY.IndexPageView = MNKY.PageView.extend({
        template: MNKY.TMPL.monkeys_index
    });
}(window.Backbone, window._, window.jQuery));
