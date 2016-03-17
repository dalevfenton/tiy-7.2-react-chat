// Third Party Libs
var Backbone = require('backbone');


var Router = Backbone.Router.extend({
  routes: {
    '(/)': 'index',
    'chat': 'chat',
    'user-edit': 'userEdit'
  },
  initialize: function(){
  },
  index: function(){
    this.current = 'index';
  },
  chat: function(){
    this.current = 'chat';
  },
  userEdit: function(){
    this.current = 'userEdit';
  }
});

//Export To index.js to start Backbone history
module.exports = Router;
