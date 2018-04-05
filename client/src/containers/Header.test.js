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

  it('sets props.avatar as the image for the Avatar', () => {
    const props = { avatar: 'http://example.com/avatar' };
    component.setProps(props);
    expect(component.find('Image').prop('src')).toBe(props.avatar);
  });

  xit('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
