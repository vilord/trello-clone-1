import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from './Signup';
import { Form } from 'semantic-ui-react';

describe('Signup Component', () => {
  beforeAll(() => {
    console.error = error => {
      throw new Error(error);
    };
  });

  const minProps = {
    setEmailError: jest.fn(),
    setPasswordError: jest.fn(),
    resetError: jest.fn(),
    signupUser: jest.fn(),
  };

  const state = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '1234abcd',
  };

  let component;
  beforeEach(() => {
    component = shallow(<Signup {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('sets the values of inputs based on state (controlled component)', () => {
    component.find(Form.Input).forEach(x => {
      expect(x.prop('value')).toBe('');
    });

    component.setState(state);
    component.find(Form.Input).forEach(x => {
      expect(x.prop('value')).toBe(component.state(x.prop('name')));
    });
    expect(component).toMatchSnapshot();
  });

  it('sets error on email field on emailError', () => {
    expect(
      component
        .find(Form.Input)
        .at(1)
        .prop('error'),
    ).toBe(false);

    component.setProps({ emailError: true });

    expect(
      component
        .find(Form.Input)
        .at(1)
        .prop('error'),
    ).toBe(true);
  });

  it('sets error on password field on passwordError', () => {
    expect(
      component
        .find(Form.Input)
        .last()
        .prop('error'),
    ).toBe(false);

    component.setProps({ passwordError: true });

    expect(
      component
        .find(Form.Input)
        .last()
        .prop('error'),
    ).toBe(true);
  });

  it('enables button when all input fields have values', () => {
    expect(component.find('Button').prop('disabled')).toBe(true);
    component.setState(state);
    expect(component.find('Button').prop('disabled')).toBe(false);
  });

  it('disables button when sending', () => {
    component.setState(state);
    expect(component.find('Button').prop('disabled')).toBe(false);
    component.setProps({ sending: true });
    expect(component.find('Button').prop('disabled')).toBe(true);
  });
});
