import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import './BoardHeader.css';

const getStatusIcon = boardStatus => {
  if (boardStatus === 'Public') {
    return 'globe';
  } else if (boardStatus === 'Team') {
    return 'users';
  }
  return 'lock';
};

const BoardHeader = ({
  title,
  team,
  favorite,
  boardStatus,
  showRenameBoard,
  showAddToTeam,
  showVisibilityMenu,
  showBoardMenu,
}) => {
  const statusIcon = getStatusIcon(boardStatus);
  const favStyle = {
    color: '#f2d600',
    backgroundColor: '#0169a8',
  };
  return (
    <div className="BoardHeader">
      <div>
        <h3 onClick={showRenameBoard}>{title}</h3>
        <Icon name="empty star" style={favorite ? favStyle : null} />
        <p onClick={showAddToTeam}>{team}</p>
        <p onClick={showVisibilityMenu}>
          <Icon name={statusIcon} />
          {boardStatus}
        </p>
      </div>
      <p onClick={showBoardMenu}>
        <Icon name="ellipsis horizontal" />
        Show Menu
      </p>
    </div>
  );
};

BoardHeader.defaultProps = {
  team: 'Personal',
};

BoardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  team: PropTypes.string,
  favorite: PropTypes.bool,
  boardStatus: PropTypes.oneOf(['Public', 'Team', 'Private']).isRequired,
  showRenameBoard: PropTypes.func.isRequired,
  showAddToTeam: PropTypes.func.isRequired,
  showVisibilityMenu: PropTypes.func.isRequired,
  showBoardMenu: PropTypes.func.isRequired,
};

export default BoardHeader;
