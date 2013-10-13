window.trendsBattery = Backbone.View.extend({
    trendModel: new TrendsModel(),
    template: _.template(trendsTemplate),
    chart: null,

    chartoptions: {
        chart: {
            renderTo: 'chart-container'
        },
        rangeSelector: {
            enabled: false
        },
        title: {
            text: 'Battery Volts & Solar Amps'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {month: '%e. %b', year: '%b'}
        },
        yAxis: [
            {
                title: {text: 'Battery Volts'},
                min: 22,
                max: 32,
                minorGridLineColor: '#E0E0E0',
            },
            {
                title: {text: 'Solar Charge Amps'},
                min: 0,
                max: 16,
                opposite: true,
            },
        ],
        series: [
            {yAxis: 0, data: [], type: 'line', step: true, name: 'Battery Vdc'},
            {yAxis: 1, data: [], type: 'line', step: true, name: 'Solar Amps'},
        ],
    },

    render: function () {
        that = this;
        $(this.el).html(this.template());
        this.chartoptions.chart.width = (windowWidth);
        this.chartoptions.chart.height = (windowHeight - 150);
        setTimeout(function () {
            chart = new Highcharts.StockChart(that.chartoptions);
            chart.events = {load: that.requestData(this.chart) };
        }, 20);
        return this;
    },
    requestData: function (chart) {

        var querystring = '//myHostServer.com/myFolder/myPHP.php';
        jQuery.get(querystring, null, function (csv, state, xhr) {
            if (typeof csv !== 'string') {
                csv = xhr.responseText;
            }
            ;
            csv = csv.split(/\n/g);
            var vB_array = [];
            var iS_array = [];

            jQuery.each(csv, function (i, line) {
                if (line.length > 1) {
                    line_array = line.split(',');
                    var date = parseInt(line_array[0]) * 1000;
                    var vBpoint = {};
                    var iSpoint = {};
                    vBpoint.x = date;
                    iSpoint.x = date;
                    vBpoint.y = parseFloat(line_array[1]);
                    iSpoint.y = parseFloat(line_array[4]);
                    vB_array.unshift(vBpoint);
                    iS_array.unshift(iSpoint);
                }
                ;
            });
            chart.series[0].setData(vB_array, false);  // <<<<< Problem Area
            chart.series[1].setData(iS_array, false);
            chart.redraw();
        });
        chart.xAxis[0].setExtremes();    // expand out the scrollbar when moving through time:
    },
});