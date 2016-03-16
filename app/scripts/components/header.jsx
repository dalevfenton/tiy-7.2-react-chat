var React = require('react');
var Backbone = require('backbone');
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;

var Header = React.createClass({
  getInitialState: function(){
    return {
      roomName: 'Default Room',
      search: '',
      users: this.props.users,
      user: this.props.user,
      toggleForm: false
    }
  },
  handleSearch: function(e){
    this.setState({search: e.target.value });
  },
  handleDD: function(e, eventKey ){
    if(eventKey == 1){
      this.toggleEdit(e);
    }
    if(eventKey == 2){
      this.logOut(e);
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    //implement later when our collection is properly hooked up
  },
  toggleEdit: function(e){
    e.preventDefault();
    this.setState({toggleForm: !this.state.toggleForm});
    console.log(this.state.toggleForm);
  },
  logOut: function(e){
    console.log('inside Header logOut');
    e.preventDefault();
    this.props.user.logOut();
    this.props.doLogOut();
  },
  render: function(){
    // console.log(this.props.user);
    var ddTitle = function(){
      return (
        <div>
          <span className="user-avatar"><img src={this.props.user.get('gravUrl')} /></span>
          <span>{this.props.user.get('username')}</span>
        </div>
      );
    }.bind(this);
    return (
      <div id="title-bar" className="row">
        <div className="room-meta">
          <div className="room-name">{this.state.roomName}</div>
          <div className="room-users">{this.state.users.length} members</div>
        </div>
        <div className="room-meta-right">
          <DropdownButton onSelect={this.handleDD} bsStyle="default" title={ddTitle()} id="dropdown-size-medium">
            <MenuItem eventKey="1">Edit Profile</MenuItem>
            <MenuItem eventKey="2">Log Out</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
});

function holdontothis(){
  return (
    <div className="title-bar-search">
      <form onSubmit={this.handleSubmit} >
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={this.state.search}
          onChange={this.handleSearch}
        />
        <button
          type="submit"
          name="submit"
          value="Post"
        >
          <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
      </form>
    </div>
  );
}
module.exports = Header;
