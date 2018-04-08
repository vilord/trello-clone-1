import React from 'react';
import { shallow } from 'enzyme';

import BoardTile from './BoardTile';

describe('BoardTile Component', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

  let component;
  let minProps;
  beforeEach(() => {
    minProps = {
      id: 'y42LW46J9luq3Xq9XMly',
      title: 'Trello Clone',
      theme: {
        color: 'blue',
        picture: '',
      },
      favorite: false,
    };
    component = shallow(<BoardTile {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it('sets the Link address using the id', () => {
    expect(component.find('Link').prop('to')).toMatch(minProps.id);
  });

  it('sets the backgroundImage using props.theme.picture if available', () => {
    component.setProps({
      theme: {
        color: 'blue',
        picture: 'http://imgur.com/p/a13de',
      },
    });
    expect(component.find('Link').prop('style').backgroundImage).toMatch(
      minProps.theme.picture,
    );
  });

  it('sets the backgroundColor using props.theme.color if no picture', () => {
    expect(component.find('Link').prop('style').backgroundColor).toMatch(
      minProps.theme.color,
    );
  });

  it('sets changes the Icon star style using props.favorite', () => {
    const initStyle = component.find('Icon').prop('style');
    component.setProps({ favorite: true });
    expect(component.find('Icon').prop('style')).not.toEqual(initStyle);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
