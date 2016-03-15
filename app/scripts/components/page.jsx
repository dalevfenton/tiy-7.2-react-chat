var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var Login = require('./login.jsx');
var Header = require('./header.jsx');
var ChatArea = require('./chatarea.jsx');

var Page = React.createClass({
  getInitialState: function(){
    return {
      username: ''
    };
  },

  render: function(){
    var page;
    if(this.state.username === '' ){
      page = (<Login />);
    }else{
      page = (
        <div>
          <div className="container-fluid title-bar">
            <div className="container">
              <Header />
            </div>
          </div>
          <div className="container chat-area">
            <div className="row">
              <ChatArea collection={this.props.collection} />
            </div>
          </div>
        </div>
      );
    }
    console.log(page);
    return (
      page
     );
  }
});

module.exports = Page;
