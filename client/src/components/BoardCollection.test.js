import React from 'react';
import { shallow } from 'enzyme';

import BoardCollection from './BoardCollection';

describe('BoardCollection Component', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

  let component;
  let minProps;
  beforeEach(() => {
    minProps = {
      icon: 'star',
      title: 'Stared Boards',
      boards: [
        {
          id: 'y42LW46J9luq3Xq9XMly',
          title: 'Trello Clone',
          favorite: false,
          theme: {
            color: 'blue',
            picture: '',
          },
        },
      ],
    };
    component = shallow(<BoardCollection {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it('sets the Icon using props.icon', () => {
    expect(component.find('Icon').prop('name')).toBe(minProps.icon);
  });

  it('sets the collection Title using props.title', () => {
    expect(component.find('h3').text()).toBe(minProps.title);
  });

  it('creates BoardTile elements using props.boards', () => {
    expect(component.find('BoardTile')).toHaveLength(1);
    component.setProps({ boards: [] })
    expect(component.find('BoardTile')).toHaveLength(0);
  })

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
