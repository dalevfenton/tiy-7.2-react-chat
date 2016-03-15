var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');


var ChatMessage = React.createClass({
  render: function(){
    console.log(this.props.model);
    return (
      <div className="message-holder">
        <div className="message">
          <span className="user message-bubble">{this.props.model.get('content')}</span>
          <span className="message-sender">{this.props.model.get('username')}</span>
          <span className="message-time">{this.props.model.get('created_at')}</span>
        </div>
      </div>
    );
  }
})

var ChatArea = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    var messageList = this.props.collection.map( function(model){
      return (
        <ChatMessage model={model} key={model.get('_id')} />
      );
    });
    return (
      <div>
        <div className="chat-inner">
          {messageList}
        </div>
        <div className="chat-form">
          <form>
            <input type="text" name="new_message" />
            <button type="submit" name="button">
              <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
            </button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = ChatArea;
