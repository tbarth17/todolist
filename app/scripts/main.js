// var listItems = [
//   {todo: 'finish homework'},
//   {todo: 'some other crap'},
//   {todo: 'more crap'}
// ];

$.ajaxPrefilter( function(options, originalOptions, jqXHR) {
  options.url = 'http://tiny-pizza-server.herokuapp.com/collections' + options.url;
});

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

var TodoCollection = Backbone.Collection.extend({
  url: '/tbarthtodos'
});

var TodoItem = Backbone.Model.extend({
  rootUrl: '/tbarthtodos'
});

var ListView = Backbone.View.extend({

  tagName: 'ul',

  className: 'listParent',

  render: function(){
    $('body').append(this.el);
  }

});

var listView = new ListView();
      listView.render();

var ItemView = ListView.extend({

    el: '.listParent',

    render: function(){
      var that = this;
      var todoCollection = new TodoCollection();
      todoCollection.fetch({
        success: function (todoCollection) {
          var template = _.template($('#todo-list-template').html(), {todoCollection: todoCollection.models});
          that.$el.html(template);
        }
      });
    },

      events: {
        'submit .addTodo': 'saveTodo'
      },

      saveTodo: function(ev) {
        var todoDetails = $(ev.currentTarget).serializeObject();
        console.log(todoDetails);
        return false;
      }


});


var itemView = new ItemView();
      itemView.render();



// _.each(listItems, function(items){
//   var itemView = new ItemView(items);
//   itemView.render();
// });
