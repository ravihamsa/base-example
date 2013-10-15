/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'widgets/form', 'text!../templates/pages/edit.html'], function (Base, Form, loginTemplate) {

    var baseUtil = Base.util;
    var baseApp = Base.app;


    var PageView = Base.View.extend({
        template: loginTemplate,
        postRender: function () {
            var _this=this;
            var elementList = [
                {
                    name: 'firstName',
                    validationRules: [
                        {
                            expr: 'req'
                        }
                    ]
                },
                {
                    name: 'lastName',
                    validationRules: [
                        {
                            expr: 'req'
                        }
                    ]
                },{
                    name: 'phone',
                    validationRules: [
                        {
                            expr: 'req'
                        },
                        {
                            expr: 'number'
                        }
                    ]
                },{
                    name: 'email',
                    validationRules: [
                        {
                            expr: 'req'
                        },
                        {
                            expr: 'email'
                        }
                    ]
                },
                {
                    name: 'loginButton',
                    type: 'submit',
                    value:'Save',
                    group: 'buttons'
                }
            ]

            var def=this.addRequest({
                id:'userProfile'
            })

            def.done(function(data){

                var coll = new Form.ElementCollection(elementList);
                coll.get('firstName').set('value', data.name.first)
                coll.get('lastName').set('value', data.name.last)
                coll.get('phone').set('value', data.phone)
                coll.get('email').set('value', data.email)

                var formModel = new Form.Model({
                    title: 'Edit',
                    actionId: 'login',
                    elements: coll
                })

                var editForm = baseUtil.createView({
                    View: Form.View,
                    model: formModel,
                    parentEl:'.edit-user-form',
                    parentView: _this
                })

                editForm.on('formSubmit', function (dataObj) {
                    if (dataObj.errors) {
                        console.log('errors', dataObj.errors);
                    } else {
                        baseApp.router.navigate('#user/profile', {trigger:true});
                    }
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