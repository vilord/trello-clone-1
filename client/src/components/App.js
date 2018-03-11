import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleShow, fetchPosts } from '../actions';

export class App extends Component {

  componentWillMount() {
    const { fetchPosts } = this.props;
    fetchPosts('programming');
  }

  render() {
    const { subreddit, toggleShow, show, isFetching } = this.props;

    return (
      <div className="App">
        <input type="button" onClick={toggleShow} value="Click Me" />
        {show ? <p>Showing</p> : null}
        <p>{isFetching ? 'Fetching' : subreddit}</p>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  subreddit: PropTypes.string,
  toggleShow: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ show, isFetching, data, subreddit }) => ({
  data,
  isFetching,
  show,
  subreddit,
});

const mapDispatchToProps = dispatch => ({
  toggleShow: () => {
    dispatch(toggleShow);
  },
  fetchPosts: subreddit => {
    dispatch(fetchPosts(subreddit));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
