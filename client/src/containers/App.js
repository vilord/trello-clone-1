import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getUserSession } from '../actions/user';
import {
  showBoardsExplorer,
  showCreateMenu,
  showNotifications,
  showUserMenu,
} from '../actions/ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Header from '../components/Header';
import Board from './Board';

import './App.css';

export class App extends Component {
  componentDidMount() {
    const { getSession, history, user } = this.props;
    if (!user.email) {
      getSession(history);
    }
  }

  render() {
    const {
      user,
      fetching,
      showBoardsExplorer,
      showCreateMenu,
      showNotifications,
      showUserMenu,
    } = this.props;

    const Fetching = <FontAwesomeIcon icon="cog" size="5x" spin />;

    const App = (
      <div className="App">
        <Header
          avatar={user.avatar}
          showBoardsExplorer={showBoardsExplorer}
          showCreateMenu={showCreateMenu}
          showNotifications={showNotifications}
          showUserMenu={showUserMenu}
        />
        <Route path="/b/" component={Board} />
      </div>
    );

    return fetching ? Fetching : App;
  }
}

App.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    avatar: PropTypes.string,
  }),
  fetching: PropTypes.bool.isRequired,
  getSession: PropTypes.func.isRequired,
  showBoardsExplorer: PropTypes.func.isRequired,
  showCreateMenu: PropTypes.func.isRequired,
  showNotifications: PropTypes.func.isRequired,
  showUserMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  fetching: state.ui.fetching.login,
});

const mapDispatchToProps = dispatch => ({
  getSession: history => dispatch(getUserSession(history)),
  showBoardsExplorer: () => dispatch(showBoardsExplorer()),
  showCreateMenu: () => dispatch(showCreateMenu()),
  showNotifications: () => dispatch(showNotifications()),
  showUserMenu: () => dispatch(showUserMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
