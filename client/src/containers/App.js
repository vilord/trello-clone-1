import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserSession } from '../actions/user';

export class App extends Component {
  componentDidMount() {
    const { getSession, history } = this.props;
    getSession(history);
  }

  render() {
    const {isFetching, user } = this.props;

    const Fetching = <div>Fetching</div>;

    const App = (<div className="App">{ JSON.stringify(user) }</div>);

    return isFetching ? Fetching : App;
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isFetching: state.ui.isFetching,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getSession: history => {
    dispatch(getUserSession(history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
