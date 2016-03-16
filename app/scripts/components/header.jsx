var React = require('react');

var Header = React.createClass({
  getInitialState: function(){
    return {
      roomName: 'Default Room',
      search: '',
      users: this.props.users,
      user: this.props.user
    }
  },
  handleSearch: function(e){
    this.setState({search: e.target.value });
  },
  handleSubmit: function(e){
    e.preventDefault();
    //implement later when our collection is properly hooked up
  },
  render: function(){
    return (
      <div id="title-bar" className="row">
        <div className="room-meta">
          <div className="room-name">{this.state.roomName}</div>
          <div className="room-users">{this.state.users.length} members</div>
        </div>
        <div className="room-meta-right">
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
          <div className="user-info">
            <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
            <span>{this.props.user.get('username')}</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
