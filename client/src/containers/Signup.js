import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUiError, resetUiError } from '../actions/ui';
import { signupUser } from '../actions/user';
import { Link } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import * as errors from '../constants/errors';

import './Signup.css';
import gLogo from '../assets/G-logo.svg';

// TODO: Placeholder random fictional character API.
// TODO: Add sending Spinner.
export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };

    // Bidings
    this.verifyEmail = this.verifyEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  verifyEmail() {
    const { email } = this.state;
    const { emailError, setEmailError, resetError } = this.props;
    if (email && !isEmail(email)) {
      setEmailError();
    } else if (emailError) {
      resetError();
    }
  }

  handleChange(e, { name, value }) {
    const { resetError, emailError, passwordError } = this.props;
    if (name === 'email' && emailError) {
      resetError();
    } else if (name === 'password' && passwordError) {
      resetError();
    }
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { signupUser, history, setPasswordError } = this.props;
    const newUser = { ...this.state };
    if (newUser.password.length < 8) {
      return setPasswordError();
    }
    signupUser(newUser, history);
  }

  render() {
    const { name, email, password } = this.state;
    const {
      header,
      message,
      emailError,
      passwordError,
      userError,
      sending,
    } = this.props;

    const signupDisabled =
      !name || !email || !password || emailError || sending;

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
          error={emailError || passwordError || userError}
        >
          <Form.Input
            autoFocus
            label="Name"
            type="text"
            name="name"
            value={name}
            placeholder="e.g., Hermione Granger"
            onChange={this.handleChange}
            disabled={sending}
          />
          <Form.Input
            label="Email"
            type="email"
            name="email"
            value={email}
            placeholder="e.g., hermioneg@example.com"
            onBlur={this.verifyEmail}
            onChange={this.handleChange}
            error={emailError || userError}
            disabled={sending}
          />
          <Form.Input
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="e.g., ••••••••••"
            onChange={this.handleChange}
            error={passwordError}
            disabled={sending}
          />
          <Message
            error
            header={header || 'Header'}
            content={message || 'Message'}
          />
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

Signup.propTypes = {
  header: PropTypes.string,
  message: PropTypes.string,
  emailError: PropTypes.bool,
  passwordError: PropTypes.bool,
  userError: PropTypes.bool,
  sending: PropTypes.bool,
  setEmailError: PropTypes.func.isRequired,
  setPasswordError: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  header: '',
  message: '',
  emailError: false,
  passwordError: false,
  userError: false,
  sending: false,
};

const mapStateToProps = state => {
  const { kind, header, message } = state.ui.error;
  const emailError = kind === errors.invalidEmail.kind;
  const passwordError = kind === errors.shortPassword.kind;
  const userError = kind === errors.userExists.kind;
  return {
    header,
    message,
    emailError,
    passwordError,
    userError,
    sending: state.ui.fetching.signup,
  };
};

const mapDispatchToProps = dispatch => ({
  setEmailError: () => dispatch(setUiError(errors.invalidEmail)),
  setPasswordError: () => dispatch(setUiError(errors.shortPassword)),
  resetError: () => dispatch(resetUiError()),
  signupUser: (newUser, history) => dispatch(signupUser(newUser, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
