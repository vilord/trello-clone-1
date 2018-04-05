import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Icon } from 'semantic-ui-react';

import { focusHeaderSearch, blurHeaderSearch } from '../actions/ui';

import './Search.css';

export class Search extends Component {
  render() {
    const { focusHeaderSearch, blurHeaderSearch, focused } = this.props;
    return (
      <Input
        className="Search"
        icon={
          <Icon
            name={focused ? 'close' : 'search'}
            flipped="horizontally"
            style={{
              color: focused ? '#999' : 'white',
            }}
          />
        }
        onFocus={focusHeaderSearch}
        onBlur={blurHeaderSearch}
      />
    );
  }
}

Search.propTypes = {
  focusHeaderSearch: PropTypes.func.isRequired,
  blurHeaderSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  focused: state.ui.focus === 'search',
});

const mapDispatchToProps = dispatch => ({
  focusHeaderSearch: () => dispatch(focusHeaderSearch()),
  blurHeaderSearch: () => dispatch(blurHeaderSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
