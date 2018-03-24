import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser, loginUser } from '../actions/user';

class SignUp extends Component {
  constructor(props) {
    super(props);

    // Bidings
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { signupUser, history } = this.props;

    const newUser = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };

    signupUser(newUser, history);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" ref={name => (this.name = name)} />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              ref={email => (this.email = email)}
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
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signupUser: newUser => {
    dispatch(signupUser(newUser));
  },
  loginUser: user => {
    dispatch(loginUser(user));
  },
});

export default connect(null, mapDispatchToProps)(SignUp);
