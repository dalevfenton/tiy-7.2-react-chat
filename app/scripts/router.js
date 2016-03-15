// Third Party Libs
var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

// Data Model & Collection
var models = require('./models/models');
var chats = new models.ChatCollection();

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
    chats.fetch().done(function(){
      console.log(chats);
      ReactDOM.render(
        <Page collection={chats} />,
        document.getElementById('app')
      );
    });
  }
});

//Export To index.js to start Backbone history
module.exports = new Router();
