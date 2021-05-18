import React from 'react';
import {Page} from '@shopify/polaris';
import {mount} from './tests/utils/react-testing';
import {App} from './App';

// Sample test to demonstrate how you should test with react-testing & Polaris
test('renders page', () => {
  const wrapper = mount(<App />);
  expect(wrapper).toContainReactComponent(Page);
});
