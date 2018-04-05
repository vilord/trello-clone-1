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
  beforeEach(() => {
    component = shallow(<Header />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  xit('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
