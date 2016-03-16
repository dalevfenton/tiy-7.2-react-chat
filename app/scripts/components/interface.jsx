// Third Party Libs
var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

var dummyData = '';
// Data Model & Collection
var models = require('../models/models');
var chats = new models.ChatCollection();
var users = new models.UserCollection();

//Other React Components
var Login = require('./login.jsx');
var Page = require('./page.jsx');


var InterfaceComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      currentUser: this.props.user
    };
  },
  logIn: function( username, email ){
    var newUser = this.props.users.create({ username: username, email: email, local: true });
    this.setState({ currentUser: newUser });
    Backbone.history.navigate('chat/', {trigger: true});
  },
  logOut: function(){
    console.log('logOut called');
    this.setState({'currentUser': null});
    Backbone.history.navigate('', {trigger: true});
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.props.router.on('route', this.callback);
  },
  componentWillUnmount: function(){
    this.props.router.off('route', this.callback);
  },
  render: function(){
    console.log(localStorage);
    if (this.props.router.current === 'index' && !this.state.currentUser){
      console.log('rendering login component');
      return ( <Login returnLogin={this.logIn} /> );
    }else if (this.props.router.current === 'chat' || this.state.currentUser ){
      //need to rewrite Page Component to remove login,
      //do that when we get there
      return ( <Page doLogOut={this.logOut} messages={this.props.messages} users={this.props.users} user={this.state.currentUser} /> );
    }
  }
});

module.exports = InterfaceComponent;
