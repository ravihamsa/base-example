/**
 * Created with JetBrains WebStorm.
 * User: ravi.hamsa
 * Date: 10/08/13
 * Time: 12:35 AM
 * To change this template use File | Settings | File Templates.
 */

define(['common/app','common/bone','text!../templates/pages/examplePage.html'], function(app,Base, template){

    var exampleTemplateFunction = app.compileTemplate('<div id="{{func.name}}"> <h1>{{title}}</h1><p>{{desc}}</p><p style="text-align: right"><a href="#top" class="exampleLink">Top</a> </p><div class="bs-docs-code"><pre></pre></div><div class="preview bs-docs-demo"></div> <div class="output bs-docs-output "><pre></pre></div></div>');

    var PageView = Base.View.extend({
        template:template,
        events:{
            'click .exampleLink':'scrollToExample'
        },
        postRender:function(){
            var _this = this;
            var examples =  this.examples;

            var listEl = $('<ul class="nav nav-list"></ul>');
            var codeEl = $('<div></div>');
            this.$el.append(listEl);
            this.$el.append(codeEl);
            _.each(examples, function (example) {
                var func = example.func;


                var functionString = func.toString();
                var exampleName = func.name;
                var startIndex = functionString.indexOf('//') - 8;
                var lastIndex = functionString.lastIndexOf('//')
                listEl.append('<li><a class="exampleLink" href="#'+exampleName+'">'+example.title+' </a> </li>');
                codeEl.append(exampleTemplateFunction(example));
                var preEl = _this.$('#' + exampleName + ' .bs-docs-code pre');
                var previewEl = _this.$('#' + exampleName + ' .preview');
                var outputEl = _this.$('#' + exampleName + ' .output pre');
                preEl.addClass('prettyprint');
                preEl.addClass('lang-js');

                outputEl.addClass('prettyprint');
                outputEl.addClass('lang-js');

                //preEl.addClass('linenums');
                preEl.html(Handlebars.Utils.escapeExpression(functionString.substr(startIndex, lastIndex - startIndex)));
                func.call(_this, previewEl, outputEl);
            })
        },
        scrollToExample:function(e){
            e.preventDefault();
            var target = $(e.target);
            var exampleId =  target.attr('href');
            $('html, body').animate({
                scrollTop: this.$(exampleId).offset().top + 'px'
            }, 'slow');
        }
    })

    var PageModel = Base.Model.extend({

    });


    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        /*
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
        */
        return prettyPrintOne(json);
    }

    return {
        Model:PageModel,
        View:PageView,
        syntaxHighlight:syntaxHighlight
    }

})
