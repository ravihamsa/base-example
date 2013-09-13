/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/bone', './examplePage'], function(Base, ExamplePage){



    var PageView = ExamplePage.View.extend({
        examples:[
            {
                func:inlineTemplate,
                title:'Inline Template'
            },{
                func:underscoreTemplate,
                title:'Underscore Template'
            },{
                func:urlTemplate,
                title:'URL Template'
            },
            {
              func:setTemplate,
              title:'Dynamic Templates'
            },
            {
              func:statedView,
              title:'Stated Views'
            },
            {
                func:autoWiredChangeListeners,
                title:'Auto wired model change listeners',
                desc:'Methods of view defined in pattern [attributeName]ChangeHandler will get called every time attribute is changed. No need of add listeners for the same'
            },
            {
                func:dataEvents,
                title:'DataEvents',
                desc:'Use events like hash to listen for events for model / collection defined in view'
            },
            {
                func:baseViewWithSubViews,
                title:'Base View with Sub Views'
            },
            {
                func:metaRequests,
                title:'Data Requests using config'
            }
        ]
    })


    function metaRequests(previewEl, consoleEl){
        //

        var view = new Base.View({
            template:'<div style="background-color: red; padding: 20px; border: 1px solid #ccc;">Test View for Meta Requests</div>',
            requests:[{
                id:'request1',
                params:{
                    index:0,
                    value:'value1'
                }
            },{
                id:'request2',
                params:{
                    index:1,
                    value:'value2'
                }
            }]
        });



        view.render();


        //

        previewEl.html(view.el);

        view.on('requestComplete',function(data){
            consoleEl.html(ExamplePage.syntaxHighlight(data))
        })

        $('<button class="btn">Add Five More Requests</button>').on('click', function(){
            for(var i=0; i<5;i++){
                view.getRequestQue().push({id:'something',params:{index:i, value:Math.random()*30000}}, function(err,out){
                    consoleEl.html(ExamplePage.syntaxHighlight(out));
                });
            }

        }).appendTo(previewEl);


    }


    function inlineTemplate(previewEl){
        //
        var View = Base.View.extend({
            template:'this is inline template'
        });

        var view = new View();
        view.render();

        //

        previewEl.html(view.el);
    }


    function underscoreTemplate(previewEl){
        //
        var View = Base.View.extend({
            template: _.template('this is underscore template')
        });

        var view = new View();
        view.render();

        //

        previewEl.html(view.el);
    }

    function urlTemplate(previewEl){
        //
        var View = Base.View.extend({
            template: 'apps/examples/templates/urlTemplate.html'
        });

        var view = new View();
        view.render();

        //

        previewEl.html(view.el);
    }

    function autoWiredChangeListeners(previewEl, consoleEl){
        //


        var MyView = Base.View.extend({
            template:'<div> <button class="btn but1 btn-primary">Change Attribute 1</button> <button class="btn but2 btn-primary">Change Attribute 2</button> </div>',
            events:{
                'click .but1':'but1ClickHandler',
                'click .but2':'but2ClickHandler'
            },
            but1ClickHandler:function(e){
                e.preventDefault();
                this.model.set('attribute1',new Date().toTimeString());
            },
            but2ClickHandler:function(e){
                e.preventDefault();
                this.model.set('attribute2',new Date().toTimeString());
            },
            attribute1ChangeHandler:function(value){
                this.printOutJSON();
            },
            attribute2ChangeHandler:function(value){
                this.printOutJSON();
            },
            printOutJSON:function(){
                consoleEl.html(ExamplePage.syntaxHighlight(this.model.toJSON()));
            }
        })
        var model = new Base.Model({
            attribute1:'value1',
            attribute2:'value2'
        })

        var view = new MyView({
            model:model
        })
        view.render();
        view.printOutJSON();
        //

        previewEl.html(view.el);

    }


    function dataEvents(previewEl, consoleEl){
        //


        var MyView = Base.View.extend({
            template:'<div> <button class="btn but1 btn-primary">Change Attribute 1</button> <button class="btn but2 btn-primary">Change Attribute 2</button> </div>',
            events:{
                'click .but1':'but1ClickHandler',
                'click .but2':'but2ClickHandler'
            },
            dataEvents:{
                'change:attribute1 change:attribute2':'printOutJSON'
            },
            but1ClickHandler:function(e){
                e.preventDefault();
                this.model.set('attribute1',new Date().toTimeString());
            },
            but2ClickHandler:function(e){
                e.preventDefault();
                this.model.set('attribute2',new Date().toTimeString());
            },
            printOutJSON:function(){
                consoleEl.html(ExamplePage.syntaxHighlight(this.model.toJSON()));
            }
        })
        var model = new Base.Model({
            attribute1:'value1',
            attribute2:'value2'
        })

        var view = new MyView({
            model:model
        })
        view.render();
        view.printOutJSON();
        //

        previewEl.html(view.el);

    }


    function baseViewWithSubViews(previewEl, consoleEl){
        //

        var model = new Base.Model({
            attribute1:'value1',
            attribute2:'value2'
        })

        var view = new Base.View({
            template:'<div>this is parent view <div class="subview-container" style="margin:0 10px; border: 1px solid #ccc; padding: 5px;"></div></div>',
            views:{
                subView1:{
                    View:Base.View,
                    model:model,
                    template:'this is subview 1 {{stringify this}}',
                    parentEl:'.subview-container',
                    renderOnChange:true
                },
                subView2:{
                    View:Base.View,
                    model:model,
                    template:'this is subview 2  {{stringify this}}',
                    parentEl:'.subview-container',
                    renderOnChange:true
                },
                subView3:{
                    View:Base.View,
                    model:model,
                    template:'this is subview 3 {{stringify this}}',
                    parentEl:'.subview-container',
                    renderOnChange:true
                }
            }
        })

        view.render();

        view.getSubView('subView2').setTemplate('this is new updated template for subview 2');

        //

        previewEl.html(view.el);

        $('<button class="btn">Change Attribute 1</button>').on('click', function(){
            model.set('attribute1', new Date().toTimeString());
        }).appendTo(previewEl);

        $('<button class="btn">Change Attribute 2</button>').on('click', function(){
            model.set('attribute2', new Date().toTimeString());
        }).appendTo(previewEl);


    }


    function setTemplate (previewEl, consoleEl){
        //
        var clock = new Base.View({
            template:'Current Time is: '+new Date().toTimeString()
        })

        var interval;

        var startClock = function(){
            interval = setInterval(function(){
                clock.setTemplate('Current Time is: '+new Date().toTimeString())
            },10)
        }

        var stopClock = function(){
            clearInterval(interval);
        }


        clock.render();


        //

        previewEl.html(clock.el);

        $('<br/>').appendTo(previewEl);

        $('<button class="btn">startClock()</button>').on('click', function(){
            startClock();
        }).appendTo(previewEl);

        $('<button class="btn">stopClock()</button>').on('click', function(){
            stopClock();
        }).appendTo(previewEl);
    }



    function statedView (previewEl, consoleEl){
        //

        var RedView = Base.View.extend({
            template:'<div style="background-color: red">this is red view</div> '
        })

        var GreenView = Base.View.extend({
            template:'<div style="background-color: green">this is green view</div> '
        })

        var statedView = new Base.View({
            template:'<div class="state-view"></div>',
            states:{  // if you skip this view will not have setState functionality
                'red':RedView,  //first view would be picked unless you specify state option
                'green':GreenView
            }
        })


        statedView.render();


        //

        previewEl.html(statedView.el);

        $('<br/>').appendTo(previewEl);

        $('<button class="btn">statedView.setState("green")</button>').on('click', function(){
            statedView.setState('green')
        }).appendTo(previewEl);

        $('<button class="btn">statedView.setState("red")</button>').on('click', function(){
            statedView.setState('red')
        }).appendTo(previewEl);
    }




    var PageModel = Base.Model.extend({

    });



    return {
        Model:PageModel,
        View:PageView
    }

})
