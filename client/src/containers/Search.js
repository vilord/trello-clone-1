import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Icon } from 'semantic-ui-react';
import {
  focusHeaderSearch,
  blurHeaderSearch,
  setHeaderSearch,
} from '../actions/ui';

import './Search.css';

export const Search = ({
  search,
  focusHeaderSearch,
  blurHeaderSearch,
  setHeaderSearch,
  isFocused,
}) => (
  <Input
    className="Search"
    icon={
      <Icon
        name={isFocused ? 'close' : 'search'}
        flipped="horizontally"
        style={{
          color: isFocused ? '#999' : 'white',
        }}
      />
    }
    onFocus={focusHeaderSearch}
    onBlur={blurHeaderSearch}
    value={search}
    onChange={e => setHeaderSearch(e.target.value)}
    onKeyDown={e => (e.keyCode === 27 ? e.target.blur() : null)}
  />
);

Search.displayName='Search';

Search.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  setHeaderSearch: PropTypes.func.isRequired,
  focusHeaderSearch: PropTypes.func.isRequired,
  blurHeaderSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  search: state.ui.search,
  isFocused: state.ui.focus === 'search',
});

const mapDispatchToProps = dispatch => ({
  setHeaderSearch: term => dispatch(setHeaderSearch(term)),
  focusHeaderSearch: () => dispatch(focusHeaderSearch()),
  blurHeaderSearch: () => dispatch(blurHeaderSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
