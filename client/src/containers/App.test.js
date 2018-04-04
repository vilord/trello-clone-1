import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initUserState from '../reducers/initUserState';
import initUiState from '../reducers/initUiState';

import ConnectedApp, { App } from './App';

describe('App Component', () => {
  const minProps = {
    fetching: false,
    user: initUserState,
    getSession: jest.fn(),
  };

  describe('shallow', () => {
    let wrapper;
    let spy;

    beforeEach(() => {
      wrapper = shallow(<App {...minProps} />);
      spy = jest.spyOn(App.prototype, 'componentDidMount');
    })

    it('renders', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.length).toEqual(1);
    });

    it('has className App', () => {
      expect(wrapper.hasClass('App')).toBe(true);
    });

    it('calls componentDidMount', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('calls getSession', () => {
      expect(minProps.getSession).toHaveBeenCalled();
    })

    it('does not has App className when fetching', () => {
      expect(wrapper.hasClass('App')).toBe(true);
      wrapper.setProps({ fetching: true });
      expect(wrapper.hasClass('App')).toBe(false);
    });
  });

  describe('Shallow Connected App', () => {
    const initState = {
      user: initUserState,
      ui: initUiState,
    };

    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
      store = mockStore(initState);
      container = shallow(<ConnectedApp store={store} />);
    });

    it('+++ render the connected(SMART) component', () => {
      expect(container).toHaveLength(1);
    });

    it('+++ check Prop matches with initState', () => {
      expect(container.prop('fetching')).toEqual(initUiState.fetching.login);
      expect(container.prop('user')).toEqual(initState.user);
    });
  });

  xdescribe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
    const initState = {
      user: initUserState,
      ui: initUiState,
    };

    const middleware = [thunk];
    const mockStore = configureStore(middleware);
    let store, wrapper, spy;

    beforeEach(() => {
      store = mockStore(initState);
      wrapper = mount(
        <Provider store={store}>
          <ConnectedApp />
        </Provider>,
      );
      spy = jest.spyOn(App.prototype, 'componentDidMount');
    });

    it('+++ render the connected(SMART) component', () => {
      expect(wrapper.find(ConnectedApp)).toHaveLength(1);
    });

    it('calls componentDidMount', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('does not render app when fetching the user', () => {
      wrapper.setProps({ fetching: true });
      expect(wrapper.hasClass('App')).toBe(false);
    });

    it('+++ check Prop matches with initState', () => {
      expect(wrapper.find(App).prop('fetching')).toEqual(
        initUiState.fetching.login,
      );
    });

    // it('+++ check action on dispatching ', () => {
    //   return store.dispatch(fetchPosts('programming')).then(() => {
    //     const actions = store.getActions();
    //     expect(actions[2].type).toEqual('RECEIVE_POSTS');
    //   });
    // });
  });

  // Snapshot for App React Component
  describe('snapshot', () => {
    it('mathes snapshot', () => {
      const props = {
        fetching: false,
        user: initUserState,
        getSession: jest.fn(),
      };

      const renderedValue = renderer.create(<App {...props} />).toJSON();
      expect(renderedValue).toMatchSnapshot();
    });
  });
});
