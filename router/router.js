(function (Backbone, _, $, undefined) {
    MNKY.MonkeysRouter = Backbone.Router.extend({
        routes: {
            'portfolio': 'portfolio',
            'github': 'github',
            'labs': 'labs',
            '*path': 'index'
        },

        index: function (path) {
            $('.header').removeClass('not-index');
            var view = new MNKY.IndexPageView();
        },
        
        portfolio: function () {
            $('.header').addClass('not-index');
            var view = new MNKY.PortfolioPageView();
        },

        github: function () {
            $('.header').addClass('not-index');
            var view = new MNKY.GHE.IndexPageView();
        },
        
        labs: function (lab) {
            $('.header').addClass('not-index');
            if (!lab) {
                new MNKY.LabsPageView();
            } else {
                new MNKY.labProjectsViews[lab].indexView();
            }
        }
    });
}(window.Backbone, window.underscore, window.jQuery));
