import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../../../src/features/user/Signup';

describe('user/Signup', () => {
  it('renders node with correct class name', () => {
    const props = {
      user: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Signup {...props} />
    );

    expect(
      renderedComponent.find('.user-signup').length
    ).toBe(1);
  });
});
