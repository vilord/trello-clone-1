import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserSession } from '../actions/user';

// Components
import SignUp from './SignUp';
import LogIn from './LogIn';

export class App extends Component {
  componentDidMount() {
    const { getUserSession } = this.props;

    getUserSession();
  }

  render() {
    const { user } = this.props;

    const host =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
    const authURL = `${host}/auth/google`;

    return (
      <div className="App">
        {user.username ? <LogIn /> : <SignUp />}
        <a href={authURL}>Google</a>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  getUserSession: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  getUserSession: () => {
    dispatch(getUserSession());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
