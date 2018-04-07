import React from 'react';
import { shallow, mount } from 'enzyme';
import initUserState from '../reducers/initUserState';

import { App } from './App';

describe('App Component', () => {
  const minProps = {
    fetching: false,
    user: initUserState,
    getSession: jest.fn(),
  };

  let wrapper;
  let spy;

  beforeEach(() => {
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

  it('does not has App className when fetching', () => {
    expect(wrapper.find('.App')).toHaveLength(1);
    wrapper.setProps({ fetching: true });
    expect(wrapper.find('.App')).toHaveLength(0);
  });
});
