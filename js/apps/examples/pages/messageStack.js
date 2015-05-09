define(['base', 'apps/examples/pages/examplePage', 'widgets/calendar', 'widgets/form', 'widgets/messageStack'], function(Base, ExamplePage, Calendar, Form, MessageStack) {
    "use strict";



    var MessageStackPageView = ExamplePage.View.extend({
        examples: [{
            func: messageStackWithActionButton,
            title: 'Message Stack with Action Button'
        }]
    });




    function messageStackWithActionButton(previewEl, consoleEl) {
        //start

        var CustomMessageStackView = MessageStack.View.extend({
            actionHandler: function(action, actionParams, e){
                e.actionHandled=true;
                alert('handling action: '+action);

            }
        })

        var TestView = Base.View.extend({
            template:'this.is.test view with message stack and action button <div class="message-stack-holder"> </div>',
            views:{
                messageStack:{
                    View:CustomMessageStackView,
                    parentEl:'.message-stack-holder'
                }
            }
        })

        var view = new TestView();
        view.render();


        var messageStackView = view.getSubView('messageStack');
        messageStackView.addMessage({
            errorCode:121312,
            message:'This has a action button try clicking on it <a href="#revert" class="action btn btn-primary-cta">revert</a>',
            isClosable:true,
            expires:0
        })

        //end

        view.$el.appendTo(previewEl);
    }


    

    return {
        View: MessageStackPageView,
        Model: ExamplePage.Model
    };
});
