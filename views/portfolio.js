(function (Backbone, _, $, undefined) {
    var __super__ = MNKY.PageView.prototype;
    
    MNKY.PortfolioPageView = MNKY.PageView.extend({
        template: MNKY.TMPL.monkeys_portfolio
    });
}(window.Backbone, window._, window.jQuery));
