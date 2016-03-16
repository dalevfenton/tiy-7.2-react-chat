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
      user: this.props.user,
      users: this.props.users,
      router: this.props.router,
      messages: this.props.messages
    };
  },
  logIn: function( username, email ){
    var newUser = this.state.users.create({ username: username, email: email, local: true });
    this.setState({user: newUser});
    Backbone.history.navigate('chat/', {trigger: true});
  },
  logOut: function(){
    this.state.users.get(this.state.user).destroy();
    this.setState({'user': null});
    Backbone.history.navigate('', {trigger: true});
  },
  scroll: function(){
    var objDiv = document.getElementById("chat-scroll");
    if(objDiv){
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  fetch: function(){
    console.log('refetching collections');
    console.log(this.state.user);
    console.log(this.state.users);
    if(this.state.user){
      this.state.user.keepActive();
    }
    this.state.users.cleanUp();
    this.state.messages.fetch();
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.intervals = [];
    this.state.router.on('route', this.callback);
    this.state.messages.on('update', this.callback);
    this.state.messages.on('update', this.scroll);
    this.state.users.on('update', this.callback);
  },
  componentDidMount: function(){
    this.setInterval(this.fetch, 5000); // Call a method on the mixin
  },
  componentWillUnmount: function(){
    this.intervals.forEach(clearInterval);
    this.state.router.off('route', this.callback);
    this.state.messages.off('add', this.callback);
    this.state.messages.off('update', this.scroll);
    this.state.users.off('add', this.callback);
  },
  render: function(){
    if (!this.state.user){
      return ( <Login returnLogin={this.logIn} /> );
    }else if (this.state.router.current === 'chat' || this.state.user ){
      return ( <Page
        doLogOut={this.logOut}
        messages={this.state.messages}
        users={this.state.users}
        user={this.state.user}
        /> );
    }else{
      console.log('nothing validated');
    }
  }
});

module.exports = InterfaceComponent;
