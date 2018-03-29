import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConnectedApp, { App } from './App';
import { fetchPosts } from '../actions';

describe('App Shallow Render', () => {
  let wrapper;

  const value = 'Showing';

  beforeEach(() => {
    wrapper = shallow(
      <App
        data={{}}
        isFetching={false}
        show={true}
        subreddit=""
        toggleShow={jest.fn()}
        fetchPosts={jest.fn()}
      />,
    );
  });

  it('Renders', () => {
    expect(wrapper.length).toEqual(1);
  });

  it("Shows 'p' when show prop is true.", () => {
    expect(
      wrapper
        .find('p')
        .first()
        .text(),
    ).toEqual(value);
  });
});

describe('Redux Connected App', () => {
  const initialState = {
    show: false,
    isFetching: false,
    subreddit: '',
    data: {},
  };

  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedApp store={store} />);
  });

  it('+++ render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  it('+++ check Prop matches with initialState', () => {
    expect(container.prop('show')).toEqual(initialState.show);
    expect(container.prop('isFetching')).toEqual(initialState.isFetching);
    expect(container.prop('subreddit')).toEqual(initialState.subreddit);
  });
});

describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    show: false,
    isFetching: false,
    subreddit: '',
    data: {},
    onToggleClick: jest.fn(),
    getInfo: jest.fn(),
  };

  const middleware = [thunk];
  const mockStore = configureStore(middleware);
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>,
    );
  });

  it('+++ render the connected(SMART) component', () => {
    expect(wrapper.find(ConnectedApp).length).toEqual(1);
  });

  it('+++ check Prop matches with initialState', () => {
    expect(wrapper.find(App).prop('show')).toEqual(initialState.show);
  });

  it('+++ check action on dispatching ', () => {
    return store.dispatch(fetchPosts('programming')).then(() => {
      const actions = store.getActions();
      expect(actions[2].type).toEqual('RECEIVE_POSTS');
    });
  });
});

// Snapshot for App React Component
describe('>>>H O M E --- Snapshot', () => {
  it('+++capturing Snapshot of Home', () => {
    const renderedValue = renderer
      .create(
        <App
          data={{}}
          isFetching={false}
          show={true}
          subreddit=""
          toggleShow={jest.fn()}
          fetchPosts={jest.fn()}
        />,
      )
      .toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
