/*
 * Copyright (c) 2012-2015 Netforce Co. Ltd.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

var TabItem=NFView.extend({
    _name: "tab_item",
    tagName: "li",
    events: {
        "click a": "onclick"
    },

    render: function() {
        if (this.options.active) {
            this.$el.addClass("active");
        }
        if (this.options.action) {
            var h=window.location.hash;
            var action1=qs_to_obj(h.substr(1));
            var action2={name:this.options.action};
            if (this.options.action_options) {
                var opts=qs_to_obj(this.options.action_options);
                _.extend(action2,opts);
            }
            if (_.isEqual(action1,action2)) {
                this.$el.addClass("active");
            }
        }
        NFView.prototype.render.call(this);
    },

    onclick: function(e) {
        if (e.ctrlKey) return;
        if (!this.options.action && !this.options.url) return;
        e.preventDefault();
        e.stopPropagation();
        if (this.options.action) {
            var action={name:this.options.action};
            if (this.options.action_options) {
                _.extend(action,qs_to_obj(this.options.action_options));
            }
            exec_action(action);
        } else if (this.options.url) {
            window.location=this.options.url;
        }
    }
});

TabItem.register();
