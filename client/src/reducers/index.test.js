import reducer from '.';
import * as actions from '../actions';

describe('main reducer', () => {
  const initState = {
    show: false,
    isFetching: false,
    subreddit: '',
    data: {},
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle TOGGLE_SHOW', () => {
    let showState = Object.assign({ show: true }, initState);
    expect(reducer(undefined, actions.TOGGLE_SHOW)).toEqual(showState);
  });
});
