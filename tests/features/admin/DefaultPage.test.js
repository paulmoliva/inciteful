import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/admin/DefaultPage';

describe('admin/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.admin-default-page').length
    ).toBe(1);
  });
});
