/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'widgets/form', 'text!../templates/pages/profile.html', 'text!../templates/user.html'], function (Base, Form, profileTemplate, userTemplate) {

    var baseUtil = Base.util;
    var baseApp = Base.app;
    var dataLoader= Base.dataLoader;

    var UserProfileView = Base.View.extend({
        template:userTemplate
    })




    var PageView = Base.View.extend({
            template: profileTemplate,
            postRender:function(){
                var _this=this;

                var def=this.addRequest({
                    id:'userProfile'
                })

                def.done(function(data){
                    var model = new Base.Model(data);
                    var view = baseUtil.createView({
                        View:UserProfileView,
                        model:model,
                        parentEl:'.user-profile',
                        parentView:_this
                    })
                })


            }
        })

    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})