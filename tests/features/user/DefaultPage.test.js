import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/user/DefaultPage';

describe('user/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      users: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.user-default-page').length
    ).toBe(1);
  });
});
