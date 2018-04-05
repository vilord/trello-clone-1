import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  showBoardsExplorer,
  showCreateMenu,
  showNotifications,
  showUserMenu,
} from '../actions/ui';
import { Route, Link } from 'react-router-dom';

import { Icon, Image } from 'semantic-ui-react';
import Search from './Search';
import ButtonIcon from '../components/ButtonIcon';

import './Header.css';

export class Header extends Component {
  render() {
    const {
      showBoardsExplorer,
      showCreateMenu,
      showNotifications,
      showUserMenu,
    } = this.props;
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
          <ButtonIcon
            icon="trello"
            label="Boards"
            onClick={showBoardsExplorer}
          />
          <Search />
        </div>
        <div className="Header-title">
          <Link to="/">
            <Icon name="trello" size="large" />
            <h2>Trello</h2>
          </Link>
        </div>
        <div className="Header-right">
          <ButtonIcon icon="plus" onClick={showCreateMenu} />
          <ButtonIcon icon="bell" onClick={showNotifications} />
          <Image src={this.props.avatar} avatar onClick={showUserMenu} />
        </div>
      </div>
    );
  }
}

Header.defaultProps = {};

Header.propTypes = {
  showBoardsExplorer: PropTypes.func.isRequired,
  showCreateMenu: PropTypes.func.isRequired,
  showNotifications: PropTypes.func.isRequired,
  showUserMenu: PropTypes.func.isRequired,
  avatar: PropTypes.string,
};

const mapStateToProps = state => ({
  avatar: state.user.avatar,
});

const mapDispatchToProps = dispatch => ({
  showBoardsExplorer: () => dispatch(showBoardsExplorer()),
  showCreateMenu: () => dispatch(showCreateMenu()),
  showNotifications: () => dispatch(showNotifications()),
  showUserMenu: () => dispatch(showUserMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
