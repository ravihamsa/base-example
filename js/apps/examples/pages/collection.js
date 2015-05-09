/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'base/dataLoader', 'apps/examples/pages/examplePage', 'widgets/table'], function(Base, dataLoader, ExamplePage, Table) {

    var app = Base.app;


    var PageView = ExamplePage.View.extend({
        examples: [{
            func: collectionView,
            title: 'Collection View'
        }, {
            func: draggableCollectionView,
            title: 'Draggable Collection View'
        }, {
            func: groupedCollectionView,
            title: 'Grouped Collection View'
        }]
    });

    /*
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

     */


    function collectionView(previewEl, consoleEl) {

        //start here

        var NameCollection = Base.Collection.extend({
            url: '/app/data/names.json'
        });

        var coll = new NameCollection([{
            name: 'from static',
            id: 10
        }]);


        var collView = Base.util.createView({
            View: Base.CollectionView,
            template: '<input type="text" class="search-box"> <ul class="item-list"> </ul>',
            collection: coll
        });

        setTimeout(function() {
            coll.fetch();
        }, 2000);

        setTimeout(function() {
            coll.url = '/app/data/names2.json';
            coll.fetch();
        }, 4000);

        //end here

        collView.$el.appendTo(previewEl);


    }


    function draggableCollectionView(previewEl, consoleEl) {

        //start here

        var NameCollection = Base.Collection.extend({
            url: '/app/data/names.json'
        });

        var coll = new NameCollection([{
            'name': 'Linda',
            'birthYear': 1947,
            'id': 1
        }, {
            'name': 'Kat',
            'birthYear': 1977,
            'id': 2
        }, {
            'name': 'Jen',
            'birthYear': 1989,
            'id': 3
        }]);




        var collView = Base.util.createView({
            View: Base.Draggable.CollectionView,
            template: '',
            collection: coll,
            ItemView: Base.Draggable.ItemView
        });

        setTimeout(function(){
            coll.add({name:'ravi-second', birthYear:1978, id:10}, {at:0})
        },4000)

        setTimeout(function(){
            coll.unshift({name:'ravi-first', birthYear:1978, id:9})
        },2000)

        //end here

        collView.$el.appendTo(previewEl);


    }



    function groupedCollectionView(previewEl, consoleEl) {

        //start here

        var NameCollection = Base.Collection.extend({
            url: '/app/data/names.json'
        });

        var coll = new NameCollection([{
            'name': 'Linda',
            'birthYear': 1947,
            'id': 1
        }, {
            'name': 'Kat',
            'birthYear': 1977,
            'id': 2
        }, {
            'name': 'Jen',
            'birthYear': 1989,
            'id': 3
        },{
            'name': 'Linda1',
            'birthYear': 1947,
            'id': 4
        }, {
            'name': 'Kat2',
            'birthYear': 1977,
            'id': 5
        }, {
            'name': 'Jen3',
            'birthYear': 1989,
            'id': 6
        }]);


        var ItemView = Base.ItemView.extend({
            template:'<span class="tags"> <span class="tagText">{{id}} {{name}}</span> <em class="tagDelete">&nbsp;</em> </span>',
            className:'list-item ad_tag'
        })


        var collView = Base.util.createView({
            View:Base.GroupedCollectionView,
            collection:coll,
            groupBy:'birthYear',
            ItemView:ItemView

        })

        setTimeout(function(){
            coll.remove(coll.get(2))
            coll.remove(coll.get(1))
            coll.remove(coll.get(4))
        }, 2000)


        setTimeout(function(){
            coll.add({
                'name': 'Jen4',
                'birthYear': 1989,
                'id': 7
            })

            coll.add({
                'name': 'Ravi Kumar',
                'birthYear': 1980,
                'id': 8
            })
        }, 3000)

        //end here

        collView.$el.appendTo(previewEl);


    }


    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    };

});
