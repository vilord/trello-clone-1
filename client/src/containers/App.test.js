import React from 'react';
import { shallow } from 'enzyme';
import initUserState from '../reducers/initUserState';

import { App } from './App';

describe('App Component', () => {
  let wrapper;
  let spy;
  let minProps;

  beforeEach(() => {
    minProps = {
      fetching: false,
      user: initUserState,
      getSession: jest.fn(),
      showBoardsExplorer: jest.fn(),
      showCreateMenu: jest.fn(),
      showNotifications: jest.fn(),
      showUserMenu: jest.fn(),
    };
    wrapper = shallow(<App {...minProps} />);
    spy = jest.spyOn(App.prototype, 'componentDidMount');
  });

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toEqual(1);
  });

  it('calls componentDidMount', () => {
    expect(spy).toHaveBeenCalled();
  });

  it('calls getSession', () => {
    expect(minProps.getSession).toHaveBeenCalled();
  });

  it('passes props.showBoardsExplorer to Header', () => {
    minProps.showBoardsExplorer();
    expect(wrapper.find('Header').prop('showBoardsExplorer')).toBe(
      minProps.showBoardsExplorer,
    );
  });

  it('passes props.showCreateMenu to Header', () => {
    minProps.showCreateMenu();
    expect(wrapper.find('Header').prop('showCreateMenu')).toBe(
      minProps.showCreateMenu,
    );
  });

  it('passes props.showNotifications to Header', () => {
    minProps.showNotifications();
    expect(wrapper.find('Header').prop('showNotifications')).toBe(
      minProps.showNotifications,
    );
  });

  it('passes props.showUserMenu to Header', () => {
    minProps.showUserMenu();
    expect(wrapper.find('Header').prop('showUserMenu')).toBe(
      minProps.showUserMenu,
    );
  });

  it('does not has App className when fetching', () => {
    expect(wrapper.find('.App')).toHaveLength(1);
    wrapper.setProps({ fetching: true });
    expect(wrapper.find('.App')).toHaveLength(0);
  });
});
