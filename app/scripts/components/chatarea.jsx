var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
require('backbone-react-component');

//utility function from stackoverflow user rob at:
//http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
var timeSince = function(date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }

    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    return interval + ' ' + intervalType + ' ago';
};

var ChatMessage = React.createClass({
  // mixins: [Backbone.React.Component.mixin],
  render: function(){
    var messageFrom;
    if(this.props.model.get('username') === this.props.user.get('username')){
      messageFrom = "user";
    }else{
      messageFrom = "other";
    }
    var postTime = timeSince(this.props.model.get('created_at'));
    return (
      <div className="message-holder">
        <div className="message">
          <div className={messageFrom}>
            <div className="message-meta">
              <div className="user-avatar message-avatar">
                <img src={this.props.user.get('gravUrl')} />
              </div>
              <div className="message-meta-meta">
                <span className="user-handle">{this.props.model.get('username')}</span>
                <span className="post-time">{postTime}</span>
                  <div className="message-meta-message">
                    {this.props.model.get('content')}
                  </div>
              </div>

            </div>
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
        <div id="chat-main" className="chat-inner">
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
