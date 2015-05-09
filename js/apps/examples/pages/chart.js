/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'apps/examples/pages/examplePage', 'widgets/chart'], function(Base, ExamplePage, Chart) {
    "use strict";


    var PageView = ExamplePage.View.extend({
        examples: [{
            func: simpleChart,
            title: 'Simple Chart'
        }, {
            func: externalDataLoad,
            title: 'external data load'
        }]
    });

    function simpleChart(previewEl) {

        //s

        var chartCollection = new Chart.Collection([], {
            configs: {
                yAxis: 'users',
                xAxis: 'date',
                type: 'area'
            }
        });


        chartCollection.url = function() {
            var yAxis = this.getConfig('yAxis');
            return '/app/data/userdata.json?yAxis=' + yAxis;
        };

        var chartView = new Chart.View({
            collection: chartCollection,
            preLoadData: true
        });


        chartView.render();
        //ends

        chartView.$el.appendTo(previewEl);

        var button = $('<button>Change Y Axis to Age</button>');
        button.click(function(e) {
            e.preventDefault();
            chartCollection.setConfig('yAxis', 'age');
        });
        var button2 = $('<button>Change Y Axis to Users</button>');
        button2.click(function(e) {

            e.preventDefault();
            chartCollection.setConfig('yAxis', 'users');
        });

        var button3 = $('<button>Set Chart Type to Line</button>');
        button3.click(function(e) {
            e.preventDefault();
            chartCollection.setConfig('type', 'line');
        });

        var button4 = $('<button>Set Chart Type to Area</button>');
        button4.click(function(e) {
            e.preventDefault();
            chartCollection.setConfig('type', 'area');
        });

        button.appendTo(previewEl);
        button2.appendTo(previewEl);
        button3.appendTo(previewEl);
        button4.appendTo(previewEl);
    }


    function externalDataLoad(previewEl) {

        //s

        var dataModel = new Base.Model({}, {
            url: '/app/data/userdata2.json'
        });



        var chartCollection = new Chart.Collection([], {
            configs: {
                yAxis: 'users',
                xAxis: 'date',
                type: 'area'
            }
        });



        var chartView = new Chart.View({
            collection: chartCollection
        });



        dataModel.fetch().done(function(resp) {
            chartCollection.set(resp.results, {
                reset: true
            });
            chartCollection.trigger('dataUpdate');

        });

        chartView.render();
        //ends

        chartView.$el.appendTo(previewEl);

        var button = $('<button>Change Y Axis to Age</button>');
        button.click(function(e) {
            e.preventDefault();
            chartCollection.setConfig('yAxis', 'age');
        });
        var button2 = $('<button>Change Y Axis to Users</button>');
        button2.click(function(e) {

            e.preventDefault();
            chartCollection.setConfig('yAxis', 'users');
        });

        var button3 = $('<button>Set Chart Type to Line</button>');
        button3.click(function(e) {
            e.preventDefault();
            chartCollection.setConfig('type', 'line');
        });

        var button4 = $('<button>Set Chart Type to Area</button>');
        button4.click(function(e) {
            e.preventDefault();
            chartCollection.setConfig('type', 'area');
        });

        button.appendTo(previewEl);
        button2.appendTo(previewEl);
        button3.appendTo(previewEl);
        button4.appendTo(previewEl);
    }



    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    };

});