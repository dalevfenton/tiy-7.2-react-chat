var React = require('react');

var Login = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      email: ''
    };
  },
  handleName: function(e){
    this.setState({
      username: e.target.value.toLowerCase()
    });
  },
  handleEmail: function(e){
    this.setState({
      email: e.target.value
    });
  },
  handleSubmit: function(e){
    e.preventDefault();
    var username = this.state.username;
    var email = this.state.email;
    // this.props.collection.create({ username: username, email: email }, {wait: true});
    this.setState({ username: '', email:''});
    this.props.returnLogin(username, email);
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div id="login-form">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username... Pick Anything or Be Anyone!"
                value={this.state.username}
                onChange={this.handleName}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.handleEmail}
               />
              <button className="btn-success" type="submit" name="submit">
                <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                Login To Chat!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
