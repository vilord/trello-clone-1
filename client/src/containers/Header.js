import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { Icon, Image } from 'semantic-ui-react';
import Search from './Search';
import ButtonIcon from '../components/ButtonIcon';

import './Header.css';

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="Header-left">
          <Route
            path="/"
            render={() => (
              <Link to="/">
                <ButtonIcon icon="mail forward" flipped />
              </Link>
            )}
          />
          <ButtonIcon icon="trello" label="Boards" />
          <Search />
        </div>
        <div className="Header-title">
          <Link to="/">
            <Icon name="trello" size="large" />
            <h2>Trello</h2>
          </Link>
        </div>
        <div className="Header-right">
          <ButtonIcon icon="plus" />
          <ButtonIcon icon="bell" />
          <Image src={this.props.avatar} avatar />
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  avatar: PropTypes.string,
};

Header.propTypes = {};

const mapStateToProps = state => ({
  avatar: state.user.avatar,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
