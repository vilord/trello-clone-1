import React from 'react';
import PropTypes from 'prop-types';
import BoardCollection from '../components/BoardCollection';
import './Home.css';

const Home = ({ boards }) => {
  const hasFavorites = boards.some(x => x.favorite);
  const favoriteBoards = boards.filter(x => x.favorite);
  return (
    <div className="Home">
      {hasFavorites ? (
        <BoardCollection
          icon="empty star"
          title="Starred Boards"
          boards={favoriteBoards}
        />
      ) : null}
      <BoardCollection
        icon="user outline"
        title="Personal Boards"
        boards={boards}
      />
    </div>
  );
};

Home.displayName = 'Home';

Home.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      favorite: PropTypes.bool.isRequired,
      theme: PropTypes.object,
    }),
  ).isRequired,
};

export default Home;
