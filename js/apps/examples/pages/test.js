/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/app', 'common/bone', 'common/widgets/form', './examplePage'], function (app, Base, Form, ExamplePage) {


    var PageView = ExamplePage.View.extend({
        examples:[
            {
                func: test1,
                title: 'Test 1'
            }
        ]

    })


    function test1(previewEl) {
        //
        var coll = new Base.Collection([{name:'ravi', kam:'coding'}, {name:'kavi', kam:'cooking'}]);

        var view = new Base.CollectionView({
            collection:coll
        })

        view.render();
        //
        previewEl.html(view.el);
    }



    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})