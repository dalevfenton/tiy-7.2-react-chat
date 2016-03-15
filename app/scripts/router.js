var Backbone = require('backbone');
var $ = require('jquery');

var models = require('./models/models');
var chats = new models.ChatCollection();

var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  initialize: function(){
  },
  index: function(){
    //setup index page here
    console.log('index called');
    chats.fetch().done(function(){
      console.log(chats);
    });
  }
});

module.exports = new Router();
