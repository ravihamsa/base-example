/**
 * User: Agradip Sarkar
 * Date: 3/10/13
 */

define(['base/app', 'base', 'widgets/dropdown', 'widgets/form','./examplePage'], function (app, Base, Dropdown,Form, ExamplePage) {

    var baseUtil =  Base.util;

    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func: config,
                title: 'Drop Down configuration'
            },
            {
                func: singleDropDown,
                title: 'Single Drop Down'
            },
            {
                func: singleDropDownwithItemTemplate,
                title: 'Single Drop Down with itemTemplate config'
            },
            {
                func: singleDropDownAllowClear,
                title: 'Two Single Drop Down with allow clear'
            },
            {
                func: multiDropDown,
                title: 'Multi Drop Down'
            },
            {
                func: multiDropDownReadonly,
                title: 'Multi Drop Down disabled'
            },
            {
                func: closeOnSelectFalseOption,
                title: 'Multi Drop Down with closeOnSelect false options'
            },
            {
                func: noDataDropDown,
                title: 'No Data Multi Drop Down'
            },
            {
                func: noDataSingleDropDown,
                title: 'No Data Single Drop Down'
            },
            {
                func: singleDropDownWithForm,
                title: 'single Drop Down with form intregation and two TwoLevelDropDown'
            }
            ,
            {
                func: singleDropDownModalwithString,
                title: 'single Drop Down Modal key as string'
            }



            
        ]

    });

    function singleDropDownwithItemTemplate(previewEl, outputEl){
        //code

        var DropDown = new Dropdown.SingleDropDown({placeholder:'Select Number'});
        var coll = new DropDown.ItemCollection([
            { 
                name: "Western", children: [
                    {id: 1, name: 'one'},
                    {id: 2, name: 'two'},
                    {id: 3, name: 'three'},
                    {id: 4, name: 'four'}
                ] 
            },
            {   name:"another group",children:[
                {id: 5, name: 'five'},
                {id: 6, name: 'six'}
                ]
            }

            
        ]);
        var model = new DropDown.Model({
            items: coll
        })

        var SingleDropDownView = DropDown.View.extend({itemTemplate:'apps/examples/templates/exampleitemTemplate.html'});
        var view = baseUtil.createView({View: SingleDropDownView, model: model,parentEl: previewEl,parentView:this});
        //end code 
    }
    
    function closeOnSelectFalseOption(previewEl, outputEl){
        //code
        var DropDown = new Dropdown.MultiDropDown({width:'300px',placeholder:'Select Your choice',closeOnSelect:false});

        var coll = new DropDown.ItemCollection([
            // {id: 1, name: 'one'},
            // {id: 2, name: 'two'},
            // {id: 3, name: 'three'},
            // {id: 4, name: 'four'},
            // {id: 5, name: 'five'},
            // {id: 6, name: 'six'},
            // {id: 7, name: 'seven'},
            // {id: 8, name: 'eight'}
        ]);

        for(var i =0 ;i<1000;i++){
            // if(i<200){
            //     coll.push({id: i , name: i + '-' +i,selected:true})    
            // }
            // else {
            //     coll.push({id: i , name: i + '-' +i})
            // }
               coll.push({id: i , name: i + '-' +i})
            
        }
        var model = new DropDown.Model({
            items: coll
        })

        var view = baseUtil.createView({View: DropDown.View, model: model,parentEl: previewEl,parentView:this});
        // view.remove();
        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });

        //end code
    }

    function config(previewEl, outputEl){

       

        var html = ['<table class="table">',
            '<thead>',
                '<tr>',
                    '<th>Parameter</th><th>Type</th><th>Description</th>',
                '</tr>',
            '</thead>',
            '<tbody>',
            '<tr><td>placeholder</td><td>string</td><td>Default value will be <b>Select Option</b> </td></tr>',
            '<tr><td>allowClear</td><td>boolean</td><td>Default value will be <b>true</b> </td></tr>',
            '<tr><td>openOnEnter</td><td>boolean</td><td>Default value will be <b>true</b> </td></tr>',
            '<tr><td>width</td><td>string</td><td>Default value will be <b>100% for multi dropdown and for single dropdown width will be calculated from max length of the list of items </b> </td></tr>',
            '<tr><td>elementTabIndex</td><td>string</td><td>Default value will be <b>Null</b> This allow to set tabindex</td></tr>',
            '<tr><td>disabled</td><td>boolean</td><td>Default value will be <b>false</b> </td></tr>',
            '<tr><td>closeOnSelect</td><td>boolean</td><td> If set to false the dropdown is not closed after a selection is made, allowing for rapid selection of multiple items. By default this option is set to true.<b> Only applies when configured in multi-select mode. </b> </td></tr>',
            '<tr><td>showSearch</td><td>boolean</td><td>Default value will be <b>true</b> it will show search box with dropdown if false search box  will not be shown.Only applicable to single dropdown</td></tr>',
            '<tr><td>showPlaceHolder</td><td>boolean</td><td>Default value will be <b>true</b> </td></tr>',
            '<tr><td>formatSelection</td><td>function</td><td>Default value will be <b>function (data,escapeMarkup) { return data;}</b> </td></tr>',
            '<tr><td>escapeMarkup</td><td>function</td><td>Default value will be <b>escapeMarkup </b> </td></tr>',
            '<tr><td>formatNoMatches</td><td>function</td><td>Default value will be <b>function(){return "No matches found";}</b> </td></tr>',
            '<tr><td>formatNoData</td><td>function</td><td>Default value will be <b>function(){return "No data found";}</b> </td></tr>',
            '<tr><td>triggerEvent</td><td>boolean</td><td>Default value will be <b>false</b>, this allow logging behaivour for different event </td></tr>',
            '</tbody>',
        '</table>']

        previewEl.addClass('prettyprint');
        previewEl.addClass('lang-js');


        // preEl.html(Handlebars.Utils.escapeExpression(config.toSource().match(/(?=\/\/.+)[\s\S]+(?=\/\/[/s|e])/m)));
        previewEl.html(html.join(''));



    }

    function singleDropDownWithForm(previewEl, outputEl){
        //code
        var oldPostRender = Form.ElementView.prototype.postRender;
        var singleDropDownElement = Form.ElementView.extend({
            template: 'apps/examples/templates/dropDownElementView.html',
            events: {

            },
            postRender : function(){
                oldPostRender.call(this);
                var options = this.model.get('options'),that = this;
                var DropDown = new Dropdown.SingleDropDown(this.model.get('settings'));
                var coll = new DropDown.ItemCollection(options);
                this.normaliseData = this.normalise(options);
                this.dropModel = new DropDown.Model({
                    items: coll
                });

                baseUtil.createView({View: DropDown.View, model: this.dropModel,parentEl: this.$el.find('.elements'),parentView:this});
                this.dropModel.on('all',function(){
                    that.updateOption();
                })
            },
            normalise:function(options){
                var filterList=[];
                filterList = normaliseRecursively(options,filterList);
                function normaliseRecursively(items,filterList){
                    _.each(items,function(option){
                        var childrens = option.children || [];
                        if(childrens.length){
                            return normaliseRecursively(option.children,filterList);    
                        }
                        else{
                            filterList.push(option);
                        }
                    });
                    return filterList;
                }
                return filterList;
            },
            updateOption:function(){
                var selectedItem = this.dropModel.getSelected(),options = this.normaliseData,option;
                this.clearSelection();
                if(selectedItem){
                    option = _.findWhere(options, {id: selectedItem.get('id')});
                    option.selected = true;    
                }
                this.updateValue();
                
            },
            clearSelection:function(){
                var options = this.normaliseData;
                _.each(options,function(v){
                    v.selected = false;
                });
            },
            getSelected:function(){
                var options = this.normaliseData;
                options = _.filter(options, function(v){ return v.selected });
                return options;              
            },
            valueFunction: function () {
               var selectedOptions = this.getSelected();
               if(selectedOptions.length){
                    return selectedOptions[0].id; 
               }
               else {
                    return;
               }

               

            },
            valueChangeHandler: function (value) {
                var settings = this.model.get('settings'),options = this.model.get('options'),option;
                this.normaliseData = this.normalise(options);
                options = this.normaliseData;
                if(!_.isUndefined(value)){
                    option = _.findWhere(options, {id: value});
                    option.selected = true;    
                }
                     
            }
        });

        
        var twoLevelDropDownElement = Form.ElementView.extend({
            template: 'apps/examples/templates/dropDownElementView.html',
            events: {

            },
            normalise:function(options){
                var filterList=[];
                filterList = normaliseRecursively(options,filterList);
                function normaliseRecursively(items,filterList){
                    _.each(items,function(option){
                        var childrens = option.children || [];
                        if(childrens.length){
                            return normaliseRecursively(option.children,filterList);    
                        }
                        else{
                            filterList.push(option);
                        }
                    });
                    return filterList;
                }
                return filterList;
            },
            postRender : function(){
                oldPostRender.call(this);
                var options = this.model.get('options'),that = this;
                this.normaliseData = this.normalise(options);
                var DropDown = new Dropdown.TwoLevelDropDown(this.model.get('settings'));
                var coll = new DropDown.ItemCollection(options);
                this.dropModel = new DropDown.Model({
                    items: coll
                });

                baseUtil.createView({View: DropDown.View, model: this.dropModel,parentEl: this.$el.find('.elements'),parentView:this});
                this.dropModel.on('all',function(){
                    that.updateOption();
                })
            },
            updateOption:function(){
                var selectedItem = this.dropModel.getSelected(),options = this.normaliseData,
                option;
                this.clearSelection();
                $.each(selectedItem,function(i,v){
                    option = _.findWhere(options, {id: v.get('id')});
                    option.selected = true;
                });
                this.updateValue();
                
            },
            clearSelection:function(){
                var options = this.normaliseData;
                $.each(options,function(i,v){
                    v.selected = false;
                });
            },
            getSelected:function(){
                var options = this.normaliseData;
                options = _.filter(options, function(v){ return v.selected });
                return options;              
            },
            valueFunction: function () {
               var selectedOptions = this.getSelected();
               var values = []
               $.each(selectedOptions,function(i,v){
                    values.push(v.id);
               });
               return values;

            },
            valueChangeHandler: function (value) {
                var options = this.model.get('options'),option;
                this.normaliseData = this.normalise(options);
                options = this.normaliseData;
                if (_.isArray(value)) {
                    _.each(value, function (v) {
                        option = _.findWhere(options, {id: v});
                        option.selected = true;
                    });
                } 
                     
            }
        });
        


        var coll = new Form.ElementCollection([
            {name: 'userName'},
            {name: 'password', type: 'password'},
            {name: 'Interests', type: 'twoLevelDropDownElement', value: [], options: [
                 { name: 'Country',children:[
                    {id:'allcountries', name:'All Country',type:'All'},
                    {id: 1, name: 'India'},
                    {id: 2, name: 'USA'},
                    {id: 3, name: 'Australia'},
                    {id: 4, name: 'Newziland'},
                ]},
                { name: 'Region',children:[
                    {id:'allregion', name:'All Region',type:'All'},
                    {id:5, name:'JAPAC'},
                    {id:6, name:'EMEA'},
                    {id:7, name:'SOUTH EAST-ASIA'}
                    
                ]},
                {

                    name:'OS',children:[
                        {id:'allos', name:'All OS',type:'All'},
                        {id:14, name:'Andriod'},
                        {id:15, name:'IOS'},
                        {id:16, name:'Windows'}
                        
                    ]
                },
                {

                    name:'device',children:[
                        {id:'alldevice', name:'All Device',type:'All'},
                        {id:17, name:'Iphone'},
                        {id:18, name:'Samsung'},
                        {id:19, name:'IPhone5'}
                        
                    ]
                },
                {

                    name:'carrier',children:[
                        {id:'allcarrier', name:'All Carrier',type:'All'},
                        {id:21, name:'Airtel'},
                        {id:22, name:'Vondphone'},
                        {id:23, name:'Relaince'}
                        
                    ]
                }

                
            ],settings:{placeholder:'Select Interest',width:'300px',closeOnSelect:false}},
            {name: 'submit', type: 'submit', value: 'Submit'}
        ])

        var formModel = new Form.Model({
            elements: coll
        });

        var form = new Form.View({
            model: formModel
        })

        form.addToTypeViewIndex('singleDropDownElement', singleDropDownElement);
        form.addToTypeViewIndex('twoLevelDropDownElement', twoLevelDropDownElement);
        

        form.render();

        //ends here

        previewEl.html(form.el);

        form.on('formSubmit', function (formData) {
            outputEl.html(ExamplePage.syntaxHighlight(formData));
        });

        
    }

    function singleDropDownAllowClear(previewEl, outputEl){
        //code
        previewEl = $(previewEl).append('<div class="dropdown1" style="display:inline-block;margin-right:20px;"></div><div class="dropdown2" style="display:inline-block;"></div>');
        outputEl = $(outputEl).append('<div class="dropdown1" style="display:inline-block;margin-right:20px;"></div><div class="dropdown2" style="display:inline-block;"></div>');
        var DropDown = new Dropdown.SingleDropDown({placeholder:'select number'});

        var coll = new DropDown.ItemCollection([
            { 
                name: "Western", children: [
                    {id: 1, name: 'one'},
                    {id: 2, name: 'two'},
                    {id: 3, name: 'three'},
                    {id: 4, name: 'four'}
                ] 
            },
            {   name:"another group",children:[
                {id: 5, name: 'five'},
                {id: 6, name: 'six'}
                ]
            }

            
        ]);

        for(var i =7 ;i<100;i++){
            // if(i<200){
            //     coll.push({id: i , name: i + '-' +i,selected:true})    
            // }
            // else {
            //     coll.push({id: i , name: i + '-' +i})
            // }
            coll.push({id: i , name: i + '-' +i})
            
        }

        var model = new DropDown.Model({
            items: coll
        })



        

        baseUtil.createView({View: DropDown.View, model: model,parentEl: previewEl.find('.dropdown1'),parentView:this});

        var DropDown = new Dropdown.SingleDropDown({placeholder:'select year'});

        var coll = new DropDown.ItemCollection([
                
                    {id: 1999, name: '1999'},
                    {id: 1998, name: '1998',selected:true},
                    {id: 1997, name: '1997'},
                    {id: 1996, name: '1996'}
                
            

            
        ]);

        var model2 = new DropDown.Model({
            items: coll
        })



        baseUtil.createView({View: DropDown.View, model: model2,parentEl: previewEl.find('.dropdown2'),parentView:this});        

        outputEl.find('.dropdown1').html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.find('.dropdown1').html(ExamplePage.syntaxHighlight(model.getSelected()));
        });
        // model.on('drop-opening',function(e){
        //     console.log('opening');
        // })
        // model.on('drop-close',function(){
        //     console.log('close');
        // });
        // model.on('drop-focus',function(){
        //     console.log('focus');
        // });

        // model.on('drop-blur',function(){
        //     console.log('blur');
        // });

        // model.on('drop-clearing',function(){
        //     console.log('clearing');
        // });

        // model.on('drop-reset',function(){
        //     console.log('reseting');
        // });

        outputEl.find('.dropdown2').html(JSON.stringify(model2.getSelected()));
        model2.on('all', function () {
            outputEl.find('.dropdown2').html(ExamplePage.syntaxHighlight(model2.getSelected()));
        });

        //end code
    }

    function singleDropDown(previewEl, outputEl) {
        //code
        var DropDown = new Dropdown.SingleDropDown({showSearch:false,showPlaceHolder:false,allowClear:false});

        var coll = new DropDown.ItemCollection([
            { 
                name: "Western", children: [
                    {id: 1, name: 'one'},
                    {id: 2, name: 'two'},
                    {id: 3, name: 'three'},
                    {id: 4, name: 'four'}
                ] 
            },
            {   name:"another group",children:[
                {id: 5, name: 'five'},
                {id: 6, name: 'six'}
                ]
            }

            
        ]);
        var model = new DropDown.Model({
            items: coll
        })
        

        var view = baseUtil.createView({View: DropDown.View, model: model,parentEl: previewEl,parentView:this});        
        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });
        // model.on('drop-opening',function(e){
        //     console.log('opening');
        // })
        // model.on('drop-close',function(){
        //     console.log('close');
        // });
        // model.on('drop-focus',function(){
        //     console.log('focus');
        // });

        // model.on('drop-blur',function(){
        //     console.log('blur');
        // });

        // model.on('drop-clearing',function(){
        //     console.log('clearing');
        // });

        // model.on('drop-reset',function(){
        //     console.log('reseting');
        // });
        //end code
    }

    function multiDropDown(previewEl, outputEl) {

        //code
        var DropDown = new Dropdown.MultiDropDown({width:'300px'});

        var coll = new DropDown.ItemCollection([
            {id: 1, name: 'one',selected:true},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'},
            {id: 4, name: 'four'},
            {id: 5, name: 'five'},
            {id: 6, name: 'six'},
            {id: 7, name: 'seven'},
            {id: 8, name: 'eight',selected:true}
        ]);

        var model = new DropDown.Model({
            items: coll
        })
        var cTemplate = ['<li class="ibone-drp-search-choice" data-id="{{id}}">','<a href="#" onclick="return false;" class="ibone-drp-search-choice-close" tabindex="-1"></a>' ,'<div>{{name}}</div>','</li>'].join('');
        var multiDropDownView = DropDown.View.extend({choiceTemplate:cTemplate});
        baseUtil.createView({View: multiDropDownView, model: model,parentEl: previewEl,parentView:this});

        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });

        // model.on('drop-opening',function(e){
        //     console.log('opening');
        // })
        // model.on('drop-close',function(){
        //     console.log('close');
        // });
        // model.on('drop-focus',function(){
        //     console.log('focus');
        // });

        // model.on('drop-blur',function(){
        //     console.log('blur');
        // });

        // model.on('drop-clearing',function(){
        //     console.log('clearing');
        // });

        // model.on('drop-reset',function(){
        //     console.log('reseting');
        // });

        // model.on('drop-selected',function(){
        //     console.log('drop-selected');
        // });

        // model.on('drop-removed',function(){
        //     console.log('drop-removed');
        // });

        //end code

        

    }

    function multiDropDownReadonly(previewEl, outputEl) {

        //code
        var DropDown = new Dropdown.MultiDropDown({disabled:true});

        var coll = new DropDown.ItemCollection([
            {id: 1, name: 'one',selected:true},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'},
            {id: 4, name: 'four'},
            {id: 5, name: 'five'},
            {id: 6, name: 'six'},
            {id: 7, name: 'seven'},
            {id: 8, name: 'eight',selected:true}
        ]);

        var model = new DropDown.Model({
            items: coll
        })


        baseUtil.createView({View: DropDown.View, model: model,parentEl: previewEl,parentView:this});

        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });

        // model.on('drop-opening',function(e){
        //     console.log('opening');
        // })
        // model.on('drop-close',function(){
        //     console.log('close');
        // });
        // model.on('drop-focus',function(){
        //     console.log('focus');
        // });

        // model.on('drop-blur',function(){
        //     console.log('blur');
        // });

        // model.on('drop-clearing',function(){
        //     console.log('clearing');
        // });

        // model.on('drop-reset',function(){
        //     console.log('reseting');
        // });

        // model.on('drop-selected',function(){
        //     console.log('drop-selected');
        // });

        // model.on('drop-removed',function(){
        //     console.log('drop-removed');
        // });

        //end code

        

    }


    function noDataDropDown(previewEl, outputEl) {

        //code
        var DropDown = new Dropdown.MultiDropDown({placeholder:'select data'});

        var coll = new DropDown.ItemCollection([]);

        var model = new DropDown.Model({
            items: coll
        })


        baseUtil.createView({View: DropDown.View, model: model,parentEl: previewEl,parentView:this});
        
        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });
        //end code

    }

    function noDataSingleDropDown(previewEl, outputEl) {

        //code
        var DropDown = new Dropdown.SingleDropDown({placeholder:'select data'});

        var coll = new DropDown.ItemCollection([]);

        var model = new DropDown.Model({
            items: coll
        })


        baseUtil.createView({View: DropDown.View, model: model,parentEl: previewEl,parentView:this});
        
        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });
        //end code

    }
    

    function singleDropDownModalwithString(previewEl, outputEl) {
        //code
        var DropDown = new Dropdown.SingleDropDown({placeholder:'select data'});

        var coll = new DropDown.ItemCollection([
                {id: 'apple', name: 'Apple'},
                {id: 'mango', name: 'Mango'},
                {id: 'banana', name: 'Banana'}
            ]);

        var model = new DropDown.Model({
            items: coll
        })


        baseUtil.createView({View: DropDown.View, model: model,parentEl: previewEl,parentView:this});
        
        outputEl.html(JSON.stringify(model.getSelected()));
        model.on('all', function () {
            outputEl.html(ExamplePage.syntaxHighlight(model.getSelected()));
        });
        //end code
    }
    
    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})

window.onerror =function(e){
    try {
        console.log(arguments);
    }
    catch(e){
        console.log(arguments);
    }

    
}