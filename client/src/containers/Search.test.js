import React from 'react';
import { shallow } from 'enzyme';

import { Search } from './Search.js';

describe('Search Component', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

  let component;
  let minProps;
  beforeEach(() => {
    minProps = {
      search: '',
      isFocused: false,
      focusHeaderSearch: jest.fn(),
      blurHeaderSearch: jest.fn(),
      setHeaderSearch: jest.fn(),
    };

    component = shallow(<Search {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it('sets the value of the Input using props.search', () => {
    const search = 'something';
    component.setProps({ search });
    expect(component.find('Input').prop('value')).toEqual(search);
  });

  it('changes Input icon based on props.isFocused', () => {
    expect(component.find('Input').prop('icon').props.name).toBe('search');
    component.setProps({ isFocused: true });
    expect(component.find('Input').prop('icon').props.name).toBe('close');
  });

  it('changes color based on props.isFocused', () => {
    const color = component.find('Input').prop('icon').props.style.color;
    component.setProps({ isFocused: true });
    expect(component.find('Input').prop('icon').props.style.color).not.toEqual(color);
  })

  it('calls props.setHeaderSearch on Input change', () => {
    expect(minProps.setHeaderSearch).not.toHaveBeenCalled();
    component
      .find('Input')
      .simulate('change', { target: { value: 'something' } });
    expect(minProps.setHeaderSearch).toHaveBeenCalled();
  });

  it('calls props.focusHeaderSearch on Input focus', () => {
    expect(minProps.focusHeaderSearch).not.toHaveBeenCalled();
    component.find('Input').simulate('focus');
    expect(minProps.focusHeaderSearch).toHaveBeenCalled();
  });

  it('calls props.blurHeaderSearch on Input blur', () => {
    component.find('Input').simulate('focus');
    expect(minProps.blurHeaderSearch).not.toHaveBeenCalled();
    component.find('Input').simulate('blur');
    expect(minProps.blurHeaderSearch).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
