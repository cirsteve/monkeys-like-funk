(function (Backbone, _, $, undefined) {
    var __super__ = MNKY.PageView.prototype;
    
    MNKY.IndexPageView = MNKY.PageView.extend({
        template: MNKY.TMPL.monkeys_index,

        events: function () {
            return {
                "click .index-nav li": "loadPage",
                "mouseover": "sizeIcon",
                "mouseenter .index-nav li": "showBlurb",
                "mouseleave .index-nav li": "hideBlurb"
            };
        },

        initialize: function () {
            __super__.initialize.apply(this, arguments);

            this.loadIcon();
            return this;
        },

        loadIcon: function () {
            d3.xml("/static/css/images/monkey.svg", "image/svg+xml", _.bind(this.renderIcon, this));
        },

        renderIcon: function (xml) {
            document.getElementById("monkey-target").appendChild(xml.documentElement);

            this.svg = d3.select("#monkey-target").selectAll("svg");

        },

        sizeIcon: function (e) {
            e.stopPropagation();
            var height = $(document).height(),
                width = $(document).width(),
                pageX = e.pageX,
                pageY = e.pageY - 60,
                half = 285,
                calcY = Math.abs(half - pageY),
                s = d3.scale.linear().domain([0,280]).range([100,400]); 
            console.log(e, e.pageX, e.pageY, height, width);

            this.svg.transition().duration(200)
                .attr("height", s(calcY))
                .attr("width", s(calcY));
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
