// Third Party Libs
var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');

var dummyData = [{"_id":"56d3cae7d98b5603004af886","content":"aksdjfaksjdf","username":"","created_at":"2016-02-29T04:36:55.059Z"},{"_id":"56d3b68ca142d50300def801","username":"type","created_at":"Sun Feb 28 2016 22:09:26 GMT-0500 (EST)","message":"dddd"},{"_id":"56d3b68ba142d50300def800","username":"type","created_at":"Sun Feb 28 2016 22:09:26 GMT-0500 (EST)","message":"dddd"},{"_id":"56c3dea9a9089503004353ac","username":"gabe","created_at":"a few seconds ago","content":"nope"},{"_id":"56c3de98a9089503004353ab","username":"gabe","created_at":"a few seconds ago","content":"bub"},{"_id":"565df6f0d4d5a40300466400","message":"Is anybody still here?","username":"Zeus","createdAt":1448998640470},{"_id":"565c892fb0f8590300883bff","username":"guy in his car","message":"I was sitting outside of the swim meet.  It was raining. \r\n","created_at":1448904815076},{"_id":"56168c8883f2430300812af3","message":"Ugh, my life is so modern. ","username":"Rocko","created_at":1444318335351},{"_id":"56168ba783f2430300812af2","message":"Anybody want to play a game?","username":"Jigsaw","created_at":1444318110698},{"_id":"5616692083f2430300812adb","username":"Clarice Starling","message":"HEYUH HANNIBAL","createdAt":"2015-10-08T12:49:09.063Z"}];
// Data Model & Collection
var models = require('../models/models');
var chats = new models.ChatCollection( dummyData );
var users = new models.UserCollection();

var User = models.User;

//Other React Components
var Login = require('./login.jsx');
var Page = require('./page.jsx');


var InterfaceComponent = React.createClass({
  getInitialState: function(){
    return {
      currentUser: this.props.user
    };
  },
  logIn: function( username, email ){
    var newUser = this.props.users.create({ username: username, email: email });
    // console.log(newUser);
    this.setState({ currentUser: newUser });
    Backbone.history.navigate('chat/', {trigger: true});
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

    if (this.props.router.current === 'index' && !this.state.currentUser){
      console.log('rendering login component');
      return ( <Login returnLogin={this.logIn} /> );
    }else if (this.props.router.current === 'chat' || this.state.currentUser ){
      //need to rewrite Page Component to remove login,
      //do that when we get there
      return ( <Page messages={this.props.messages} users={this.props.users} user={this.props.user} /> );
    }
  }
});

module.exports = InterfaceComponent;
