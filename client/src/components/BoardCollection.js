import React from 'react';
import PropTypes from 'prop-types';
import BoardTile from './BoardTile';
import { Icon } from 'semantic-ui-react';

import './BoardCollection.css';

const BoardCollection = ({ icon, title, boards }) => (
  <div className="BoardCollection">
    <div>
      <Icon name={icon} size="large" />
      <h3>{title}</h3>
    </div>
    <div>
      {boards.map((board, i) => (
        <BoardTile key={`BoardTile-${i}`} {...board} />
      ))}
    </div>
  </div>
);

BoardCollection.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired,
      theme: PropTypes.shape({
        color: PropTypes.string.isRequired,
        picture: PropTypes.string,
      }).isRequired,
    }),
  ).isRequired,
};

export default BoardCollection;
