// Third Party Libs
var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
// require('backbone-react-component');

var dummyData = '';

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
    var newUser = this.props.users.create({ username: username, email: email, local: true });
    this.setState({ currentUser: newUser });
    Backbone.history.navigate('chat/', {trigger: true});
  },
  logOut: function(){
    // console.log('logOut called');
    this.setState({'currentUser': null});
    Backbone.history.navigate('', {trigger: true});
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.props.router.on('route', this.callback);
    this.props.messages.on('add', this.callback);
    this.props.users.on('add', this.callback);
  },
  componentWillUnmount: function(){
    this.props.router.off('route', this.callback);
    this.props.messages.off('add', this.callback);
    this.props.users.off('add', this.callback);
  },
  render: function(){
    if (!this.state.currentUser){
      return ( <Login returnLogin={this.logIn} /> );
    }else if (this.props.router.current === 'chat' || this.state.currentUser ){
      return ( <Page doLogOut={this.logOut} messages={this.props.messages} users={this.props.users} user={this.state.currentUser} /> );
    }else{
      console.log('nothing validated');
    }
  }
});

module.exports = InterfaceComponent;
