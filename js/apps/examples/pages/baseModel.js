/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', './examplePage'], function (Base, ExamplePage) {

    var baseUtil = Base.util;

    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func: modelPositions,
                title: 'Model Position'
            },
            {
                func: configModel,
                title: 'Configurable Model'
            }
        ]
    })


    function modelPositions(previewEl) {
        //

        var coll = new Base.Collection([
            {id: 'one', name: 'one'},
            {id: 'two', name: 'two'},
            {id: 'three', name: 'three'},
            {id: 'four', name: 'four'}
        ])
        var view = baseUtil.createView({View: Base.CollectionView, collection: coll, parentEl: previewEl, parentView: this});

        var three = coll.get('three');

        //ends
        $('<button class="btn">Move Three Up</button>').on('click',function () {
            three.moveUp();
        }).appendTo(previewEl);

        $('<button class="btn">Move Three Down</button>').on('click',function () {
            three.moveDown();
        }).appendTo(previewEl);

    }


    function configModel(previewEl) {
        //start

        var model = new Base.ConfigurableModel({attribute1:'value1'}, {config: {
            initConfig: 'init configValue'
        }});

        model.on('config_change', function (configModel, value) {
            console.log(configModel.changed, configModel, this);
        });

        model.setConfig('config1', 'value1');

        model.setConfigs({
            config2: 'value2',
            config3: 'value3'
        })

        console.log(model.getConfigs());

        //end

    }


    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})