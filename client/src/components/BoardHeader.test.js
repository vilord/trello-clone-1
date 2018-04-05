import React from 'react';
import { shallow } from 'enzyme';

import BoardHeader from './BoardHeader';

describe('BoardHeader Component', () => {
  beforeAll(() => {
    console.error = err => {
      throw new Error(err);
    };
  });

  let component;
  let minProps;
  beforeEach(() => {
    minProps = {
      title: 'Trello Clone',
      boardStatus: 'Private',
      showRenameBoard: jest.fn(),
      showAddToTeam: jest.fn(),
      showVisibilityMenu: jest.fn(),
      showBoardMenu: jest.fn(),
    };
    component = shallow(<BoardHeader {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it('sets the Board title using props.title', () => {
    expect(component.find('h3').text()).toBe(minProps.title);
  });

  it('sets the Board team using props.team', () => {
    // Default value
    expect(
      component
        .find('p')
        .first()
        .text(),
    ).toBe('Personal');
    component.setProps({ team: 'Test Team' });
    expect(
      component
        .find('p')
        .first()
        .text(),
    ).toBe('Test Team');
  });

  it('sets the favorite style when props.favorite = true', () => {
    expect(
      component
        .find('Icon')
        .first()
        .prop('style'),
    ).toBeNull();

    component.setProps({ favorite: true });

    expect(
      component
        .find('Icon')
        .first()
        .prop('style'),
    ).not.toBeNull();
  });

  it('sets the text of the 2nd p element with props.boardStatus', () => {
    expect(
      component
        .find('p')
        .at(1)
        .text(),
    ).toMatch(minProps.boardStatus);
  });

  it('sets lock icon when props.boardStatus = Private', () => {
    expect(
      component
        .find('Icon')
        .at(1)
        .prop('name'),
    ).toBe('lock');
  });

  it('sets globe icon when props.boardStatus = Public', () => {
    component.setProps({ boardStatus: 'Public' });
    expect(
      component
        .find('Icon')
        .at(1)
        .prop('name'),
    ).toBe('globe');
  });

  it('sets users icon when props.boardStatus = Team', () => {
    component.setProps({ boardStatus: 'Team' });
    expect(
      component
        .find('Icon')
        .at(1)
        .prop('name'),
    ).toBe('users');
  });

  it('calls props.showRenameBoard when Board Title is clicked', () => {
    expect(minProps.showRenameBoard).not.toHaveBeenCalled();
    component.find('h3').simulate('click');
    expect(minProps.showRenameBoard).toHaveBeenCalled();
  });

  it('calls props.showAddToTeam when Team is clicked', () => {
    expect(minProps.showAddToTeam).not.toHaveBeenCalled();
    component
      .find('p')
      .first()
      .simulate('click');
    expect(minProps.showAddToTeam).toHaveBeenCalled();
  });

  it('calls props.showVisibilityMenu when Visibility is clicked', () => {
    expect(minProps.showVisibilityMenu).not.toHaveBeenCalled();
    component
      .find('p')
      .at(1)
      .simulate('click');
    expect(minProps.showVisibilityMenu).toHaveBeenCalled();
  });

  it('calls props.showVisibilityMenu when Visibility is clicked', () => {
    expect(minProps.showBoardMenu).not.toHaveBeenCalled();
    component
      .find('p')
      .last()
      .simulate('click');
    expect(minProps.showBoardMenu).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
