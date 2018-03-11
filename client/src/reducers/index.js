import { TOGGLE_SHOW, REQUEST_POSTS, RECEIVE_POSTS } from '../actions';

const initState = {
  show: false,
  isFetching: false,
  subreddit: '',
  data: {},
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_SHOW:
      return {
        ...state,
        show: !state.show,
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        subreddit: action.subreddit,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
