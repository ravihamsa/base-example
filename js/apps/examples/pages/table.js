/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'widgets/table', './examplePage'], function (Base, Table, ExamplePage) {

    var baseApp = Base.app;


    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func:extendedTable,
                title:'Extended Table'
            },
            {
                func:simpleTable,
                title:'Basic Table'
            }

        ]
    })


    function simpleTable(previewEl, consoleEl) {
        //starts here

        var arr = getTableData(123);

        var columns = _.map(_.keys(arr[0]),function(key){
            var obj= {key:key}
            if(key==='amount'){
                obj.formatter = 'currency'
                obj.align = 'right';
            }

            if(key==='invoice'){
                obj.formatter = 'invoiceLink'
                obj.renderHTML = true;
            }
            return obj;
        });

        baseApp.setFormatter('invoiceLink', function(value, obj){
            return '<a href="#download/'+obj.transaction_id+'" class="action">download</a>';
        })



        var coll = new Table.RowCollection(arr);
        coll.setConfigs({paginated:true, page:1, perPage:25});
        coll.addFilter({column: 'mode', expr: 'startsWith', value: 'pay'})

        var tableModel = new Table.Model();
        coll.setConfig('sortKey', 'date');

        var view = new Table.View({
            columns: columns,
            rowCollection: coll,
            model: tableModel
        })

        view.render();

        //ends

        view.$el.appendTo(previewEl);
    }


    function extendedTable(previewEl, consoleEl) {
        //starts here

        var arr = getTableData(123);

        var columns = _.map(_.keys(arr[0]),function(key){
            var obj= {key:key}
            if(key==='amount'){
                obj.formatter = 'currency'
                obj.align = 'right';
            }

            if(key==='invoice'){
                obj.formatter = 'invoiceLink'
                obj.renderHTML = true;
            }
            return obj;
        });

        baseApp.setFormatter('invoiceLink', function(value, obj){
            return '<a href="#download/'+obj.transaction_id+'" class="action">download</a>';
        })



        var coll = new Table.RowCollection(arr, {config:{paginated:true, page:1, perPage:5}});

        //coll.addFilter({column: 'mode', expr: 'startsWith', value: 'pay'})

        var tableModel = new Table.Model();
        coll.setConfig('sortKey', 'date');


        var ExtendedTable = Table.View.extend({
            template: '<div class="table-header"></div> <table class="row-list"></table><div class="table-footer"> <a href="#nextPage" class="action">Next Page</a> <a href="#prevPage" class="action">Prev Page</a></div>',
            actionHandler:function(action){
                var coll = this.getOption('rowCollection');
                switch(action){
                    case 'nextPage':
                        coll.nextPage();
                        break;
                    case 'prevPage':
                        coll.prevPage();
                        break;
                }
                console.log(action);
            }
        })


        var view = new ExtendedTable({
            columns: columns,
            rowCollection: coll,
            model: tableModel

        })


        coll.on('config_change',function(){
            view.render();
        })

        view.render();

        //ends

        view.$el.appendTo(previewEl);
    }


    function getTableData (recordCount){
        var modeOptions = ['From Earnings',
            'Credit Card',
            'PromoCode',
            'PayPall'
        ]

        var amountOptions = _.range(100,5000, 134);

        var commentOptions = ['Transferred to ABC', '']

        var getRandomItem = function(arr){
            return arr[Math.floor(Math.random()*arr.length)]
        }

        var arr = _.range(0,recordCount).map(function(index){


            return {
                date:  moment().subtract('days', index).format("MM-DD-YYYY"),
                mode:getRandomItem(modeOptions),
                amount:getRandomItem(amountOptions),
                transaction_id:hex_md5(new Date().getTime()),
                comment:getRandomItem(commentOptions),
                invoice:'',
                index:index
            }
        })

        return arr;
    }

    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    }

})
