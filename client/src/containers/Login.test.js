import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './Login';
import { Form } from 'semantic-ui-react';

describe('Login Component', () => {
  let component;
  const minProps = {
    loginUser: jest.fn(),
    resetError: jest.fn(),
  };

  beforeAll(() => {
    console.error = error => {
      throw new Error(error);
    };
  });

  beforeEach(() => {
    component = shallow(<Login {...minProps} />);
  });

  it('renders', () => {
    expect(component).toHaveLength(1);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('has className Login', () => {
    expect(component.hasClass('Login')).toBe(true);
  });

  it('sets state value to input fields', () => {
    const state = {
      email: 'johndoe@example.com',
      password: '123abc',
    };
    component.setState(state);
    expect(
      component
        .find(Form.Input)
        .first()
        .prop('value'),
    ).toBe(state.email);
    expect(
      component
        .find(Form.Input)
        .last()
        .prop('value'),
    ).toBe(state.password);
  });

  it('disables Button when either input is empty', () => {
    expect(component.find('Button').prop('disabled')).toBe(true);
  });

  it('enables Button when inputs have values', () => {
    component.setState({
      email: 'johndoe@example.com',
      password: '123abc',
    });
    expect(component.find('Button').prop('disabled')).toBe(false);
  });

  it('disables Button when sending', () => {
    component.setState({
      email: 'johndoe@example.com',
      password: '123abc',
    });
    component.setProps({ sending: true });
    expect(component.find('Button').prop('disabled')).toBe(true);
  });

  it('sends login when form is submitted', () => {
    component.setState({
      email: 'johndoe@example.com',
      password: '123abc',
    });

    const event = { preventDefault: jest.fn() };
    expect(minProps.loginUser).not.toHaveBeenCalled();

    component.find(Form).simulate('submit', event);
    expect(minProps.loginUser).toHaveBeenCalled();
  });

  it('resets UI errors on input change', () => {
    component.setProps({ error: true });
    expect(minProps.resetError).not.toHaveBeenCalled();

    const newEmail = {
      name: 'email',
      value: 'johndoe@example.com',
    };
    component
      .find(Form.Input)
      .first()
      .simulate('change', null, newEmail);
    expect(minProps.resetError).toHaveBeenCalled();

    const newPassword = {
      name: 'password',
      value: '123abc',
    };
    component
      .find(Form.Input)
      .last()
      .simulate('change', null, newPassword);
    expect(minProps.resetError).toHaveBeenCalledTimes(2);
  });
});
