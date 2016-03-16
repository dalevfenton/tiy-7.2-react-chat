var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');

var Header = require('./header.jsx');
var ChatArea = require('./chatarea.jsx');
var Sidebar = require('./sidebar.jsx');

var Page = React.createClass({
  getInitialState: function(){
    return {};
  },
  render: function(){
    return (
      <div>
        <div className="container-fluid title-bar">
          <div className="container">
            <Header doLogOut={this.props.doLogOut} user={this.props.user} users={this.props.users}/>
          </div>
        </div>
        <div className="container chat-area">
          <div className="row">
            <ChatArea messages={this.props.messages} users={this.props.users} user={this.props.user}/>
            <Sidebar users={this.props.users} user={this.props.user} />
          </div>
        </div>
      </div>
     );
  }
});

module.exports = Page;
