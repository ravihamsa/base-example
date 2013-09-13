/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/bone', './examplePage'], function(Base, ExamplePage){

    var baseUtil = Base.util;

    var PageView = ExamplePage.View.extend({
        examples:[
            {
                func:modelPositions,
                title:'Model Position'
            }
        ]
    })


    function modelPositions(previewEl){
        //

        var coll = new Base.Collection([{id:'one', name:'one'}, {id:'two', name:'two'}, {id:'three', name:'three'}, {id:'four', name:'four'}])
        var view = baseUtil.createView({View:Base.CollectionView, collection:coll, parentEl:previewEl});

        var three = coll.get('three');

        //
        $('<button class="btn">Move Three Up</button>').on('click', function(){
            three.moveUp();
        }).appendTo(previewEl);

        $('<button class="btn">Move Three Down</button>').on('click', function(){
            three.moveDown();
        }).appendTo(previewEl);

    }




    var PageModel = Base.Model.extend({

    });

    return {
        Model:PageModel,
        View:PageView
    }

})