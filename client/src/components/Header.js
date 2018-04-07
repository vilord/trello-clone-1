import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import { Icon, Image } from 'semantic-ui-react';
import Search from '../containers/Search';
import ButtonIcon from '../components/ButtonIcon';

import './Header.css';

const Header = ({
  avatar,
  showBoardsExplorer,
  showCreateMenu,
  showNotifications,
  showUserMenu,
}) => (
  <div className="Header">
    <div className="Header-left">
      <Route
        path="/b"
        render={() => (
          <Link to="/">
            <ButtonIcon icon="mail forward" flipped />
          </Link>
        )}
      />
      <ButtonIcon icon="trello" label="Boards" onClick={showBoardsExplorer} />
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
      <Image src={avatar} avatar onClick={showUserMenu} />
    </div>
  </div>
);

Header.propTypes = {
  avatar: PropTypes.string,
  showBoardsExplorer: PropTypes.func.isRequired,
  showCreateMenu: PropTypes.func.isRequired,
  showNotifications: PropTypes.func.isRequired,
  showUserMenu: PropTypes.func.isRequired,
};

export default Header;
