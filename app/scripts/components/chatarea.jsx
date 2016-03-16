var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');


var ChatMessage = React.createClass({
  // mixins: [Backbone.React.Component.mixin],
  render: function(){
    var messageFrom;
    if(this.props.model.get('username') === this.props.user.get('username')){
      messageFrom = "user";
    }else{
      messageFrom = "other";
    }
    return (
      <div className="message-holder">
        <div className="message">
          <div className={messageFrom}>
            <div className="user-avatar"><img src={this.props.user.get('gravUrl')} /></div>
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
    this.props.messages.create({
      content: chat,
      username: this.props.user.get('username'),
      created_at: Date.now()
    }, {wait: true});
    this.setState({ chat: '' });
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
    var messageList = this.props.messages.map( function(model){
      return (
        <ChatMessage user={this.props.user} model={model} key={model.get('_id')} />
      );
    }.bind(this));
    return (
      <div>
        <div className="chat-inner">
          {messageList}
        </div>
        <div className="chat-form">
          <ChatForm user={this.props.user} messages={this.props.messages} />
        </div>
      </div>
    );
  }
});

module.exports = ChatArea;
