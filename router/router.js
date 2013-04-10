(function (Backbone, _, $, undefined) {
    MNKY.MonkeysRouter = Backbone.Router.extend({
        routes: {
            'portfolio': 'portfolio',
            'github': 'github',
            'labs': 'labsHome',
            'lab/:lab': 'lab',
            '*path': 'index'
        },

        index: function (path) {
            $('.header').removeClass('not-index');
            $('.main-nav a').removeClass('active');
            var view = new MNKY.IndexPageView();
        },
        
        portfolio: function () {
            $('.header').addClass('not-index');
            $('.main-nav a').removeClass('active');
            $('.main-nav #portfolio a').addClass('active');
            var view = new MNKY.PortfolioPageView();
        },

        github: function () {
            $('.header').addClass('not-index');
            $('.main-nav a').removeClass('active');
            $('.main-nav #github a').addClass('active');
            var view = new MNKY.GHE.IndexPageView();
        },
        
        labsHome: function () {
            $('.header').addClass('not-index');
            $('.main-nav a').removeClass('active');
            $('.main-nav #labs a').addClass('active');
            new MNKY.LabsPageView();
        },

        lab: function (lab) {
            $('.header').addClass('not-index');
            $('.main-nav a').removeClass('active');
            $('.main-nav #labs a').addClass('active');
            switch(lab) {
                case 'algo-viz':
                    new DVZ.IndexPageView();
                    break;
                case 'd3':
                    new DDB.PageView();
                    break;
                case 'places':
                    new PLCE.IndexPageView();
                    break;
            }
        }
    });
}(window.Backbone, window.underscore, window.jQuery));
