//3rd Party Libs
var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');

//Backbone Elements
var Router = require('./router');
var models = require('./models/models');



//React Top Level Component Which Hooks Into the Backbone Router
var InterfaceComponent = require('./components/interface.jsx');

//Instantiate our collections
var users = new models.UserCollection();
var messages = new models.ChatCollection();

var user = null;
// localStorage.clear();
$(function(){
  var router = new Router();
  Backbone.history.start();
  users.fetch();
  messages.fetch();
  if ( localStorage.getItem('chatterUsername') &&
      localStorage.getItem('chatterEmail') ){

    var username = localStorage.getItem('chatterUsername');
    var email = localStorage.getItem('chatterEmail');
    user = users.create({ username: username, email: email, local: true });
  }
  ReactDOM.render(
    React.createElement(
      InterfaceComponent,
      { router: router,
        users: users,
        messages: messages,
        user: user
      }
    ),
    document.getElementById('app')
  );
});
