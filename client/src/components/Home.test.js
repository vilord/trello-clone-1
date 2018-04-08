import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

describe('Home Component', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

  let minProps;
  let component;
  beforeEach(() => {
    minProps = {
      boards: [
        {
          id: '',
          title: 'Trello Clone',
          favorite: false,
          theme: {
            color: 'blue',
            picture: '',
          },
        },
      ],
    };
    component = shallow(<Home {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it("doesn't have Starred Boards when there's no favorites", () => {
    expect(
      component
        .find('BoardCollection')
        .someWhere(x => x.prop('title') === 'Starred Boards'),
    ).toBe(false);
  });

  it('has Starred Boards when favorites', () => {
    component.setProps({
      boards: [
        {
          ...minProps.boards[0],
          favorite: true,
        },
      ],
    });
    expect(
      component
        .find('BoardCollection')
        .someWhere(x => x.prop('title') === 'Starred Boards'),
    ).toBe(true);
  });

  it('matches', () => {
    expect(component).toMatchSnapshot();
  });
});
