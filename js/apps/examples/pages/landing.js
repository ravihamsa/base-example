/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/bone', 'text!../templates/pages/landing.html'], function(Base, template){


    var PageView = Base.View.extend({
        template:template,
        makeItRed:function(){
            this.$el.css({
                'background-color':'red'
            })
        }
    })

    var PageModel = Base.Model.extend({

    });

    return {
        Model:PageModel,
        View:PageView
    }

})