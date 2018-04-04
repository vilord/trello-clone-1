import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/user';
import { resetUiError } from '../actions/ui';
import { Link } from 'react-router-dom';
import { Form, Button, Message, Loader, Dimmer } from 'semantic-ui-react';
import * as errors from '../constants/errors';

import gLogo from '../assets/G-logo.svg';
import './Login.css';

// TODO: Add sending Spinner
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    // Bidings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    const { error, resetError } = this.props;
    if (error) {
      resetError();
    }
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { loginUser, history } = this.props;
    const userCredentials = { ...this.state };
    loginUser(userCredentials, history);
  }

  render() {
    const { email, password } = this.state;
    const { error, header, message, serverError, sending } = this.props;
    const loginDisabled = !email || !password || sending;
    const host =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
    const authURL = `${host}/auth/google`;

    return (
      <div className="Login">
        <h1>Login in to Trello</h1>
        <p>
          or <Link to="/signup">create an account</Link>
        </p>
        <Form
          className="Login-form"
          size="big"
          onSubmit={this.handleSubmit}
          error={error || serverError}
        >
          <Form.Input
            autoFocus
            type="text"
            placeholder="e.g., hermioneg@example.com"
            error={error}
            label={
              <label className="emailLabel">
                Email <span>(or username)</span>
              </label>
            }
            name="email"
            value={email}
            onChange={this.handleChange}
            disabled={sending}
          />
          <Form.Input
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="e.g., ••••••••••"
            onChange={this.handleChange}
            error={error}
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
            primary={!loginDisabled}
            disabled={loginDisabled}
          >
            Log In
          </Button>
        </Form>
        <a className="Login-google" href={authURL}>
          <img src={gLogo} alt="" />
          <p>Log in with Google</p>
        </a>
        <Dimmer active={sending} inverted>
          <Loader size="large" inverted content="Loading" />
        </Dimmer>
      </div>
    );
  }
}

Login.defaultProps = {
  error: false,
  serverError: false,
  header: '',
  message: '',
  sending: false,
};

Login.propTypes = {
  error: PropTypes.bool,
  serverError: PropTypes.bool,
  header: PropTypes.string,
  message: PropTypes.string,
  sending: PropTypes.bool,
  loginUser: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { kind, header, message } = state.ui.error;
  const error = kind === errors.wrongCredentials.kind;
  const serverError = kind === errors.serverError.kind;
  return {
    error,
    serverError,
    header,
    message,
    sending: state.ui.fetching.login,
  };
};

const mapDispatchToProps = dispatch => ({
  loginUser: (user, history) => dispatch(loginUser(user, history)),
  resetError: () => dispatch(resetUiError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
