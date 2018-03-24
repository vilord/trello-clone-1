import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '.';

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('actions', () => {
  it('Should create an action to request posts', () => {
    const subreddit = 'programming';

    const expectedAction = {
      type: actions.REQUEST_POSTS,
      subreddit,
    };

    expect(actions.requestPosts('programming')).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should fetch posts', () => {
    const subreddit = 'programming';
    fetchMock.get(`https://www.reddit.com/r/${subreddit}.json`, {
      body: {
        subreddit,
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.REQUEST_POSTS, subreddit },
      {
        type: actions.RECEIVE_POSTS,
        subreddit,
        data: { subreddit },
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.fetchPosts(subreddit)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
