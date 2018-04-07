import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  showRenameBoard,
  showAddToTeam,
  showVisibilityMenu,
  showBoardMenu,
} from '../actions/ui';

import BoardHeader from '../components/BoardHeader';
import './Board.css';

export class Board extends Component {
  render() {
    const {
      showRenameBoard,
      showAddToTeam,
      showVisibilityMenu,
      showBoardMenu,
    } = this.props;
    const headerProps = {
      showRenameBoard,
      showAddToTeam,
      showVisibilityMenu,
      showBoardMenu,
    };
    return (
      <div className="Board">
        <BoardHeader
          title="Trello Clone"
          boardStatus="Private"
          {...headerProps}
        />
      </div>
    );
  }
}

Board.propTypes = {
  showRenameBoard: PropTypes.func.isRequired,
  showAddToTeam: PropTypes.func.isRequired,
  showVisibilityMenu: PropTypes.func.isRequired,
  showBoardMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // Board title
  // Board team
});

const mapDispatchToProps = dispatch => ({
  showRenameBoard: () => dispatch(showRenameBoard()),
  showAddToTeam: () => dispatch(showAddToTeam()),
  showVisibilityMenu: () => dispatch(showVisibilityMenu()),
  showBoardMenu: () => dispatch(showBoardMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
