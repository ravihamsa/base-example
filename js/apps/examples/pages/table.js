/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['base', 'base/dataLoader', 'widgets/table', 'widgets/table/pagination', 'apps/examples/pages/examplePage'], function(Base, dataLoader, Table, Pagination, ExamplePage) {

    var baseApp = Base.app;

    var baseUtil = Base.util;


    var PageView = ExamplePage.View.extend({
        examples: [{
                func: extendedTable,
                title: 'Extended Table'
            }, {
                func: serverPaginated,
                title: 'Server Paginated'
            }, {
                func: usingCollectionFetch,
                title: 'Server Paginated, Using collection fetch'
            }, {
                func: simpleTable,
                title: 'Basic Table'
            }, {
                func: simpleNestedTable,
                title: 'Basic Nested Table'
            }, {
                func: noDataRecords,
                title: 'No Data Records'
            }

        ]
    });


    function usingCollectionFetch(previewEl, consoleEl) {

        //starts

        var ExtendedTable = Table.View.extend({
            template: '<div class="table-header"></div> <table class="row-list"></table><div class="table-footer"> <a href="#nextPage" class="action">Next Page</a> <a href="#prevPage" class="action">Prev Page</a></div>',
            actionHandler: function(action) {
                var coll = this.getOption('rowCollection');
                switch (action) {
                    case 'nextPage':
                        coll.nextPage();
                        break;
                    case 'prevPage':
                        coll.prevPage();
                        break;
                }
            }
        });

        var columns = [{
            key: 'name',
            formatter: function(value) {
                return value.title + '. ' + value.first + ' ' + value.last;
            }
        }, {
            key: 'picture',
            renderHTML: true,
            formatter: function(value) {
                return '<img src="' + value + '" width="50" height="50" />';
            }
        }, {
            key: 'email'
        }, {
            key: 'phone'
        }];


        var randomUserParser = function(data) {

            if (data.errors) {
                return data;
            } else {
                this.setConfig('totalRecords', 100);
                return _.map(data.results, function(item) {
                    return item.user;
                });
            }
        };


        var coll = new(Table.RowCollection.extend({
            url: function() {
                var baseUrl = 'http://api.randomuser.me/';
                var params = baseUtil.objectToParams(this.getConfigs(), '&');
                return baseUrl + "?" + params;
            },
            parse: randomUserParser
        }))();


        coll.setConfigs({
            paginated: true,
            page: 1,
            results: 5,
            perPage: 5
        });



        var tableModel = new Table.Model();
        coll.setConfig('sortKey', 'date');


        var view = new ExtendedTable({
            columns: columns,
            rowCollection: coll,
            model: tableModel
        });

        view.render();

        //ends

        view.$el.appendTo(previewEl);

    }

    function serverPaginated(previewEl, consoleEl) {


        //starts

        var ExtendedTable = Table.View.extend({
            template: '<div class="table-header"></div> <table class="row-list"></table><div class="table-footer"> <a href="#nextPage" class="action">Next Page</a> <a href="#prevPage" class="action">Prev Page</a></div>',
            actionHandler: function(action) {
                var coll = this.getOption('rowCollection');
                switch (action) {
                    case 'nextPage':
                        coll.nextPage();
                        break;
                    case 'prevPage':
                        coll.prevPage();
                        break;
                }
            }
        });

        var columns = [{
            key: 'name',
            formatter: function(value) {
                return value.title + '. ' + value.first + ' ' + value.last;
            }
        }, {
            key: 'picture',
            renderHTML: true,
            formatter: function(value) {
                return '<img src="' + value + '" width="50" height="50" />';
            }
        }, {
            key: 'email'
        }, {
            key: 'phone'
        }];
        var coll = new(Table.RowCollection.extend({
            parse: function(resp) {
                this.setConfig('totalRecords', 101); // covering for missing total records
                return resp;
            }
        }))();

        coll.setConfigs({
            paginated: true,
            page: 1,
            perPage: 5,
            requestId: 'getUser'
        });
        coll.setConfig('sortKey', 'date');

        var randomUserParser = function(data) {
            if (data.errors) {
                return data;
            } else {
                return _.map(data.results, function(item) {
                    return item.user;
                });
            }
        };

        dataLoader.define('getUser', {
            type: 'GET',
            url: 'http://api.randomuser.me/',
            responseParser: randomUserParser,
            paramsParser: function(params) {
                params.results = params.perPage;
                return params;
            }
        });

        var tableModel = new Table.Model();


        var view = new ExtendedTable({
            columns: columns,
            rowCollection: coll,
            model: tableModel
        });

        view.render();

        //ends

        view.$el.appendTo(previewEl);

    }

    function simpleTable(previewEl, consoleEl) {
        //starts here

        var arr = getTableData(123);

        var columns = _.map(_.keys(arr[0]), function(key) {
            var obj = {
                key: key
            };
            if (key === 'amount') {
                obj.formatter = 'currency';
                obj.align = 'right';
            }

            if (key === 'invoice') {
                obj.formatter = 'invoiceLink';
                obj.renderHTML = true;
            }
            return obj;
        });

        baseApp.setFormatter('invoiceLink', function(value, obj) {
            return '<a href="#download/' + obj.transaction_id + '" class="action">download</a>';
        });


        var coll = new Table.RowCollection(arr);
        coll.setConfigs({
            paginated: true,
            page: 1,
            perPage: 5,
            isClientSide: true
        });
        coll.addFilter({
            column: 'mode',
            expr: 'endsWith',
            value: 'card'
        });


        var tableModel = new Table.Model();
        coll.setConfig('sortKey', 'date');

        var view = new Table.View({
            columns: columns,
            rowCollection: coll,
            model: tableModel,
            views: {
                pagination: {
                    View: Pagination.View,
                    rowCollection: coll,
                    parentEl: '.table-footer'
                }
            }
        });

        view.render();

        //ends

        view.$el.appendTo(previewEl);
    }
    function simpleNestedTable(previewEl, consoleEl) {
        //starts here

        var arr = getTableData(123);

        var columns = _.map(_.keys(arr[0]), function(key) {
            var obj = {
                key: key
            };
            if (key === 'amount') {
                obj.formatter = 'currency';
                obj.align = 'right';
            }

            if (key === 'invoice') {
                obj.formatter = 'invoiceLink';
                obj.renderHTML = true;
            }
            return obj;
        });

        baseApp.setFormatter('invoiceLink', function(value, obj) {
            return '<a href="#download/' + obj.transaction_id + '" class="action">download</a>';
        });


        var coll = new Table.RowCollection(arr);
        coll.setConfigs({
            paginated: false,
            page: 1,
            perPage: 5,
            isClientSide: true
        });

        var tableModel = new Table.Model();
        coll.setConfig('sortKey', 'date');

        var view = new Table.NestedView({
            columns: columns,
            rowCollection: coll,
            model: tableModel,
            groupBy:['mode','slot']
        });

        view.render();

        //ends

        view.$el.appendTo(previewEl);
    }

    function noDataRecords(previewEl, consoleEl) {
        //starts here

        var arr = getTableData(1);

        var columns = _.map(_.keys(arr[0]), function(key) {
            var obj = {
                key: key
            };
            if (key === 'amount') {
                obj.formatter = 'currency';
                obj.align = 'right';
            }

            if (key === 'invoice') {
                obj.formatter = 'invoiceLink';
                obj.renderHTML = true;
            }
            return obj;
        });

        baseApp.setFormatter('invoiceLink', function(value, obj) {
            return '<a href="#download/' + obj.transaction_id + '" class="action">download</a>';
        });


        var coll = new Table.RowCollection([]);
        coll.setConfigs({
            paginated: true,
            page: 1,
            perPage: 5
        });
        coll.addFilter({
            column: 'mode',
            expr: 'startsWith',
            value: 'pay'
        });


        var tableModel = new Table.Model();
        coll.setConfig('sortKey', 'date');

        var view = new Table.View({
            columns: columns,
            rowCollection: coll,
            model: tableModel,
            views: {
                pagination: {
                    View: Pagination.View,
                    rowCollection: coll,
                    parentEl: '.table-footer'
                }
            },
            noDataTemplate: '<div style="text-align: left; font-weight: bold; font-size: 30px;">No Records returned</div> '
        });

        view.render();

        //ends

        view.$el.appendTo(previewEl);
    }


    function extendedTable(previewEl, consoleEl) {
        //starts here

        var arr = getTableData(123);

        var columns = _.map(_.keys(arr[0]), function(key) {
            var obj = {
                key: key
            };
            if (key === 'amount') {
                obj.formatter = 'currency';
                obj.align = 'right';
            }

            if (key === 'invoice') {
                obj.formatter = 'invoiceLink';
                obj.renderHTML = true;
            }
            return obj;
        });

        baseApp.setFormatter('invoiceLink', function(value, obj) {
            return '<a href="#download/' + obj.transaction_id + '" class="action">download</a>';
        });

        columns.push({
            key: 'expand',
            renderHTML: true,
            formatter: function() {
                return '<a href="#expandRow" class="expand-row">Expand Row </a>';
            }
        });


        var coll = new Table.RowCollection(arr, {
            configs: {
                paginated: true,
                page: 1,
                perPage: 5,
                isClientSide: true
            }
        });
        coll.addFilter({
            column: 'mode',
            expr: 'startsWith',
            value: 'pay'
        });

        var tableModel = new Table.Model();
        coll.setConfig('sortKey', 'date');


        var DetailView = Base.View.extend({
            template: '<div style="white-space: normal; text-align:left;">{{stringify this}}</div>',

        });

        //reset totalRecords as per new config
        //coll.getProcessedRecords();

        var ExtendedTable = Table.View.extend({
            template: '<div class="table-header"></div> <table class="row-list"></table><div class="table-footer"> <a href="#nextPage" class="action">Next Page</a> <a href="#prevPage" class="action">Prev Page</a></div>',
            events: {
                'click .expand-row': function(e) {
                    e.preventDefault();
                    $(e.target).trigger('expandRow', e.target);
                }
            },
            actionHandler: function(action) {
                var coll = this.getOption('rowCollection');
                switch (action) {
                    case 'nextPage':
                        coll.nextPage();
                        break;
                    case 'prevPage':
                        coll.prevPage();
                        break;
                }
                console.log(action);
            }
        });


        var view = new ExtendedTable({
            columns: columns,
            rowCollection: coll,
            model: tableModel,
            ExpandedView: DetailView

        });


        view.render();

        //ends

        view.$el.appendTo(previewEl);
    }


    function getTableData(recordCount) {
        var modeOptions = ['From Earnings',
            'Credit Card',
            'PromoCode',
            'PayPall'
        ];

        var amountOptions = _.range(100, 5000, 134);

        var commentOptions = ['Transferred to ABC', ''];

        var getRandomItem = function(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        var arr = _.range(0, recordCount).map(function(index) {


            return {
                date: moment().subtract('days', index).format('MM-DD-YYYY'),
                mode: getRandomItem(modeOptions),
                amount: getRandomItem(amountOptions),
                slot:'slot'+ Math.floor(Math.random()*3),
                transaction_id: hex_md5(new Date().getTime()),
                comment: getRandomItem(commentOptions),
                invoice: '',
                index: index
            };
        });

        return arr;
    }

    var PageModel = Base.Model.extend({

    });


    return {
        Model: PageModel,
        View: PageView
    };

});
