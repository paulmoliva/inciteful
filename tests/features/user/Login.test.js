import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/user/Login';

describe('user/Login', () => {
  it('renders node with correct class name', () => {
    const props = {
      user: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Login {...props} />
    );

    expect(
      renderedComponent.find('.user-login').length
    ).toBe(1);
  });
});
