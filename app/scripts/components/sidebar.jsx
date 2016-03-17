var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');

var SidebarUser = React.createClass({
  render: function(){
    return (
      <div className="sidebar-meta">
        <div className="user-avatar">
          <img src={this.props.user.get('gravUrl')} />
        </div>
        <div className="sidebar-username">
          <span className="user-handle">{this.props.user.get('username')}</span>
        </div>
      </div>
    );
  }
});

var Sidebar = React.createClass({
  render: function(){
    var userComps = this.props.users.map(function(user){
      var id;
      if(user.get('_id')){
        id = user.get('_id');
      }else{
        id = user.cid;
      }
      return <SidebarUser user={user} key={id} />
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
