import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser, loginUser } from '../actions/user';
import { Link } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

import './Signup.css';
import gLogo from '../assets/G-logo.svg';

// TODO: Placeholder random fictional character API.
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      errorHeader: 'Header',
      errorMessage: 'Message',
    };

    // Bidings
    this.verifyEmail = this.verifyEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userExists) {
      this.setState({
        errorHeader: 'User already exists!',
        errorMessage:
          'Email already in use by another account. You can use log in or use the forgot password page to reset your password.',
      });
    }
  }

  verifyEmail() {
    const { email } = this.state;
    this.setState({
      emailError: !isEmail(email),
      errorHeader: 'Verify your email!',
      errorMessage: "That doesn't look like an email address…",
    });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, email, password } = this.state;

    if (password.length < 8) {
      this.setState({
        passwordError: true,
        errorHeader: 'Password is to short!',
        errorMessage: 'Your password must be at least 8 characters.',
      });
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };
    const { signupUser, history } = this.props;
    signupUser(newUser, history);
  }

  render() {
    const {
      name,
      email,
      password,
      emailError,
      passwordError,
      errorHeader,
      errorMessage,
    } = this.state;
    const { userExists } = this.props;

    const signupDisabled = !name || !email || !password || emailError;

    const host =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
    const authURL = `${host}/auth/google`;

    return (
      <div className="Signup">
        <h1>Create an Account</h1>
        <p>
          or <Link to="/login">sign in to your account</Link>
        </p>
        <Form
          className="Signup-form"
          size="big"
          onSubmit={this.handleSubmit}
          error={emailError || passwordError || userExists}
        >
          <Form.Input
            autoFocus
            label="Name"
            type="text"
            name="name"
            value={name}
            placeholder="e.g., Hermione Granger"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="e.g., hermioneg@example.com"
            onBlur={this.verifyEmail}
            onChange={this.handleChange}
            error={emailError}
          />
          <Form.Input
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="e.g., ••••••••••"
            onChange={this.handleChange}
            error={passwordError}
          />
          <Message error header={errorHeader} content={errorMessage} />
          <Button
            className="Signup-button"
            size="large"
            type="submit"
            fluid
            primary={!signupDisabled}
            disabled={signupDisabled}
          >
            Create New Account
          </Button>
        </Form>
        <a className="Signup-google" href={authURL}>
          <img src={gLogo} alt="" />
          <p>Sign up with Google</p>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userExists: state.ui.userExists,
});

const mapDispatchToProps = dispatch => ({
  signupUser: newUser => {
    dispatch(signupUser(newUser));
  },
  loginUser: user => {
    dispatch(loginUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
