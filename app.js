// Generated by LiveScript 1.2.0
var Item, controller, view;
Item = function(data){
  this.title = m.prop(data.title || '');
  this.title.redraw = false;
  this.completed = m.prop(data.completed || false);
  this.editing = m.prop(data.editing || false);
  return this.key = data.key || Date.now();
};
controller = function(){
  var this$ = this;
  this.items = _.map(function(it){
    return new Item(it);
  })(
  JSON.parse(localStorage.getItem('m')) || [{
    title: 'Smallest TodoMVC'
  }]);
  this.allCompleted = m.prop(false);
  this.title = m.prop('');
  this.create = function(){
    var that;
    if (that = this$.title().trim()) {
      this$.items.push(new Item({
        title: that
      }));
      return this$.title('');
    }
  };
  this.remove = function(it){
    return this$.items.splice(this$.items.indexOf(it), 1);
  };
  this.edit = function(it){
    it.editing(true);
    return it.oldTitle = it.title();
  };
  this.cancel = function(it){
    it.editing(false);
    return it.title(it.oldTitle);
  };
  this.save = function(it){
    it.editing(false);
    if (!it.title().trim()) {
      return this$.items.splice(this$.items.indexOf(it), 1);
    }
  };
  this.completeAll = function(it){
    var i$, ref$, len$, results$ = [];
    for (i$ = 0, len$ = (ref$ = this$.items).length; i$ < len$; ++i$) {
      it = ref$[i$];
      results$.push(it.completed(!this$.allCompleted()));
    }
    return results$;
  };
  this.clearCompleted = function(){
    return this$.items = _.reject(function(it){
      return it.completed();
    }, this$.items);
  };
  this.update = function(){
    var that;
    this$.completed = _.filter(function(it){
      return it.completed();
    }, this$.items);
    this$.active = _.reject(function(it){
      return it.completed();
    }, this$.items);
    this$.filtered = (that = m.route.param('filter'))
      ? this$[that]
      : this$.items;
    this$.allCompleted(this$.completed.length === this$.items.length);
    return localStorage.m = JSON.stringify(this$.items);
  };
};
view = function(c){
  c.update();
  return a(m('header#header', a(m('h1', 'todos'), m('input#new-todo[placeholder=What needs to be done?]', {
    onenter: c.create,
    value: c.title,
    autofocus: true
  }))), c.items.length ? m('section#main', a(m('input#toggle-all[type=checkbox]', {
    onclick: c.completeAll,
    checked: c.allCompleted()
  }), m('ul#todo-list', c.filtered.map(function(item){
    return m('li', {
      'class': {
        completed: item.completed(),
        editing: item.editing()
      },
      key: item.key
    }, a(m('.view', a(m('input.toggle[type=checkbox]', {
      checked: item.completed
    }), m('label', {
      ondblclick: function(){
        return c.edit(item);
      }
    }, item.title()), m('button.destroy', {
      onclick: function(){
        return c.remove(item);
      }
    }))), m('input.edit', {
      value: item.title,
      config: function(it){
        return it.select();
      },
      onblur: function(){
        return c.save(item);
      },
      onenter: function(){
        return c.save(item);
      },
      onescape: function(){
        return c.cancel(item);
      }
    })));
  })), m('footer#footer', a(m('span#todo-count', m('strong', c.active.length + " item" + (c.active.length === 1 ? '' : 's') + " left")), m('ul#filters', a(m('li', m('a', {
    href: '/',
    config: m.route,
    'class': {
      selected: !m.route.param('filter')
    }
  }, 'All')), m('li', m('a', {
    href: '/active',
    config: m.route,
    'class': {
      selected: m.route.param('filter') === 'active'
    }
  }, 'Active')), m('li', m('a', {
    href: '/completed',
    config: m.route,
    'class': {
      selected: m.route.param('filter') === 'completed'
    }
  }, 'Completed')))), c.completed.length ? m('button#clear-completed', {
    onclick: c.clearCompleted
  }, 'Clear completed') : void 8)))) : void 8);
};
m.route(document.getElementById('todoapp'), '/', {
  '/': {
    controller: controller,
    view: view
  },
  '/:filter': {
    controller: controller,
    view: view
  }
});