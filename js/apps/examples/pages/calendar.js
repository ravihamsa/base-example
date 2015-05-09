define(['base', 'apps/examples/pages/examplePage', 'widgets/calendar', 'widgets/form'], function(Base, ExamplePage, Calendar, Form) {
    "use strict";



    var CalendarPageView = ExamplePage.View.extend({
        examples: [{
            func: singleMonth,
            title: 'Month View'
        }, {
            func: dateInput,
            title: 'Date Input Field'
        }]
    });




    function singleMonth(previewEl, consoleEl) {
        //start
        var baseUtil = Base.util;
        var monthModel = new Calendar.Month.Model();
        var date = moment('01/22/1980', 'MM/DD/YYYY');
        monthModel.set({
            month: date.month(),
            year: date.year(),
            selectedEpoch: date.valueOf()
        });

        var monthView = baseUtil.createView({
            View: Calendar.Month.View,
            model: monthModel
        });

        monthView.render();

        monthModel.on('all', function() {
            console.log(arguments);
        });

        monthView.on('all', function() {
            console.log(arguments);
        });
        //end

        monthView.$el.appendTo(previewEl);
    }


    function dateInput(previewEl, consoleEl) {

        //start

        var elCollection = new Form.ElementCollection([{
            name: 'name'
        }, {
            name: 'startDate',
            type: 'dateInput'
        }, {
            name: 'endDate',
            value:moment().add('months', 1).format('L'),
            type: 'dateInput'
        }, {
            name: 'submit',
            type: 'button',
            isPrimary: true,
            value: 'Submit'
        }]);


        var form = new Form.View({
            model: new Form.Model({
                elements: elCollection
            })
        });

        form.render();

        //end

        form.$el.appendTo(previewEl);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });
    }


    return {
        View: CalendarPageView,
        Model: ExamplePage.Model
    };
});
