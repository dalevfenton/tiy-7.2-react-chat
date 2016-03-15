// Third Party Libs
var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

var dummyData = [{"_id":"56d3cae7d98b5603004af886","content":"aksdjfaksjdf","username":"","created_at":"2016-02-29T04:36:55.059Z"},{"_id":"56d3b68ca142d50300def801","username":"type","created_at":"Sun Feb 28 2016 22:09:26 GMT-0500 (EST)","message":"dddd"},{"_id":"56d3b68ba142d50300def800","username":"type","created_at":"Sun Feb 28 2016 22:09:26 GMT-0500 (EST)","message":"dddd"},{"_id":"56c3dea9a9089503004353ac","username":"gabe","created_at":"a few seconds ago","content":"nope"},{"_id":"56c3de98a9089503004353ab","username":"gabe","created_at":"a few seconds ago","content":"bub"},{"_id":"565df6f0d4d5a40300466400","message":"Is anybody still here?","username":"Zeus","createdAt":1448998640470},{"_id":"565c892fb0f8590300883bff","username":"guy in his car","message":"I was sitting outside of the swim meet.  It was raining. \r\n","created_at":1448904815076},{"_id":"56168c8883f2430300812af3","message":"Ugh, my life is so modern. ","username":"Rocko","created_at":1444318335351},{"_id":"56168ba783f2430300812af2","message":"Anybody want to play a game?","username":"Jigsaw","created_at":1444318110698},{"_id":"5616692083f2430300812adb","username":"Clarice Starling","message":"HEYUH HANNIBAL","createdAt":"2015-10-08T12:49:09.063Z"}];
// Data Model & Collection
var models = require('./models/models');
var chats = new models.ChatCollection( dummyData );


// Top Level React Component
var Page = require('./components/page.jsx');

//Define Backbone Router
var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  initialize: function(){
  },
  index: function(){
    //setup index page here
    // chats.fetch().done(function(){
      console.log(chats);
      ReactDOM.render(
        <Page collection={chats} />,
        document.getElementById('app')
      );
    // });
  }
});

//Export To index.js to start Backbone history
module.exports = new Router();
