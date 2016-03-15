var React = require('react');

var Login = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div id="login-form">
            <form >
              <input type="text" name="username" value="" />
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
