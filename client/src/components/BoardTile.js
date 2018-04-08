import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './BoardTile.css';

const BoardTile = ({ id, title, theme, favorite }) => (
  <Link
    to={`b/${id}`}
    className="BoardTile"
    style={{
      backgroundImage: theme.picture ? `url(${theme.picture})` : null,
      backgroundColor: !theme.picture ? theme.color : null,
    }}
  >
    <h4>{title}</h4>
    <Icon
      name="empty star"
      style={{
        color: favorite ? '#e6c60d' : 'white',
        right: favorite ? 0 : null,
        width: favorite ? '30px' : null,
      }}
    />
    <span className="BoardTile-fade" />
  </Link>
);

BoardTile.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default BoardTile;
