(function (Backbone, _, $, undefined) {
    var __super__ = MNKY.PageView.prototype;
    
    MNKY.DThreePageView = MNKY.PageView.extend({
        template: MNKY.TMPL.monkeys_dthree,
        
        events: {
            'click #stop-bar': 'stopBarChart'
        },

        initialize: function () {
            __super__.initialize.call(this, arguments);
            this.renderBarChart();
            this.getGDPData();
            this.renderMap();
        },

        render: function () {
            __super__.render.call(this, arguments);
        },

        getGDPData: function () {
            d3.csv('static/gdp-data.csv',_.bind(this.handleGDPData, this));
        },

        handleGDPData: function (err, data) {
            var height = 400,
                width = 400,
                margin = 40,
                svg = d3.select("#gdp-target").append("svg")
                        .attr("width", width).attr("height", height),
                xSc = d3.scale.linear().domain([0,5]).range([margin, width-margin]),
                ySc = d3.scale.linear().domain([-10,10]).range([height-margin, margin]),
                rSc = d3.scale.linear().domain([0,400]).range([0,20]),
                oSc = d3.scale.linear().domain([10000,100000]).range([.5,1]),
                cSc = d3.scale.category10().domain(["Africa", "America", "Asia", "Europe", "Oceania"]),
                xAxis = d3.svg.axis().scale(xSc).orient("bottom"),
                yAxis = d3.svg.axis().scale(ySc).orient("left");

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + (height - margin) + ")")
                .call(xAxis);
            
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + margin + ",0)")
                .call(yAxis);

            svg.selectAll(".h").data(d3.range(-8,10,2)).enter()
                .append("line").classed("h", 1)
                .attr("x1", margin).attr("x2", height-margin)
                .attr("y1", ySc).attr("y2", ySc);
            
            svg.selectAll(".v").data(d3.range(1,5)).enter()
                .append("line").classed("v", 1)
                .attr("y1", margin).attr("y2", width-margin)
                .attr("x1", xSc).attr("x2", xSc);
            
            svg.selectAll("circle")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("cx", function (d) { return xSc(0);})
                        .attr("cy", function (d) { return ySc(0);})
                        .attr("r", function (d) { return rSc(0);})
                        .style("fill", function (d) { return cSc(d.continent); })
                        .style("opacity", function (d) { return oSc(+d.GDPcap); });

            svg.selectAll("circle").transition().duration(1500)
                        .attr("cx", function (d) { return xSc(+d.GERD);})
                        .attr("cy", function (d) { return ySc(+d.growth);})
                        .attr("r", function (d) { return rSc(Math.sqrt(+d.population));})

            this.renderGDPScatter(data);
        },

        renderGDPScatter: function (data) {
            var width = 400,
                height = 150,
                margin = 20,
                cwidth = 80,
                cheight = 80,
                cmargin = 5,
                maxr = 5,
                d3svg = d3.select("#gdp-scatter-target").append("svg")
                            .attr("height", height),
                xSc = d3.scale.linear().domain([0,5]).range([cmargin,cwidth-cmargin]),
                ySc = d3.scale.linear().domain([-10,10]).range([cheight-cmargin, cmargin]),
                oSc = d3.scale.linear().domain([0,300000]).range([.5,1]),
                continents = ["Africa","America","Asia","Europe","Oceania"],
                nestedData = d3.nest().key(function (d) { return d.continent; })
                                .sortKeys(d3.ascending)
                                .entries(data);

            var g =d3svg.selectAll("g").data(nestedData)
                .enter().append("g")
                .attr("transform", function (d,i) { return "translate("+(100*i)+",0)";});

            g.append("rect")
                .attr("x", cmargin)
                .attr("y", cmargin)
                .attr("fill", "red")
                .attr("width", cwidth-2*cmargin)
                .attr("height", cheight-2*cmargin)
                    .append("title")
                    .text(function (d) {return d.key;});

            g.append("text")
                .attr("y", cheight+10)
                .attr("x", cmargin)
                .text(function (d) {return d.key;});

            g.selectAll("circle")
                .data(function (d) {return d.values;})
                .enter()
                    .append("circle")
                    .attr("cx", cmargin)
                    .attr("cy", cheight-cmargin)
                    .attr("r", 1)
                    .append("title")
                        .text(function (d) {return d.country;});

            g.selectAll("circle").transition().duration(1000)
                .attr("r",3)
                .attr("cx", function (d) {return xSc( +d.GERD);})
                .attr("cy", function (d) {return ySc( +d.growth);})
                .style("opacity", function (d) {return oSc(d.population);})
                .style("opacity", function (d) {return oSc(+d.GDPcap);});

        },

        renderMap: function () {
            var width = 450,
                height = 200,
                graticule = d3.geo.graticule(),
                projection = d3.geo.equirectangular()
                                .scale(75)
                                .translate([width / 2, height / 2])
                                .precision(.1),
                path = d3.geo.path()
                            .projection(projection),
                svg = d3.select("#map-target").append("svg")
                        .attr("width", width)
                        .attr("height", height);

                svg.append("path")
                    .datum(graticule)
                    .attr("class", "graticule")
                    .attr("d", path);

                d3.json("/static/world-50m.json", function(error, world) {
                      svg.insert("path", ".graticule")
                          .datum(topojson.object(world, world.objects.land))
                          .attr("class", "land")
                          .attr("d", path);

                        svg.insert("path", ".graticule")
                          .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
                          .attr("class", "boundary")
                          .attr("d", path);
                });
        },

        stopBarChart: function () {
            console.log('ddd');
            clearInterval(this.run);
        },

        renderBarChart: function () {
            var t = 1297110663,
                v = 70,
                next = function () {
                    return {
                        time: ++t,
                        value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
                        };
                },
                data = d3.range(23).map(next);
            this.run = setInterval(function() {
                    data.shift();
                    data.push(next());
                    redraw();
                }, 1500);

            var w = 15,
                h = 80,
                x = d3.scale.linear()
                        .domain([0, 1])
                        .range([0, w]),
                y = d3.scale.linear()
                        .domain([0, 100])
                        .rangeRound([0, h]),
                chart = d3.select("#bar-target").append("svg")
                            .attr("class", "chart")
                            .attr("width", w * data.length - 1)
                            .attr("height", h),
                redraw = function () {
                    var rect = chart.selectAll("rect")
                        .data(data, function(d) { return d.time; });

                    rect.enter().insert("rect", "line")
                        .attr("x", function(d, i) { return x(i) - .5; })
                        .attr("y", function(d) { return h - y(d.value) - .5; })
                        .attr("width", w)
                        .attr("height", function(d) { return y(d.value); })
                      .transition()
                        .duration(1000)
                        .attr("x", function(d, i) { return x(i) - .5; });

                    rect.transition()
                        .duration(1000)
                        .attr("x", function(d, i) { return x(i) - .5; });

                    rect.exit()
                        .remove();
                        };

            chart.selectAll("rect")
                .data(data)
                .enter().append("rect")
                .text(function (d) { return d.value; })
                .attr("x", function(d, i) { return x(i) - .5; })
                .attr("y", function(d) { return h - y(d.value) - .5; })
                .attr("width", w)
                .attr("height", function(d) { return y(d.value); });


            chart.append("line")
                .attr("x1", 0)
                .attr("x2", w * data.length)
                .attr("y1", h - .5)
                .attr("y2", h - .5)
                .style("stroke", "#000");
        }
    });
}(window.Backbone, window._, window.jQuery));
