define(['base/app', 'apps/introduction/pages/landing'],function(baseApp){


    var app = _.extend({},baseApp,{
        test:function(){
            console.log('testing advertiser app');
        },
        defaultPage:'landing',
        renderPage:function(pageId, params){
            //baseApp.log(arguments);
            if(!pageId){
                pageId = this.defaultPage
            }

            if(baseApp.pageView){
                baseApp.pageView.remove();
            }

            require(['apps/introduction/pages/'+pageId],function(Page){

                var view = new Page.View({
                    model:new Page.Model(params)
                })
                var el = $(baseApp.appBody);
                el.empty();
                el.html(view.render().el);
                prettyPrint();

                baseApp.pageView = view;
            })

        }
    });


    return app;

});