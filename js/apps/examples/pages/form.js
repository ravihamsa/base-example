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
                func: simpleForm,
                title: 'Simple Form'
            },
            {
                func: simpleFormWithActiveRules,
                title: 'Simple Form with Active Rules',
                desc: 'Change Gender to see active rules in effect'
            },
            {
                func: formWithValidation,
                title: 'Form with Validation'
            },
            {
                func: formWithCustomElement,
                title: 'Form with Custom Element'
            }
        ]

    })


    function simpleForm(previewEl, consoleEl) {
        //simple form
        var coll = new Form.ElementCollection([
            {name: 'userName'},
            {name: 'password', type: 'password'},
            {name: 'gender', type: 'select', value: 1, options: [
                {id: 1, name: 'Male'},
                {id: 2, name: 'Female'}
            ]},
            {name: 'resident', type: 'radioList', value: 1, options: [
                {id: 1, name: 'Yes'},
                {id: 2, name: 'No'}
            ]},
            {name: 'interests', type: 'checkList', value: [1], options: [
                {id: 1, name: 'Reading'},
                {id: 2, name: 'Movies'}
            ]},
            {name: 'submit', type: 'submit', value: 'Submit'}
        ])

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        })

        form.render();

        //ends here

        previewEl.html(form.el);

        form.on('formSubmit', function(formData){
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        })
    }

    function simpleFormWithActiveRules(previewEl, consoleEl) {

        //simple form with activeRules
        var coll = new Form.ElementCollection([
            {name: 'userName'},
            {name: 'password', type: 'password'},
            {name: 'gender', type: 'select', value: 'female', options: [
                {id: 'male', name: 'Male'},
                {id: 'female', name: 'Female'}
            ]},
            {name: 'resident', type: 'radioList', value: 1, options: [
                {id: 1, name: 'Yes'},
                {id: 2, name: 'No'}
            ]},
            {name: 'maleInterests', type: 'checkList', value: [1], options: [
                {id: 1, name: 'Reading'},
                {id: 2, name: 'Movies'}
            ], activeRules: [
                {expr: 'eq', element: 'gender', value: 'male'}
            ]},
            {name: 'femaleInterests', type: 'checkList', value: [4], options: [
                {id: 3, name: 'Fashion'},
                {id: 4, name: 'Colours'}
            ], activeRules: [
                {expr: 'eq', element: 'gender', value: 'female'}
            ]},
            {name: 'submit', type: 'submit', value: 'Submit'}
        ])

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        })

        form.render();

        //end here
        previewEl.html(form.el);

        form.on('formSubmit', function(formData){
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        })
    }

    function formWithValidation(previewEl, consoleEl) {

        //simple form with validationRules
        var coll = new Form.ElementCollection([
            {name: 'userEmail', validationRules: [
                { expr: 'req', 'message': 'User Name Required' }, //message is optional
                { expr: 'email' }
            ]},
            {name: 'website', validationRules: [
                { expr: 'url' }
            ]},
            {name: 'password', type: 'password', validationRules: [
                { expr: 'req' }
            ]},
            {name: 'submit', type: 'submit', value: 'Submit'}
        ])

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        })

        form.render();

        //ends here
        previewEl.html(form.el);

        form.on('formSubmit', function(formData){
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        })
    }


    function formWithCustomElement(previewEl, consoleEl) {

        //

        //Custom Element Code start
        var tagTemplate = app.compileTemplate("<li><span>{{tag}}</span> <a href='#remove' class='remove'>remove</a></li>");
        var TagElement = Form.ElementView.extend({
            template:'common/templates/widgets/form/tagView.html',
            events:{
                'keypress input':'keyPressHandler',
                'click .remove':'removeHandler'
            },
            keyPressHandler:function(e){

                var keyCode = e.keyCode;
                var model = this.model;
                if(keyCode === 13){
                    e.preventDefault();
                    var tag = this.$('input').val();
                    var value = model.get('value') || '';
                    var valueArr = value.split(',');
                    if(valueArr.indexOf(tag)=== -1){
                        this.addTag(tag);
                        this.$('input').val('');
                        this.updateValue();
                    }
                }

            },
            removeHandler:function(e){
                e.preventDefault();
                var anchor = $(e.target);
                var li = anchor.closest('li');
                li.remove();
                this.updateValue();
            },
            addTag:function(tag){
                var tagList = this.$('.tag-list');
                if(!_.isEmpty(tag)){
                    tagList.append(tagTemplate({tag:tag}));
                }
            },
            valueFunction:function(){
                var spans = this.$('.tag-list li span');
                var tagList = _.map(spans, function(span){
                    return $(span).text()
                })
                return _.uniq(tagList).join(',');
            },
            valueChangeHandler:function(value){
                var _this = this;
                value = value || '';
                var valueArr = _.uniq(_.reject(_.map(value.split(','), $.trim), _.isEmpty));

                var tagList = this.$('.tag-list');
                tagList.empty();
                _.each(valueArr,function(tag){
                    _this.addTag(tag);
                })
            }
        })

        //Custom Element Code end

        var coll = new Form.ElementCollection([
            {name: 'details', type:'textarea', validationRules: [
                { expr: 'req'}
            ]},
            {name: 'tags',type:'tagList', value:'default', validationRules: [
                { expr: 'function', message:'Minimum Two Tags Required', func:function(value){
                    value = value || '';
                    var valueArr = value.split(',');
                    return valueArr.length > 1;
                }}
            ]},
            {name: 'submit', type: 'submit', value: 'Submit'}
        ])

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        })

        //inform form to pick TagElement if the type is tagList
        form.addToTypeViewIndex('tagList', TagElement);

        form.render();

        //ends here
        previewEl.html(form.el);

        form.on('formSubmit', function(formData){
            consoleEl.html(ExamplePage.syntaxHighlight(formData));
        })
    }

    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})
