import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/user';
import isEmail from 'validator/lib/isEmail';

class LogIn extends Component {
  constructor(props) {
    super(props);

    // Bidings
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { loginUser, history } = this.props;

    const user = {
      password: this.password.value,
    };

    if (isEmail(this.emailOrUsername.value)) {
      user.email = this.emailOrUsername.value;
    } else {
      user.username = this.emailOrUsernamename.value;
    }

    loginUser(user, history);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>email(or username):</label>
            <input
              type="emailOrUsername"
              name="emailOrUsername"
              ref={emailOrUsername => (this.emailOrUsername = emailOrUsername)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              ref={password => (this.password = password)}
            />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: user => {
    dispatch(loginUser(user));
  },
});

export default connect(null, mapDispatchToProps)(LogIn);
