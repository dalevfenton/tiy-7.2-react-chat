var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');


var ChatMessage = React.createClass({
  render: function(){
    return (
      <div className="message-holder">
        <div className="message">
          <div className="user">
            <span className="message-part message-bubble">{this.props.model.get('content')}</span>
            <span className="message-part message-sender">{this.props.model.get('username')}</span>
            <span className="message-part message-time">{this.props.model.get('created_at')}</span>
          </div>
        </div>
      </div>
    );
  }
})

var ChatForm = React.createClass({
  getInitialState: function(){
    return {
      chat: '',
    }
  },
  onInput: function(e){
    this.setState({
      chat: e.target.value
    })
  },
  onSubmit: function(e){
    e.preventDefault();
    var chat = this.state.chat;
    //TODO: setup user "login" to tag messages
    //username should be held in router at login and passed through component chain
    this.props.collection.create({
      content: chat,
      username: '',
      created_at: Date.now()
    });
    this.setState({ chat: '' });
    console.log(this.props.collection);
  },
  render: function(){
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="new_message"
          value={this.state.chat}
          onChange={this.onInput}
        />
        <button type="submit" name="button">
          <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
        </button>
      </form>
    );
  }
});

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
          <ChatForm collection={this.props.collection} />
        </div>
      </div>
    );
  }
});

module.exports = ChatArea;
