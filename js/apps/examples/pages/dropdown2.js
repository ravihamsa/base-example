/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'base/dataLoader', 'apps/examples/pages/examplePage', 'widgets/dropdown2'], function (Base, dataLoader, ExamplePage, DropDown2) {

    var app = Base.app;


    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func: singleSelectDropDown,
                title: 'Single Select DropDown'
            }, {
                func: multiSelectDropDown,
                title: 'Multi Select DropDown'
            }, {
                func: multiSelectDropDownWithOptionStrings,
                title: 'DropDown with custom summary strings'
            }, {
                func: singleSelectDropDownNoData,
                title: 'Single Select DropDown No Data'
            }
        ]
    });

    /*

    var DropDownSummaryView = Base.View.extend({
        template: '<div class="summary">{{summary}}</div> <div class="but"> </div>',
        dataEvents: {
            'selectionChange': 'updateSummary'
        },
        updateSummary: function () {
            this.render();
        },
        serialize: function(){
            var attr = this.model.toJSON();
            var toReturn = {};

            var strings = this.getOption('strings') || {
                optionsSelected:'options.selected',
                noOptionsSelected:'no.options.selected'
            };

            if(attr.selectedItem){
                toReturn.summary = attr.selectedItem.get('name');
            }else if(attr.selectedCount){
                toReturn.summary  = attr.selectedCount + ' '+app.getString(strings.optionsSelected);
            }else{
                toReturn.summary = app.getString(strings.noOptionsSelected);
            }

            return toReturn;
        }
    });


    var DropDown = Toggler.View.extend({
        constructor: function () {
            Toggler.View.apply(this, arguments);
            var dropDownConfigOptions = this.getOptions();
            var multiSelect = dropDownConfigOptions.multiSelect || false;

            if (!this.model) {


                var Model = multiSelect ? MultiSelect.Model : SingleSelect.Model;
                var ItemCollection = multiSelect ? MultiSelect.ItemCollection : SingleSelect.ItemCollection;
                if (dropDownConfigOptions.itemsUrl) {
                    ItemCollection = ItemCollection.extend({
                        url: dropDownConfigOptions.itemsUrl,
                        parse: dropDownConfigOptions.itemsPraser || _.identity
                    })
                }
                var collection = new ItemCollection(dropDownConfigOptions.items);
                if (dropDownConfigOptions.itemsUrl) {
                    collection.fetch();
                }
                var model = new Model({items: collection});
                this.model = model;
            }

            this.listenTo(this.model, 'selectionChange reSelect', function(){
                if(!multiSelect){
                    this.forceHideBody();
                }
            })


        },
        template: '<div class="toggle-but"></div> <div class="toggle-body"> </div>',
        views: {
            summary: function () {
                var model = this.model;
                var SummaryView = this.getOption('SummaryView') || DropDownSummaryView;
                var strings = this.getOption('strings');

                return {
                    View: SummaryView,
                    model: model,
                    parentEl: '.toggle-but',
                    strings:strings
                }
            },
            list:  function () {
                var model = this.model;
                var multiSelect = this.getOption('multiSelect') || false;
                var View =  multiSelect ? MultiSelect.View : SingleSelect.View;
                var strings = this.getOption('strings');
                return {
                    View: View,
                    model: model,
                    noRecordsMessage:'No Records',
                    parentEl: '.toggle-body',
                    strings:strings
                }
            }
        },
        coverClassName: 'drop-down',
        className: 'toggler drop-down'
    })

    */
    function singleSelectDropDown(previewEl, consoleEl) {
        var view = new DropDown2.View({
            items:[{
                id:1,
                name:'name1'
            },{
                id:2,
                name:'name2'
            }]
        })

        view.render();
        //end here

        view.$el.appendTo(previewEl);
    }

    function multiSelectDropDown(previewEl, consoleEl) {
        var view = new DropDown2.View({
            multiSelect:true,
            items:[{
                id:1,
                name:'name1'
            },{
                id:2,
                name:'name2'
            }]
        })

        view.render();
        //end here

        view.$el.appendTo(previewEl);
    }

    function multiSelectDropDownWithOptionStrings(previewEl, consoleEl) {
        var view = new DropDown2.View({
            multiSelect:true,
            items:[{
                id:1,
                name:'name1'
            },{
                id:2,
                name:'name2'
            }],
            strings:{
                optionsSelected:'Countries Selected',
                noOptionsSelected:'Select A Country',
                allSelected:'All Countries Selected'
            }
        })

        view.render();
        //end here

        view.$el.appendTo(previewEl);
    }

    function singleSelectDropDownNoData(previewEl, consoleEl) {
        var view = new DropDown2.View()

        view.render();
        //end here

        view.$el.appendTo(previewEl);
    }


    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    };

});
