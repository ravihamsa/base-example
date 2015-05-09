/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base/app', 'base', 'widgets/form', 'apps/examples/pages/examplePage'], function(app, Base, Form, ExamplePage) {



    function formWithReset(previewEl, consoleEl) {
        //starts here
        var coll = new Form.ElementCollection([{
            name: 'userName',
            validationRules: [{
                expr: 'req'
            }, {
                expr: 'email'
            }]
        }, {
            name: 'password',
            type: 'password',
            validationRules: [{
                expr: 'req'
            }]
        }]);

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        });

        form.render();

        form.resetForm();

        //end here

        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });

        $('<button class="btn">Reset Form</button>').on('click', function() {
            form.resetForm();
        }).appendTo(previewEl);

    }


    function customFormTemplate(previewEl, consoleEl) {
        //custom template

        var coll = new Form.ElementCollection([{
            name: 'userName',
            validationRules: [{
                expr: 'req'
            }, {
                expr: 'email'
            }]
        }, {
            name: 'password',
            type: 'password',
            validationRules: [{
                expr: 'req'
            }]
        }]);

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            template: 'apps/examples/templates/fullFormTemplate.html',
            model: formModel
        });

        form.render();

        //end here

        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });


    }


    function customForm(previewEl, consoleEl) {
        //custom form

        var titleIndex = {
            elements: 'Default Group',
            group1: 'Group Title 1',
            group2: 'Group Title 2'
        };

        var groupPrefix = 'grp-';

        var groupTemplate = app.compileTemplate('<fieldset class="cont-{{groupClass}}"><h3 class="group-title">{{groupTitle}}</h3><div class="element-container"> <div class="element-list {{groupClass}}"></div></div> </fieldset> ');

        var oldPostRender = Form.View.prototype.postRender;

        var CustomForm = Form.View.extend({
            events: {
                'submit form': 'formSubmitHandler',
                'click fieldset h3': 'toggleGroup'
            },
            className: 'custom-form',
            renderGroupContainers: function() {
                var model = this.model;
                var elements = model.get('elements');
                var groupList = _.unique(elements.pluck('group'));
                var groupEl = this.$('.group-list');
                _.each(groupList, function(groupName) {
                    if (this.$('.' + groupPrefix + groupName).length === 0) {
                        groupEl.append(groupTemplate({
                            groupTitle: titleIndex[groupName],
                            groupClass: groupPrefix + groupName
                        }));
                    }
                }, this);
            },
            postRender: function() {
                oldPostRender.call(this);
                var defaultGroup = this.model.get('defaultGroup');
                var containerClass = '.cont-' + groupPrefix + defaultGroup;
                this.$(containerClass).addClass('open');
            },
            toggleGroup: function(e) {
                this.$('fieldset').removeClass('open');
                var target = $(e.target).closest('fieldset');
                target.addClass('open');
            }
        });


        var coll = new Form.ElementCollection([{
            name: 'userName'
        }, {
            name: 'password',
            type: 'password'
        }, {
            name: 'gender',
            type: 'select',
            value: 1,
            group: 'group1',
            options: [{
                id: 1,
                name: 'Male'
            }, {
                id: 2,
                name: 'Female'
            }]
        }, {
            name: 'resident',
            type: 'radioList',
            value: 1,
            group: 'group1',
            options: [{
                id: 1,
                name: 'Yes'
            }, {
                id: 2,
                name: 'No'
            }]
        }, {
            name: 'maleInterests',
            type: 'checkList',
            group: 'group2',
            value: [1],
            options: [{
                id: 1,
                name: 'Reading'
            }, {
                id: 2,
                name: 'Movies'
            }],
            activeRules: [{
                expr: 'eq',
                element: 'gender',
                value: '1'
            }]
        }, {
            name: 'femaleInterests',
            type: 'checkList',
            group: 'group2',
            value: [4],
            options: [{
                id: 3,
                name: 'Fashion'
            }, {
                id: 4,
                name: 'Colours'
            }],
            activeRules: [{
                expr: 'eq',
                element: 'gender',
                value: '2'
            }]
        }, {
            name: 'submit',
            type: 'button',
            value: 'Submit',
            group: 'buttons',
            isPrimary: true
        }]);

        var formModel = new Form.Model({
            elements: coll,
            defaultGroup: 'group1'
        });

        var form = new CustomForm({
            model: formModel
        });

        form.render();

        //ends here

        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });


    }


    function simpleForm(previewEl, consoleEl) {
        //simple form
        var coll = new Form.ElementCollection([{
            name: 'userName'
        }, {
            name: 'password',
            type: 'password'
        }, {
            name: 'gender',
            type: 'select',
            value: 1,
            options: [{
                id: 1,
                name: 'Male'
            }, {
                id: 2,
                name: 'Female'
            }]
        }, {
            name: 'resident',
            type: 'radioList',
            value: 1,
            options: [{
                id: 1,
                name: 'Yes'
            }, {
                id: 2,
                name: 'No'
            }]
        }, {
            name: 'interests',
            type: 'checkList',
            value: [1],
            options: [{
                id: 1,
                name: 'Reading'
            }, {
                id: 2,
                name: 'Movies'
            }]
        }, {
            name: 'submit',
            type: 'button',
            value: 'Submit',
            isPrimary: true
        }]);

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        });



        form.render();

        form.trigger('showMessages', [{
            message: 'ravi kumar',
            expires: 0
        }]);

        form.render();

        form.trigger('showMessages', [{
            message: 'ravi kumar 2',
            expires: 0
        }]);

        form.render();

        form.trigger('showMessages', [{
            message: 'ravi kumar 3',
            expires: 0
        }]);

        form.render();

        form.trigger('showMessages', [{
            message: 'ravi kumar 4',
            expires: 0
        }]);
        //ends here

        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });
    }

    function formWithErrorMessages(previewEl, consoleEl) {
        //starts

        var coll = new Form.ElementCollection([{
            name: 'userName'
        }, {
            name: 'password',
            type: 'password'
        }, {
            name: 'gender',
            type: 'select',
            value: 1,
            options: [{
                id: 1,
                name: 'Male'
            }, {
                id: 2,
                name: 'Female'
            }]
        }, {
            name: 'resident',
            type: 'radioList',
            value: 1,
            options: [{
                id: 1,
                name: 'Yes'
            }, {
                id: 2,
                name: 'No'
            }]
        }, {
            name: 'interests',
            type: 'checkList',
            value: [1],
            options: [{
                id: 1,
                name: 'Reading'
            }, {
                id: 2,
                name: 'Movies'
            }]
        }, {
            name: 'submit',
            type: 'button',
            value: 'Submit',
            isPrimary: true
        }]);

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        });

        form.render();



        form.trigger('showMessages', [{
            message: 'This is custom message11',
            expires: 0
        }, {
            message: 'This is custom message22',
            expires: 0,
            messageType: 'success'
        }, {
            message: 'This is custom message33',
            expires: 0,
            messageType: 'warning'
        }]);
        form.trigger('clearMessages');
        form.trigger('showMessages', [{
            message: 'This is custom post clear',
            expires: 0
        }]);


        //ends here

        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });
    }

    function formWithInitialErrorMessages(previewEl, consoleEl) {
        //starts

        var coll = new Form.ElementCollection([{
            name: 'userName'
        }, {
            name: 'password',
            type: 'password'
        }, {
            name: 'gender',
            type: 'select',
            value: 1,
            options: [{
                id: 1,
                name: 'Male'
            }, {
                id: 2,
                name: 'Female'
            }]
        }, {
            name: 'resident',
            type: 'radioList',
            value: 1,
            options: [{
                id: 1,
                name: 'Yes'
            }, {
                id: 2,
                name: 'No'
            }]
        }, {
            name: 'interests',
            type: 'checkList',
            value: [1],
            options: [{
                id: 1,
                name: 'Reading'
            }, {
                id: 2,
                name: 'Movies'
            }]
        }, {
            name: 'submit',
            type: 'button',
            value: 'Submit',
            isPrimary: true
        }]);

        var formModel = new Form.Model({
            elements: coll,
            errors: [{
                message: 'This is custom message1',
                expires: 0,
                messageType: 'alert'
            }, {
                message: 'This is custom message2',
                expires: 0,
                messageType: 'success'
            }, {
                message: 'This is custom message3',
                expires: 0,
                messageType: 'warning'
            }]
        });

        var form = new Form.View({
            model: formModel
        });

        form.render();


        //ends here

        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });
    }

    function simpleFormWithActiveRules(previewEl, consoleEl) {

        //simple form with activeRules
        var coll = new Form.ElementCollection([{
            name: 'userName'
        }, {
            name: 'password',
            type: 'password'
        }, {
            name: 'gender',
            type: 'select',
            value: 'female',
            options: [{
                id: 'male',
                name: 'Male'
            }, {
                id: 'female',
                name: 'Female'
            }]
        }, {
            name: 'resident',
            type: 'radioList',
            value: 1,
            options: [{
                id: 1,
                name: 'Yes'
            }, {
                id: 2,
                name: 'No'
            }]
        }, {
            name: 'maleInterests',
            type: 'checkList',
            value: [1],
            options: [{
                id: 1,
                name: 'Reading'
            }, {
                id: 2,
                name: 'Movies'
            }],
            activeRules: [{
                expr: 'eq',
                element: 'gender',
                value: 'male'
            }]
        }, {
            name: 'femaleInterests',
            type: 'checkList',
            value: [4],
            options: [{
                id: 3,
                name: 'Fashion'
            }, {
                id: 4,
                name: 'Colours'
            }],
            activeRules: [{
                expr: 'eq',
                element: 'gender',
                value: 'female'
            }]
        }, {
            name: 'submit',
            type: 'button',
            value: 'Submit123',
            isPrimary: true,
            activeRules: [{
                expr: 'neq',
                element: 'userName',
                value: ''
            }, {
                expr: 'neq',
                element: 'password',
                value: ''
            }]
        }]);

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        });

        form.render();

        //end here
        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });
    }

    function formWithValidation(previewEl, consoleEl) {

        //simple form with validationRules
        var coll = new Form.ElementCollection([{
            name: 'userEmail',
            validationRules: [{
                    expr: 'req',
                    'message': 'User Name Required'
                }, //message is optional
                {
                    expr: 'email'
                }
            ]
        }, {
            name: 'website',
            validationRules: [{
                expr: 'url'
            }]
        }, {
            name: 'password',
            type: 'password',
            validationRules: [{
                expr: 'req'
            }]
        }, {
            name: 'submit',
            type: 'button',
            value: 'Submit',
            isPrimary: true
        }]);

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        });

        form.render();

        //ends here
        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });
    }


    function formWithCustomElement(previewEl, consoleEl) {

        //

        //Custom Element Code start
        var tagTemplate = app.compileTemplate("<li><span>{{tag}}</span> <a href='#remove' class='remove'>remove</a></li>");
        var TagElement = Form.ElementView.extend({
            template: 'apps/examples/templates/tagView.html',
            events: {
                'keypress input': 'keyPressHandler',
                'click .remove': 'removeHandler'
            },
            keyPressHandler: function(e) {

                var keyCode = e.keyCode;
                var model = this.model;
                if (keyCode === 13) {
                    e.preventDefault();
                    var tag = this.$('input').val();
                    var value = model.get('value') || '';
                    var valueArr = value.split(',');
                    if (valueArr.indexOf(tag) === -1) {
                        this.addTag(tag);
                        this.$('input').val('');
                        this.updateValue();
                    }
                }

            },
            removeHandler: function(e) {
                e.preventDefault();
                var anchor = $(e.target);
                var li = anchor.closest('li');
                li.remove();
                this.updateValue();
            },
            addTag: function(tag) {
                var tagList = this.$('.tag-list');
                if (!_.isEmpty(tag)) {
                    tagList.append(tagTemplate({
                        tag: tag
                    }));
                }
            },
            valueFunction: function() {
                var spans = this.$('.tag-list li span');
                var tagList = _.map(spans, function(span) {
                    return $(span).text();
                });
                return _.uniq(tagList).join(',');
            },
            valueChangeHandler: function(value) {
                var _this = this;
                value = value || '';
                var valueArr = _.uniq(_.reject(_.map(value.split(','), $.trim), _.isEmpty));

                var tagList = this.$('.tag-list');
                tagList.empty();
                _.each(valueArr, function(tag) {
                    _this.addTag(tag);
                });
            }
        });

        //Custom Element Code end

        var coll = new Form.ElementCollection([{
            name: 'details',
            type: 'textarea',
            validationRules: [{
                expr: 'req'
            }]
        }, {
            name: 'tags',
            type: 'tagList',
            value: 'default',
            validationRules: [{
                expr: 'function',
                message: 'Minimum Two Tags Required',
                func: function(value) {
                    value = value || '';
                    var valueArr = value.split(',');
                    return valueArr.length > 1;
                }
            }]
        }, {
            name: 'submit',
            type: 'button',
            value: 'Submit',
            isPrimary: true
        }]);

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        });

        //inform form to pick TagElement if the type is tagList
        form.addToTypeViewIndex('tagList', TagElement);

        form.render();

        //ends here
        previewEl.html(form.el);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });
    }


    function formWithTemplate(previewEl, consoleEl) {
        //start

        var MyForm = Form.View.extend({
            template: '<form class="myform"> <div class="form-message-container"> </div> <div class="element-prePopulatedName"> <input name="prePopulatedName" value="name123"> </div> <button type="submit"> Submit</button></form>'
        });

        var coll = new Form.ElementCollection([{
            name: 'prePopulatedName'
        }]);


        var form = new MyForm({
            model: new Form.Model({
                elements: coll
            })
        });
        form.render();

        //end

        form.$el.appendTo(previewEl);

        form.on('formSubmit', function(formData) {
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        });
    }

    var PageModel = Base.Model.extend({

    });

    simpleForm.name = 'simpleForm';

    var PageView = ExamplePage.View.extend({
        examples: [{
            func: simpleForm,
            title: 'Simple Form'
        }, {
            func: formWithTemplate,
            title: 'Form with template'
        }, {
            func: simpleFormWithActiveRules,
            title: 'Simple Form with Active Rules',
            desc: 'Change Gender to see active rules in effect'
        }, {
            func: formWithValidation,
            title: 'Form with Validation'
        }, {
            func: formWithCustomElement,
            title: 'Form with Custom Element'
        }, {
            func: customForm,
            title: 'Custom Form'
        }, {
            func: formWithErrorMessages,
            title: 'Form with error messages'
        }, {
            func: formWithInitialErrorMessages,
            title: 'Form with initial error messages'
        }, {
            func: customFormTemplate,
            title: 'Custom Template',
            desc: 'If form template have an element with class "element-{{name}}" form view skip rendering that element, but it do apply events depending on the type configured. It is developers responsibility to make sure every element has elements with class "form-group" which act as a container to the element, which is where "has-error" class get added when there is an validation error, element with class "help-block" which is used for providing inline help, and class "message-block" which will get used to show error/warning/alert/success messages. Use groups to align elements within a form. If form template has element with class "grp-{{group}} form will skip rendering group container, any element that is configured to be in given group will get rendered in that element.'
        }, {
            func: formWithReset,
            title: 'Form With Reset'
        }]

    });

    return {
        Model: PageModel,
        View: PageView
    };

});
