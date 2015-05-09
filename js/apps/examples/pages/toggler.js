/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'base/dataLoader', 'apps/examples/pages/examplePage', 'widgets/toggler', 'list/singleSelect', 'list/multiSelect'], function(Base, dataLoader, ExamplePage, Toggler, SingleSelect, MultiSelect) {

    var app = Base.app;

    var popupManager = Base.popupManager;


    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func: simpleToggler,
                title: 'Simple Toggler'
            }, {
                func: simpleSearch,
                title: 'Simple Search'
            }, {
                func: singleSelectDropdown,
                title: 'Example using views for summary and body'
            }, {
                func: multiSelectDropdown,
                title: 'Multi Select Toggler'
            },
            {
                func: simpleSearch2,
                title: 'Simple search 2'
            }

        ]
    });




    function simpleToggler(previewEl, consoleEl) {

        //start here

        var view = new Toggler.View({
            template: '<div class="toggle-but">Click here to show body</div> <div class="toggle-body"> This is body of toggler asdfasd</div>'
        });


        view.render();
        //end here

        view.$el.appendTo(previewEl);

    }


    function multiSelectDropdown(previewEl, consoleEl) {

        //start here


        var multiSelectModel = new MultiSelect.Model();
        var itemCollection = multiSelectModel.getCollection();
        itemCollection.reset([{
            id: 1,
            name: 'one one'
        }, {
            id: 2,
            name: 'two'
        }]);

        for (var i = 3; i < 1000; i++) {
            itemCollection.add({
                id: i,
                name: '' + i
            });
        }

        var SummaryView = Base.View.extend({
            template: '<div class="summary"> </div> <div class="but"> </div>',
            dataEvents: {
                'selectionChange': 'updateSummary'
            },
            updateSummary: function() {
                var selected = this.model.getSelected();
                var htmlString = 'No Options Selected';
                if (selected.length > 0) {
                    htmlString = selected.length + ' Options Selected';
                }

                this.$('.summary').html(htmlString);

            },
            postRender: function() {
                this.updateSummary();
            }
        });

        var CustomTogller = Toggler.View.extend({
            template: '<div class="toggle-but"></div> <div class="toggle-body"> </div>',
            views: {
                summary: {
                    View: SummaryView,
                    model: multiSelectModel,
                    parentEl: '.toggle-but'
                },
                list: {
                    View: MultiSelect.View,
                    model: multiSelectModel,
                    parentEl: '.toggle-body'
                }
            },
            coverClassName: 'drop-down',
            className: 'toggler drop-down'
        });

        var view = new CustomTogller({
            model: multiSelectModel
        });


        view.render();
        //end here

        view.$el.appendTo(previewEl);

    }

    function singleSelectDropdown(previewEl, consoleEl) {

        //start here

        var singleSelectModel = new SingleSelect.Model();
        var itemCollection = singleSelectModel.getCollection();
        itemCollection.reset([{
            id: 1,
            name: 'one one'
        }, {
            id: 2,
            name: 'two'
        }]);

        for (var i = 3; i < 1000; i++) {
            itemCollection.add({
                id: i,
                name: '' + i
            });
        }

        var SummaryView = Base.View.extend({
            template: '<div class="summary"> </div>',
            dataEvents: {
                'selectionChange': 'updateSummary'
            },
            updateSummary: function() {
                var selected = this.model.getSelected();
                if (selected) {
                    this.$('.summary').html(this.model.getSelected().get('name'));
                } else {
                    this.$('.summary').html('No Options Selected');
                }

            },
            postRender: function() {
                this.updateSummary();
            }
        });

        var CustomTogller = Toggler.View.extend({
            dataEvents: {
                'reSelect selectionChange': 'forceHideBody'
            },
            template: '<div class="toggle-but"></div> <div class="toggle-body"> </div>',
            views: {
                summary: {
                    View: SummaryView,
                    model: singleSelectModel,
                    parentEl: '.toggle-but'
                },
                list: {
                    View: SingleSelect.View,
                    model: singleSelectModel,
                    parentEl: '.toggle-body'
                }
            },
            coverClassName: 'drop-down',
            className: 'toggler drop-down'
        });

        var view = new CustomTogller({
            model: singleSelectModel
        });


        view.render();
        //end here

        view.$el.appendTo(previewEl);

    }


    function simpleSearch(previewEl, consoleEl) {
        //starts here
        var CustomTogller = Toggler.View.extend({
            events: {
                'keyup input': function(e) {
                    var val = $(e.target).val();
                    var lis = popupManager.$(this.getBodySelector()).find('li');
                    lis.each(function(index, li) {
                        var $li = $(li);
                        var text = $li.text();
                        if (text.indexOf(val) > -1) {
                            $li.show();
                        } else {
                            $li.hide();
                        }
                    });
                }
            },
            template: '<div class="toggle-but"> <input type="text" value=""> </div> <div class="toggle-body"> <ul> <li>one</li> <li>two</li> <li>three</li></ul></div>'
        });

        var view = new CustomTogller();
        view.render();


        //ends here
        view.$el.appendTo(previewEl);

    }

    function simpleSearch2(previewEl, consoleEl) {
        //starts here


        var cats = ['region', 'country', 'campaign', 'adgroup'];

        var catItems = [];
        _.each(cats, function(catId) {
            var len = Math.floor(Math.random() * 100);
            for (var i = 0; i < len; i++) {
                catItems.push({
                    id: catId + '_' + i,
                    type: catId,
                    name: 'name_' + catId + '_' + i
                });
            }
        });

        var SummaryItemView = Base.ItemView.extend({
            template: '{{name}} <a href="#remove" class="remove-but">x</a>',
            className: 'summary-item',
            filteredChangeHandler: function() {
                //do nothing;
            }
        });

        var SummaryCollectionView = Base.CollectionView.extend({
            events: {
                'click .remove-but': function(e) {
                    e.preventDefault();
                    var id = $(e.target).closest('li').data('id');
                    this.collection.remove(this.collection.get(id));
                }
            }
        });


        var ItemListCollectionView = Base.CollectionView.extend({
            events: {

            },

            template: '<div class="item-list-header"><input type="text" value="" class="item-search-box" style="width:100%; border:1px solid #ccc;">  </div><ul class="item-list"> </ul>',
            ItemView: MultiSelect.ItemView
        });


        var ItemListView = MultiSelect.View.extend({
            events: {
                'click .none-but': function(e) {
                    var _this = this;
                    e.preventDefault();
                    var collection = this.model.get('items');
                    var selectedType = this.model.get('selectedType');
                    collection.each(function(model) {
                        if (model.get('type') === selectedType) {
                            _this.model.unsetSelectedById(model.id);
                        }
                    });
                },
                'keydown .item-search-box': _.debounce(function(e) {
                    this.handleSearchKeyPress(e);
                }, 300)
            },
            selectedTypeChangeHandler: function(value) {
                this.$('.item-search-box').val('');
                var collection = this.model.get('items');
                collection.each(function(model) {
                    model.set('filtered', model.get('type') === value);
                });
            },
            handleSearchKeyPress: function() {
                var searchString = $.trim(this.$('.item-search-box').val()).toLowerCase();
                var selectedType = this.model.get('selectedType');


                var collection = this.model.get('items');
                collection.each(function(model) {
                    if (searchString !== '') {
                        model.set('filtered', model.get('type') === selectedType && model.get('name').toLowerCase().indexOf(searchString) > -1);
                    } else {
                        model.set('filtered', model.get('type') === selectedType);
                    }

                });


                //this.setOption('filter', filterFunction);
                //this.filterList();
            }

        });

        var CustomTogller = Toggler.View.extend({
            events: {

            },
            views: {
                catList: function() {
                    var catCollection = [{
                        id: 'country',
                        name: 'Country',
                        selected: true
                    }, {
                        id: 'region',
                        name: 'Region'
                    }, {
                        id: 'campaign',
                        name: 'Campaign'
                    }, {
                        id: 'adgroup',
                        name: 'AdGroup'
                    }];

                    var model = new SingleSelect.Model({
                        items: new SingleSelect.ItemCollection(catCollection)
                    });

                    return {
                        View: SingleSelect.View,
                        model: model,
                        parentEl: '.cat-list'
                    };
                },
                itemList: function() {
                    var itemCollection = new MultiSelect.ItemCollection(catItems);
                    var model = new MultiSelect.Model({
                        items: itemCollection,
                        selectedType: 'country'
                    });
                    return {
                        View: ItemListView,
                        CollectionView: ItemListCollectionView,
                        model: model,
                        parentEl: '.sub-list'
                    };
                },
                selectedList: {
                    View: SummaryCollectionView,
                    collection: new Base.Collection(),
                    parentEl: '.summary-view',
                    ItemView: SummaryItemView
                }
            },
            template: '<div class="toggle-but"><div class="summary-view"> </div>  </div> <div class="toggle-body"> <div class="cat-list"> </div> <div class="sub-list"> </div></div>',
            className: 'toggler level-selector',
            postRender: function() {
                var catModel = this.getSubModel('catList');
                var catItemModel = this.getSubModel('itemList');

                var catItemCollection = this.getSubAttribute('itemList', 'items');
                var _this = this;
                catItemCollection.listenTo(catModel, 'selectionChange', function(selectedCat) {
                    var catId = selectedCat.id;
                    catItemModel.set('selectedType', catId);
                });

                catItemModel.on('selectionChange', function() {
                    _this.updateCatSelectionSummary();
                });

                catModel.trigger('selectionChange', catModel.getSelected());
                this.updateCatSelectionSummary();


                var selectedItemCollectdion = this.getSubCollection('selectedList');
                selectedItemCollectdion.on('remove', function(model) {
                    catItemModel.unsetSelectedById(model.id);
                });
            },
            updateCatSelectionSummary: function() {
                var catItemModel = this.getSubModel('itemList');
                var selectedItemCollectdion = this.getSubCollection('selectedList');
                selectedItemCollectdion.set(catItemModel.getSelected());
                popupManager.alignInlinePopup();
            },
            getCoverClassName: function() {
                return 'toggler level-selector';
            }

        });

        var view = new CustomTogller();
        view.render();


        //ends here
        view.$el.appendTo(previewEl);

    }




    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    };

});
