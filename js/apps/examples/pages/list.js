/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/app', 'common/bone', 'common/list', './examplePage'], function (app, Base, List, ExamplePage) {

    var baseUtil =  Base.util;

    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func: singleSelectList,
                title: 'Single Select List'
            },
            {
                func: multiSelectList,
                title: 'Multi Select List'
            },
            {
                func: multiSelectListWithSelectAllNone,
                title: 'Multi Select List with Select All and Select None'
            }
        ]

    })


    function singleSelectList(previewEl, outputEl) {

        //

        var SingleSelect = List.SingleSelect;

        var coll = new SingleSelect.ItemCollection([
            {id: 1, name: 'one', selected: true},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'},
            {id: 4, name: 'four'}
        ]);

        var model = new SingleSelect.Model({
            items: coll
        })

        baseUtil.createView({View: SingleSelect.View, model: model, parentEl: previewEl});

        //
        outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });

    }

    function multiSelectList(previewEl, outputEl) {

        //

        var MultiSelect = List.MultiSelect;

        var coll = new MultiSelect.ItemCollection([
            {id: 1, name: 'one'},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'},
            {id: 4, name: 'four'}
        ]);

        var model = new MultiSelect.Model({
            items: coll
        })


        baseUtil.createView({View: MultiSelect.View, model: model, parentEl: previewEl});

        //

        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });

    }
    function multiSelectListWithSelectAllNone(previewEl, outputEl) {

        //

        var MultiSelect = List.MultiSelect;

        var coll = new MultiSelect.ItemCollection([
            {id: 1, name: 'one'},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'},
            {id: 4, name: 'four'}
        ]);

        var model = new MultiSelect.Model({
            items: coll
        })


        var MyListView = MultiSelect.View.extend({
            template:'<div> <a href="#selectAll" class="action">Select All</a> <a href="#selectNone" class="action">Select None</a> <div class="list-view"></div></div>',
            actionHandler:function(action){
                switch(action){
                    case 'selectAll':
                            this.model.selectAll();
                        break;
                    case 'selectNone':
                        this.model.selectNone();
                        break;
                    default:
                        this.model.setSelectedById(action); //default select click behavior
                        break;
                }
            }
        })


        baseUtil.createView({View: MyListView, model: model, parentEl: previewEl});

        //

        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });

    }


    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})