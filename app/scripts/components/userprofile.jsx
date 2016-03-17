var React = require('react');
var ReactAddons = require('react-addons');
var Backbone = require('backbone');

var UserProfile = React.createClass({
  mixins: [ReactAddons.LinkedStateMixin],
  getInitialState: function(){
    return {
      username: this.props.user.get('username'),
      email: this.props.user.get('email'),
      gravUrl: this.props.user.get('gravUrl')
    };
  },
  returnToChat: function(e){
    e.preventDefault();
    Backbone.history.navigate('chat', {trigger: true});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var userObj = {
      username: this.state.username,
      email: this.state.email,
      gravUrl: this.state.gravUrl
    };
    this.props.updateUser(userObj);
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div id="login-form">
            <form onSubmit={this.handleSubmit}>
              <input
                name="username"
                type="text"
                valueLink={this.linkState('username')}
                placeholder="Username"
               />
              <input
                name="email"
                type="email"
                valueLink={this.linkState('email')}
                placeholder="Email Address"
              />
              <input
                name="gravUrl"
                type="url"
                valueLink={this.linkState('gravUrl')}
                placeholder="Avatar Url"
              />
                <button className="btn-success" type="submit" name="submit">
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  Update Your Profile
                </button>
                <button className="btn-default" onClick={this.returnToChat}>
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  Return to Chat
                </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserProfile;
