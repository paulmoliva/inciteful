import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/categories/DefaultPage';

describe('categories/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      categories: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.categories-default-page').length
    ).toBe(1);
  });
});
