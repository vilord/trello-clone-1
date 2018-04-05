import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserSession } from '../actions/user';

import Header from './Header';

export class App extends Component {
  componentDidMount() {
    const { getSession, history, user } = this.props;
    if (!user.email) {
      getSession(history);
    }
  }

  render() {
    const { fetching } = this.props;
    const Fetching = <div>Fetching</div>;
    const App = (
      <div className="App">
        <Header />
      </div>
    );

    return fetching ? Fetching : App;
  }
}

App.propTypes = {
  getSession: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  fetching: state.ui.fetching.login,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getSession: history => {
    dispatch(getUserSession(history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
