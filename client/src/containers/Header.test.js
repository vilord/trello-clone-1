import React from 'react';
import { Header } from './Header';
import { shallow } from 'enzyme';

describe('Header Component', () => {
  beforeAll(() => {
    console.error = error => {
      throw new Error(error);
    };
  });

  let component;
  const minProps = {
    showBoardsExplorer: jest.fn(),
    showCreateMenu: jest.fn(),
    showNotifications: jest.fn(),
    showUserMenu: jest.fn(),
  };
  beforeEach(() => {
    component = shallow(<Header {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it('calls showBoardsExplorer when Boards button is clicked', () => {
    expect(minProps.showBoardsExplorer).not.toHaveBeenCalled();
    component
      .find('ButtonIcon')
      .first()
      .simulate('click');
    expect(minProps.showBoardsExplorer).toHaveBeenCalled();
  });

  it('calls showCreateMenu when Create ButtonIcons is clicked', () => {
    expect(minProps.showCreateMenu).not.toHaveBeenCalled();
    component
      .find('ButtonIcon')
      .at(1)
      .simulate('click');
    expect(minProps.showCreateMenu).toHaveBeenCalled();
  });

  it('calls showNotifications when Notifications ButtonIcons is clicked', () => {
    expect(minProps.showNotifications).not.toHaveBeenCalled();
    component
      .find('ButtonIcon')
      .last()
      .simulate('click');
    expect(minProps.showNotifications).toHaveBeenCalled();
  });

  it('calls showUserMenu when Notifications ButtonIcons is clicked', () => {
    expect(minProps.showUserMenu).not.toHaveBeenCalled();
    component
      .find('Image')
      .simulate('click');
    expect(minProps.showUserMenu).toHaveBeenCalled();
  });

  it('sets props.avatar as the image for the Avatar', () => {
    const props = { avatar: 'http://example.com/avatar' };
    component.setProps(props);
    expect(component.find('Image').prop('src')).toBe(props.avatar);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
