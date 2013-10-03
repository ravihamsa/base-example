/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base/app', 'base', 'list', './examplePage'], function (app, Base, List, ExamplePage) {

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

        //start

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

        var view = baseUtil.createView({View: SingleSelect.View, model: model, parentEl: previewEl, parentView:this});

        //end
        outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        view.listenTo(model,'all', function () {
            outputEl.empty();
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });


    }

    function multiSelectList(previewEl, outputEl) {

        //start

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


        var view = baseUtil.createView({View: MultiSelect.View, model: model, parentEl: previewEl, parentView:this});

        //end

        outputEl.html(JSON.stringify(model.getSelected()));
        view.listenTo(model,'all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });

    }
    function multiSelectListWithSelectAllNone(previewEl, outputEl) {

        //start

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
                var model = this.model;
                switch(action){
                    case 'selectAll':
                            model.selectAll();
                        break;
                    case 'selectNone':
                        model.selectNone();
                        break;
                    default:
                        model.setSelectedById(action); //default select click behavior
                        break;
                }
            }
        })


        var view = baseUtil.createView({View: MyListView, model: model, parentEl: previewEl, parentView:this});

        //end

        outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        view.listenTo(model,'all', function () {
            outputEl.empty();
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });

        this.removeReferences(function(){
            outputEl=null;
        })

    }


    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})