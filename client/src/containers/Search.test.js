import React from 'react';
import { shallow } from 'enzyme';

import { Search } from './Search';

describe('Search Component', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

  const minProps = {
    focusHeaderSearch: jest.fn(),
    blurHeaderSearch: jest.fn(),
  };

  let component;
  beforeEach(() => {
    component = shallow(<Search {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
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
