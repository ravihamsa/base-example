define(function(require){

    var baseApp = require('common/app'),util = require('common/util'), landing = require('./pages/landing'), form = require('./pages/form'), baseView = require('./pages/baseView');

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

            require(['./pages/'+pageId],function(Page){
                var view = new Page.View({
                    model:new Page.Model(params)
                })
                var el = $(baseApp.appBody);
                el.empty();
                el.html(view.render().el);
                prettyPrint();
            })

        }
    });


    return app;

});