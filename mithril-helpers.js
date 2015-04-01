// Generated by LiveScript 1.2.0
var toString$ = {}.toString;
(function(){
  var customAtts, mithril;
  customAtts = {
    onenter: function(cb){
      this.config = monkeypatch(this.config, configInit(function(it){
        return it.addEventListener('keyup', function(e){
          if (e.keyCode === 13) {
            cb();
            return m.redraw();
          }
        });
      }));
    },
    onescape: function(cb){
      this.config = monkeypatch(this.config, configInit(function(it){
        return it.addEventListener('keyup', function(e){
          if (e.keyCode === 27) {
            cb();
            return m.redraw();
          }
        });
      }));
    },
    value: function(prop){
      if (typeof prop === 'function') {
        this.value = prop();
        this.config = monkeypatch(this.config, configInit(function(it){
          return it.addEventListener('input', multi(m.withAttr('value', prop), function(){
            if (prop.redraw !== false) {
              m.redraw();
            }
          }));
        }));
      }
    },
    checked: function(prop){
      if (typeof prop === 'function') {
        this.checked = prop();
        this.config = monkeypatch(this.config, configInit(function(it){
          return it.addEventListener('click', multi(m.withAttr('checked', prop), function(){
            if (prop.redraw !== false) {
              m.redraw();
            }
          }));
        }));
      }
    },
    'class': function(obj){
      var classes, res$, key, value;
      if (toString$.call(obj).slice(8, -1) === 'Object') {
        res$ = [];
        for (key in obj) {
          value = obj[key];
          if (value) {
            res$.push(key);
          }
        }
        classes = res$;
        this['class'] = classes.join(' ');
      }
    }
  };
  mithril = m;
  window.m = function(selector, atts, children){
    var key, att, that;
    if (toString$.call(atts).slice(8, -1) === 'Object') {
      for (key in atts) {
        att = atts[key];
        if (that = customAtts[key]) {
          that.call(atts, att);
        }
      }
    }
    return mithril(selector, atts, children);
  };
  m.__proto__ = mithril;
  window.configInit = function(f){
    return function(ele, init){
      if (!init) {
        return f.apply(this, arguments);
      }
    };
  };
  function monkeypatch(n,t){return function(){var o,u;return"function"==typeof n&&(o=n.apply(this,arguments)),"function"==typeof t&&(u=t.apply(this,arguments)),o===!1||u===!1?!1:void 0}}
  window.multi=function(){var n=Array.prototype.slice;return function(){var t=n.call(arguments);return function(){var r=n.call(arguments),a=this;t.map(function(n){n instanceof Function&&n.apply(a,r)})}}}();
})();