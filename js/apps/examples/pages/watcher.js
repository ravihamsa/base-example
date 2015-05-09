/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base/app', 'base', 'list','apps/examples/pages/examplePage', 'text!../templates/watcherdesc.html'], function (app, Base, List, ExamplePage, watcherDescTemplate) {

    var baseUtil =  Base.util;

    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func: watcherUsage,
                title: 'Watcher Usage'
            }
        ]

    })


    function watcherUsage(previewEl, outputEl) {

        //start

        var SubView1 = Base.View.extend({
            watcherEvents:{
                'someEvent': function(){
                    alert('someEvent');
                },
                eventFromParent: function(){
                    alert('eventFromParent');
                }
            },
            template:'Click on html elements above to update watcher,  <a class="action" href="#triggerEvent"> click me to watchTrigger  </a>',
            actionHandler: function(action, params, event){
                event.actionHandled  = true;
                this.watcherTrigger('someEvent');
            },
            postRender: function(){
                var _this = this;
                _this.addWatch({
                    name:'someAttribute',
                    source:_this.model
                });
                setTimeout(function(){
                    _this.model.set('attribute1', 'value1')
                },300)
            }
        })

        var DemoView = Base.View.extend({

            template: watcherDescTemplate,
            events:{
                'click h1': function(){
                    var h1ClickCount = this.model.get('h1ClickCount');
                    h1ClickCount = h1ClickCount || 0;
                    h1ClickCount++;
                    this.model.set('h1ClickCount', h1ClickCount);
                },
                'click p': function(){
                    var pClickCount = this.model.get('pClickCount');
                    pClickCount = pClickCount || 0;
                    pClickCount++;
                    this.model.set('pClickCount', pClickCount);
                },
                'click h2': function(){
                    var h2ClickCount = this.model.get('h2ClickCount');
                    h2ClickCount = h2ClickCount || 0;
                    h2ClickCount++;
                    this.model.set('h2ClickCount', h2ClickCount);
                }


            },
            watcherEvents :{
                'change:someAttribute': function(){
                    console.log(arguments, 'watcherEvents');
                },
                'someEvent':function(){
                    alert('event from child');
                }
            },
            views:{
                subView1:{
                    View:SubView1,
                    parentEl:'.sub-view-container'
                }
            },
            Watcher: Base.Watcher,
            postRender: function(){

                this.$('pre').each(function(){
                    var $this = $(this);
                    $this.html(ExamplePage.syntaxHighlight($this.html()));
                })

                this.addWatch({
                    name:'ClickCountAtWatcher',
                    source:this.model,
                    parser: function(model){
                        return _.pick(model.toJSON(), 'h1ClickCount', 'h2ClickCount', 'pClickCount')
                    },
                    composer: function(model, h1ClickCountAtWatcher){
                        model.set('h1ClickCount', h1ClickCountAtWatcher);
                    }
                })

            }
        });


        var view = baseUtil.createView({View:DemoView, parentEl: previewEl, parentView:this});

        //end

        var watcher = view.getWatcher();
        view.listenTo(watcher,'all', function () {
            outputEl.empty();
            outputEl.html(ExamplePage.syntaxHighlight(watcher.toJSON()));
        });
    }



    var PageModel = Base.Model.extend({

    });

    return {
        Model: PageModel,
        View: PageView
    }

})