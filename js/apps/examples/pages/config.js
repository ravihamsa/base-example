/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'apps/examples/pages/examplePage'], function(Base, ExamplePage) {
    "use strict";


    var PageView = ExamplePage.View.extend({
        examples: [{
            func: simleConfigView,
            title: 'Simple Config View',
            desc:'Just declare config option, your configs would be tracked and events triggered when they change'
        },{
            func: simleConfigModel,
            title: 'Simple Config Model',
            desc:'Just declare config option, your configs would be tracked and events triggered when they change'
        },{
            func: simleConfigCollection,
            title: 'Simple Config Collection',
            desc:'Just declare config option, your configs would be tracked and events triggered when they change'
        }]
    });

    function simleConfigView(previewEl) {

        //s

        var ConfigurableView = Base.View.extend({
            template: '<div class="config-holder"> </div> <br> <br> <div class="config1-holder"> </div>',
            configHandler: function(configs) {
                this.$('.config-holder').append('config-changes: '+ JSON.stringify(configs) + ' <br> current config-state: '+JSON.stringify(this.getConfigs()) + '<br>');
            },
            config1ConfigHandler: function(value){
                this.$('.config1-holder').append('<br> config1 changed to: '+value);
            }
        });

        var view = new ConfigurableView({
            configs: {
                config1: 'value1',
                config2: 'value2'
            }
        });

        view.render();

        view.setConfig('config3', 'value3');

        view.setConfigs({
            config4: 'value4',
            config5: 'value5',
            config1: 'new Value1'
        });

        view.resetConfigs({
            config2: 'value2',
            config1: 'new new Value1'
        });
        //end here

        view.$el.appendTo(previewEl);


    }

    function simleConfigModel(previewEl) {

        //s



        var model = new Base.Model({}, {
            configs: {
                config1: 'value1',
                config2: 'value2'
            }
        });

        model.on('all',function(){
            previewEl.append('<br>'+JSON.stringify(arguments));
        });

        model.setConfig('config3', 'value3');

        model.setConfigs({
            config4: 'value4',
            config5: 'value5',
            config1: 'new Value1'
        });

        model.resetConfigs({
            config2: 'value2',
            config1: 'new new Value1'
        });
        //end here

    }


    function simleConfigCollection(previewEl) {

        //s



        var model = new Base.Collection([], {
            configs: {
                config1: 'value1',
                config2: 'value2'
            }
        });

        model.on('all',function(){
            previewEl.append('<br>'+JSON.stringify(arguments));
        });

        model.setConfig('config3', 'value3');

        model.setConfigs({
            config4: 'value4',
            config5: 'value5',
            config1: 'new Value1'
        });

        model.resetConfigs({
            config2: 'value2',
            config1: 'new new Value1'
        });
        //end here

    }


    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    };

});