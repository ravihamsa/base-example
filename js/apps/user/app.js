define(['base/app','base/dataLoader', 'apps/user/pages/login'],function(baseApp, dataLoader){

    var app = _.extend({},baseApp,{
        test:function(){
            console.log('testing advertiser app');
        },
        defaultPage:'login',
        renderPage:function(pageId, params){
            //baseApp.log(arguments);
            if(!pageId){
                pageId = this.defaultPage
            }

            if(baseApp.pageView){
                baseApp.pageView.remove();
            }

            require(['apps/user/pages/'+pageId],function(Page){

                var view = new Page.View({
                    model:new Page.Model(params)
                })
                var el = $(baseApp.appBody);
                el.empty();
                el.html(view.render().el);
                baseApp.pageView = view;
            })

        }
    });


    dataLoader.define('userProfile',{
        url:'http://api.randomuser.me/?seed=goldenMeercat',
        parser:function(data){
            return data.results[0].user;
        }
    })


    return app;

});