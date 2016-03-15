var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');
require('backbone-react-component');

var Header = require('./header.jsx');
var ChatArea = require('./chatarea.jsx');

var Page = React.createClass({
  render: function(){
      return (
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
});

module.exports = Page;
