export const INFO_REQ = 'INFO_REQ';
export const TOGGLE_SHOW = 'TOGGLE_SHOW';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const toggleShow = {
  type: TOGGLE_SHOW,
};

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit,
});

export const receivePosts = (subreddit, data) => ({
  type: RECEIVE_POSTS,
  subreddit,
  data,
});

/**
 * Async Actions
 */
export const fetchPosts = subreddit => {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error),
      )
      .then(data => dispatch(receivePosts(subreddit, data)));
  };
};
