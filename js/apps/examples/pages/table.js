/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'widgets/table', './examplePage'], function (Base, Table, ExamplePage) {

    var app = Base.app;


    var PageView = ExamplePage.View.extend({
        examples: [
            {
                func: simpleTable,
                title: 'Simple Table'
            }
        ]
    })


    function simpleTable(previewEl, consoleEl) {
        //starts here

        var arr = getTableData();

        var columns = _.map(_.keys(arr[0]),function(key){
            var obj= {key:key}
            if(key==='amount'){
                obj.formatter = 'currency'
                obj.align = 'right';
            }
            return obj;

        });

        var coll = new Table.RowCollection(arr);

        var tableModel = new Table.Model();
        tableModel.setConfig('sortKey', 'name');

        var view = new Table.View({
            columns: columns,
            rowCollection: coll,
            model: tableModel
        })

        view.render();

        //ends

        view.$el.appendTo(previewEl);
    }


    function getTableData (){
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

        var arr = _.range(0,10).map(function(index){


            return {
                date:  moment().subtract('days', index).format("MM-DD-YYYY"),
                mode:getRandomItem(modeOptions),
                amount:getRandomItem(amountOptions),
                transaction_id:hex_md5(new Date().getTime()),
                comment:getRandomItem(commentOptions),
                invoice:''
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
