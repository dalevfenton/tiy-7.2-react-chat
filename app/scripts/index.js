var Backbone = require('backbone');
var $ = require('jquery');
var router = require('./router');
var models = require('./models/models');

// var chats = new models.ChatCollection();

$(function(){
  Backbone.history.start();
});
