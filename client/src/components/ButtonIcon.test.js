import React from 'react';
import { shallow } from 'enzyme';

import ButtonIcon from './ButtonIcon';

describe('ButtonIcon component', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

  let component;
  beforeEach(() => {
    component = shallow(<ButtonIcon icon="" />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it('sets the icon based on props.icon', () => {
    const newProps = {
      icon: 'trello',
    };
    component.setProps(newProps);
    expect(component.find('Icon').prop('name')).toBe(newProps.icon);
  });

  it('sets the label based on props.label', () => {
    const newProps = {
      icon: 'trello',
      label: 'Board',
    };
    component.setProps(newProps);
    expect(
      component
        .find('Button')
        .children()
        .last()
        .text(),
    ).toBe(newProps.label);
  });
  
  it('flips the Icon when props.flipped is true', () => {
    component.setProps({ flipped: true });
    expect(component.find('Icon').prop('flipped')).toBe('horizontally');
  });

  it('calls a callback when clicked', () => {
    const onClickSpy = jest.fn();
    component.setProps({ onClick: onClickSpy });
    component.simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    component.setProps({
      icon: 'trello',
      label: 'Board',
    });
    expect(component).toMatchSnapshot();
  });
});
