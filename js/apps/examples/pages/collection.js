/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'base/dataLoader', './examplePage', 'widgets/table'], function (Base, dataLoader, ExamplePage, Table) {

    var app = Base.app;


    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func: filteredCollection,
                title: 'Filtered Collection'
            }
        ]
    })


    function filteredCollection(previewEl, consoleEl) {
        //starts here

        var arr = [
            {name: 'ravi kumar ravi', kam: 'coding'},
            {name: 'ravi', kam: 'coding'},
            {name: 'john', kam: 'going home'}
        ]
        var coll = new Table.RowCollection(arr);
        //coll.addFilter({column: 'name', expr: 'eq', value: 'ravi'})
        coll.addFilter({column: 'name', expr: 'startsWith', value: 'ravi'})
        //coll.addFilter({column: 'name', expr: 'endsWith', value: 'ravi'})
        coll.addFilter({column: 'name', expr: 'has', value: 'ravi'})

        coll.processedEach(function(model){
            console.log(model.toJSON());
        })

    }


    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    }

})
