var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');

var SidebarUser = React.createClass({
  render: function(){
    return (
      <div className="message-meta">
        <div className="user-avatar message-avatar">
          <img src={this.props.user.get('gravUrl')} />
        </div>
        <div className="message-meta-meta">
          <span className="user-handle">{this.props.user.get('username')}</span>
        </div>
      </div>
    );
  }
});

var Sidebar = React.createClass({
  render: function(){
    var userComps = this.props.users.map(function(user){
      return <SidebarUser user={user} key={user.get('_id')} />
    }.bind(this));
    return (
      <div id="sidebar">
        <div className="sidebar-inner">
          {userComps}
        </div>
      </div>
  );
  }
});

module.exports = Sidebar;
