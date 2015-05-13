/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'base/dataLoader', 'apps/examples/pages/examplePage'], function(Base, dataLoader, ExamplePage) {

    var app = Base.app;

    var baseUtil = Base.util;


    var PageView = ExamplePage.View.extend({
        examples: [{
            func: inlineTemplate,
            title: 'Inline Template'
        }, {
            func: underscoreTemplate,
            title: 'Underscore Template'
        }, {
            func: urlTemplate,
            title: 'URL Template'
        }, {
            func: loadMeta,
            title: 'Load Meta'
        }, {
            func: setTemplate,
            title: 'Dynamic Templates'
        }, {
            func: statedView,
            title: 'Stated Views'
        }, {
            func: autoWiredChangeListeners,
            title: 'Auto wired model change listeners',
            desc: 'Methods of view defined in pattern [attributeName]ChangeHandler will get called every time attribute is changed. No need of add listeners for the same'
        }, {
            func: dataEvents,
            title: 'DataEvents',
            desc: 'Use events like hash to listen for events for model / collection defined in view'
        }, {
            func: baseViewWithSubViews,
            title: 'Base View with Sub Views'
        }, {
            func: metaRequests,
            title: 'Data Requests using config'
        }, {
            func: deepExtendMethods,
            title: 'Extending methods deeply'
        }, {
            func: removeBeforeAsyncRender,
            title: 'Removing view before async render'
        }, {
            func: postMessage,
            title: 'posting messages between sub views'
        }, {
            func: autoDataLoad,
            title: 'Loading Data Automatically'
        }, {
            func: globalPlugins,
            title: 'Initialized any jquery or any other plugin on view elements, defined at global level'
        }, {
            func: viewLevelPluginOverride,
            title: 'Initialized any jquery or any other plugin on view elements'
        }]
    });

    function globalPlugins(previewEl, consoleEl) {
        //globalPlugins

        Base.View.addToPluginIndex('.new-plugin', function(element, view) {
            element.append('new plugin initialized');
        });


        Base.View.addToPluginIndex('.new-plugin2', function(element, view) {
            element.append('new plugin2initialized');
        });

        var view = new Base.View({
            views: {
                test1: {
                    View: Base.View,
                    template: 'test1: <div class="new-plugin">  </div>'
                },
                test2: {
                    View: Base.View,
                    template: 'test2: <div class="new-plugin">  </div>'
                },
                test3: {
                    View: Base.View,
                    template: 'test3: <div class="new-plugin2">  </div>'
                }
            },
            template: 'at parent view: <div class="new-plugin"> </div> <div class="new-plugin2"> </div>'
        });
        view.render();
        //ends here

        view.$el.appendTo(previewEl);
    }

    function viewLevelPluginOverride(previewEl, consoleEl) {
        //pluginInitialization

        var view = new Base.View({
            template: '<div class="custom-plugin"> </div>',
            pluginIndex: {
                '.custom-plugin': function(element, view) {
                    element.html('plugin initialized');
                }
            }
        });
        view.render();
        //ends here

        view.$el.appendTo(previewEl);
    }


    function autoDataLoad(previewEl, consoleEl) {
        //autoDataLoad

        var model = new Base.Model();
        model.url = '/app/data/strings.json';

        var collection = new Base.Collection();
        collection.url = '/app/data/names.json';

        var modelView = baseUtil.createView({
            View: Base.View,
            template: '{{stringify this}}',
            model: model,
            preLoadData: true
        });

        modelView.render();

        var collectionView = baseUtil.createView({
            View: Base.View,
            template: '{{stringify this}}',
            collection: collection,
            preLoadData: true
        });

        collectionView.render();

        //ends here

        modelView.$el.appendTo(previewEl);
        collectionView.$el.appendTo(previewEl);
    }

    function postMessage(previewEl, consoleEl) {
        //starts here

        var SubView1 = Base.View.extend({
            events: {
                'click .poke': 'pokeClickHandler'
            },
            customEvents: {
                'message': 'messageHandler'
            },
            pokeClickHandler: function() {
                this.postMessage('arg1');
            },
            messageHandler: function() {
                this.$('.message-container').append('<br> message received from ' + _.first(arguments) + ' with argument ', _.rest(_.rest(arguments)).join(','));
            },
            template: '<div style="border:1px solid #ccc;"><h1>Sub View 1 </h1><button class="poke"> postMessage </button> <div class="message-container"> </div></div>'
        });

        var SubView2 = Base.View.extend({
            events: {
                'click .poke': 'pokeClickHandler'
            },
            customEvents: {
                'message': 'messageHandler'
            },
            messageHandler: function() {
                this.$('.message-container').append('<br> message received from ' + _.first(arguments) + ' with argument ', _.rest(_.rest(arguments)).join(','));
            },
            pokeClickHandler: function() {
                this.postMessage('arg1', 'arg2');
            },
            template: '<div style="border:1px solid #ccc;"><h1>Sub View 2 </h1><button class="poke"> postMessage </button> <div class="message-container"> </div></div>'
        });
        var SubView3 = Base.View.extend({
            events: {
                'click .poke': 'pokeClickHandler',
                'click .pokeTo1': 'pokeTo1ClickHandler'
            },
            customEvents: {
                'message': 'messageHandler'
            },
            messageHandler: function() {
                console.log(arguments, 'view3');
                this.$('.message-container').append('<br> message received from ' + _.first(arguments) + ' with argument ', _.rest(_.rest(arguments)).join(','));
            },
            pokeClickHandler: function() {
                this.postMessage('arg1', 'arg2', 'arg3');
            },
            pokeTo1ClickHandler: function() {
                this.postMessageTo('view1', 'private argument');
            },
            template: '<div style="border:1px solid #ccc;"><h1>Sub View 3 </h1><button class="poke"> postMessage </button><button class="pokeTo1"> postMessage only to sub view 1 </button> <div class="message-container"> </div></div>'
        });

        var ParentView = Base.View.extend({
            template: '<div  style="border:1px solid #ccc;"> <h1>Parent View </h1> <div class="parent-message-container"> </div><div class="view1"> </div> <div class="view2"> </div> <div class="view3"> </div> </div>',
            customEvents: {
                'message': 'messageHandler'
            },
            messageHandler: function() {
                this.$('.parent-message-container').append('<br> message received from ' + _.first(arguments) + ' with argument ', _.rest(_.rest(arguments)).join(','));
            },

            views: {
                'view1': {
                    View: SubView1
                },
                'view2': {
                    View: SubView2
                },
                'view3': {
                    View: SubView3
                }
            }
        });

        var view = new ParentView();
        view.render();

        //ends here
        view.$el.appendTo(previewEl);



        var MyModel = Backbone.Model.extend({
            defaults: function() {
                return {
                    'dayList': ['Sun', 'Mon']
                };
            }
        });

        var instance1 = new MyModel();
        var instance2 = new MyModel();
        instance1.get('dayList').push('Tue');
        var instance3 = new MyModel();
        console.log(instance1.toJSON(), instance2.toJSON(), instance3.toJSON(), '=============');
    }

    function deepExtendMethods(previewEl, consoleEl) {

        //starts here

        var MyView = Base.View.extend({
            render: function() {
                this.$el.html('<p>this is appended by render method </p>');
            }
        })

        MyView.deepExtendMethods({
            render: function() {
                this.$el.append('<p>this is appended by deep extended render</p>')
            }
        })


        var MyView2 = MyView.extend({

        });

        MyView2.deepExtendMethods({
            render: function() {
                this.$el.append('<p>this is appended by deep extended render from MyView2</p>')
            }
        })

        var view = new MyView2();
        view.render();

        //ends here

        view.$el.appendTo(previewEl);

    }


    function metaRequests(previewEl, consoleEl) {
        //starts here

        var randomUserTemplate = '{{#each users}}{{#if errors}} {{#each errors}} <div><h1>{{message}}</h1></div>{{/each}}{{else}}<div><h1>{{name.title}} {{name.first}} {{name.last}}</h1> <div style="text-align:right"><a href="#{{md5_hash}}" class="action">remove</a></div><img src="{{picture}}" height="50" width="50"/><p>{{email}}</p></div>{{/if}}{{/each}}';

        var randomUserParser = function(data) {
            if (data.errors) {
                return data;
            } else {
                return data.results[0].user;
            }
        }

        dataLoader.define('randomUser', {
            type: 'GET',
            url: 'http://api.randomuser.me/',
            parser: randomUserParser
        })

        dataLoader.define('wrongUser', {
            type: 'GET',
            url: 'http://api.wrongmuser.me/',
            parser: randomUserParser
        })

        var UserModel = Base.Model.extend({
            idAttribute: 'md5_hash'
        })

        var UserCollection = Base.Collection.extend({
            model: UserModel
        })

        var usersCollection = new UserCollection()


        var model = new Base.Model({
            users: usersCollection
        });


        var randomUserSuccessHandler = function(user) {
            usersCollection.add(user);
        }

        usersCollection.on('add remove', function() {
            model.trigger('change', model);
        })

        var UserListView = Base.View.extend({
            template: randomUserTemplate,
            requests: [{
                id: 'randomUser',
                params: {
                    index: 0,
                    value: 'value1'
                }
            }, {
                id: 'wrongUser',
                params: {
                    index: 1,
                    value: 'value2'
                }
            }],
            renderEvents: ['change'],
            actionHandler: function(userHash) {
                var userCollection = this.model.get('users');
                userCollection.get(userHash).removeSelf();
            },
            useDeepJSON: true,
            requestsParser: function() {
                var args = Array.prototype.slice.call(arguments);
                usersCollection.add(args);
            }
        })


        var view = new UserListView({
            model: model
        });


        view.render();


        //ends here

        previewEl.html(view.el);

        view.on('requestComplete', function(data) {
            consoleEl.html(ExamplePage.syntaxHighlight(data))
        })

        $('<button class="btn">Add Two More Requests</button>').on('click', function() {
            for (var i = 0; i < 2; i++) {
                view.addRequest({
                    id: 'randomUser',
                    params: {
                        index: i,
                        value: Math.random() * 30000
                    }
                }, randomUserSuccessHandler);
            }

        }).appendTo(previewEl);


    }


    function inlineTemplate(previewEl) {
        //starts here
        var View = Base.View.extend({
            template: 'this is inline template'
        });

        var view = new View();
        view.render();

        //ends here

        previewEl.html(view.el);
    }


    function underscoreTemplate(previewEl) {
        //starts here
        var View = Base.View.extend({
            template: 'this is underscore template',
            templateType: Base.View.templateTypes.UNDERSCORE //"underscore" would do
        });

        var view = new View();
        view.render();


        var View2 = Base.View.extend({
            template: 'apps/examples/templates/underscoreUrlTemplate.html',
            templateType: Base.View.templateTypes.UNDERSCORE, //"underscore" would do
            serialize: function() {
                return {
                    extra: 'This is being added from serialize'
                }
            }
        })

        var view2 = new View2();
        view2.render();

        //ends here

        previewEl.html(view.el);
        previewEl.append(view2.el);
    }

    function removeBeforeAsyncRender(previewEl) {
        //starts here

        dataLoader.define('randomUser', {
            type: 'GET',
            url: 'http://api.randomuser.me/'
        })

        dataLoader.define('wrongUser', {
            type: 'GET',
            url: 'http://api.wrongmuser.me/'
        })


        var View = Base.View.extend({
            template: 'apps/examples/templates/urlTemplate.html',
            requests: [{
                id: 'randomUser',
                params: {
                    index: 0,
                    value: 'value1'
                }
            }, {
                id: 'wrongUser',
                params: {
                    index: 1,
                    value: 'value2'
                }
            }]
        });


        var runTest = function() {
            for (var i = 0; i < 100; i++) {
                var view = new View();
                view.render();
                previewEl.append(view.el);
                view.remove();
            }
        }

        //ends here



        $('<button class="btn">runTest()</button>').on('click', function() {
            runTest();
        }).appendTo(previewEl);

    }

    function urlTemplate(previewEl) {
        //starts here
        var View = Base.View.extend({
            template: 'apps/examples/templates/urlTemplate.html'
        });

        var view = new View();
        view.render();


        //ends here

        previewEl.html(view.el);

    }

    function autoWiredChangeListeners(previewEl, consoleEl) {
        //starts here


        var MyView = Base.View.extend({
            template: '<div> <button class="btn but1 btn-primary">Change Attribute 1</button> <button class="btn but2 btn-primary">Change Attribute 2</button> </div>',
            events: {
                'click .but1': 'but1ClickHandler',
                'click .but2': 'but2ClickHandler'
            },
            but1ClickHandler: function(e) {
                e.preventDefault();
                this.model.set('attribute1', new Date().toTimeString());
            },
            but2ClickHandler: function(e) {
                e.preventDefault();
                this.model.set('attribute2', new Date().toTimeString());
            },
            attribute1ChangeHandler: function(value) {
                this.printOutJSON();
            },
            attribute2ChangeHandler: function(value) {
                this.printOutJSON();
            },
            printOutJSON: function() {
                consoleEl.html(ExamplePage.syntaxHighlight(this.model.toJSON()));
            }
        })
        var model = new Base.Model({
            attribute1: 'value1',
            attribute2: 'value2'
        })

        var view = new MyView({
            model: model
        })
        view.render();
        view.printOutJSON();

        //ends here

        previewEl.html(view.el);

    }


    function dataEvents(previewEl, consoleEl) {
        //starts here


        var MyView = Base.View.extend({
            template: '<div> <button class="btn but1 btn-primary">Change Attribute 1</button> <button class="btn but2 btn-primary">Change Attribute 2</button> </div>',
            events: {
                'click .but1': 'but1ClickHandler',
                'click .but2': 'but2ClickHandler'
            },
            dataEvents: {
                'change:attribute1 change:attribute2': 'printOutJSON'
            },
            but1ClickHandler: function(e) {
                e.preventDefault();
                this.model.set('attribute1', new Date().toTimeString());
            },
            but2ClickHandler: function(e) {
                e.preventDefault();
                this.model.set('attribute2', new Date().toTimeString());
            },
            printOutJSON: function() {
                consoleEl.html(ExamplePage.syntaxHighlight(this.model.toJSON()));
            }
        })
        var model = new Base.Model({
            attribute1: 'value1',
            attribute2: 'value2'
        })

        var view = new MyView({
            model: model
        })
        view.render();
        view.printOutJSON();

        //ends here

        previewEl.html(view.el);

    }


    function baseViewWithSubViews(previewEl, consoleEl) {
        //starts here

        var model = new Base.Model({
            attribute1: 'value1',
            attribute2: 'value2'
        })

        var view = new Base.View({
            template: '<div>this is parent view <div class="subview-container" style="margin:0 10px; border: 1px solid #ccc; padding: 5px;"></div></div>',
            views: {
                subView1: {
                    View: Base.View,
                    model: model,
                    template: 'this is subview 1 {{stringify this}}',
                    parentEl: '.subview-container',
                    renderEvents: ['change']
                },
                subView2: {
                    View: Base.View,
                    model: model,
                    template: 'this is subview 2  {{stringify this}}',
                    parentEl: '.subview-container',
                    renderEvents: ['change']
                },
                subView3: {
                    View: Base.View,
                    model: model,
                    template: 'this is subview 3 {{stringify this}}',
                    parentEl: '.subview-container',
                    renderEvents: ['change']
                }
            }
        })

        view.render();

        view.getSubView('subView2').setTemplate('this is new updated template for subview 2');

        //ends here

        previewEl.html(view.el);

        $('<button class="btn">Change Attribute 1</button>').on('click', function() {
            model.set('attribute1', new Date().toTimeString());
        }).appendTo(previewEl);

        $('<button class="btn">Change Attribute 2</button>').on('click', function() {
            model.set('attribute2', new Date().toTimeString());
        }).appendTo(previewEl);


    }


    function setTemplate(previewEl, consoleEl) {
        //starts here
        var clock = new Base.View({
            template: 'Current Time is: ' + new Date().toTimeString()
        })

        var interval;

        var startClock = function() {
            interval = setInterval(function() {
                clock.setTemplate('Current Time is: ' + new Date().toTimeString())
            }, 10)
        }

        var stopClock = function() {
            clearInterval(interval);
        }


        clock.render();


        //ends here

        previewEl.html(clock.el);

        $('<br/>').appendTo(previewEl);

        $('<button class="btn">startClock()</button>').on('click', function() {
            startClock();
        }).appendTo(previewEl);

        $('<button class="btn">stopClock()</button>').on('click', function() {
            stopClock();
        }).appendTo(previewEl);
    }


    function statedView(previewEl, consoleEl) {
        //starts here

        var RedView = Base.View.extend({
            template: '<div style="background-color: red">this is red view</div> '
        })

        var GreenView = Base.View.extend({
            template: '<div style="background-color: green">this is green view</div> '
        })

        var statedView = new Base.View({
            template: '<div class="state-view"></div>',
            states: {
                'red': RedView,
                'green': GreenView
            }
        })


        statedView.render();


        //ends here

        previewEl.html(statedView.el);

        $('<br/>').appendTo(previewEl);

        $('<button class="btn">statedView.setState("green")</button>').on('click', function() {
            statedView.setState('green')
        }).appendTo(previewEl);

        $('<button class="btn">statedView.setState("red")</button>').on('click', function() {
            statedView.setState('red')
        }).appendTo(previewEl);
    }


    function loadMeta(previewEl, consoleEl) {
        //starts here

        dataLoader.define('country', {
            url:'/qcn-test/public/index.php/country',
            type:'GET',
            contentType:'json'
        })

        var MetaView = Base.View.extend({
            template:'<ul>{{#each data}}  <li>{{country_name}}</li> {{/each}}</ul>',
            loadMeta: function(){
                var _this = this;
                var def = this.addRequest({
                    id:'country'
                })

                def.done(function(resp){
                    _this.model.set({data:resp})
                })

                def.fail(function(){
                    //console.log('failed');
                })

                return def;
            }
        })


        var metaView = new MetaView({

        })

        metaView.render();
        //ends here

        previewEl.html(metaView.el);


    }


    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    }

})
