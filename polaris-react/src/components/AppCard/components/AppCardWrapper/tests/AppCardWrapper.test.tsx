import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {timer} from '@shopify/jest-dom-mocks';

import {AppCardWrapper} from '../AppCardWrapper';
import {Box} from '../../../../Box';
import {AppCardMeasurer} from '../../AppCardMeasurer';

describe('<AppCardWrapper />', () => {
  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  it('renders default with children', () => {
    const wrapper = mountWithApp(
      <AppCardWrapper>
        <div>Test</div>
      </AppCardWrapper>,
    );

    expect(wrapper).toContainReactComponent('div', {children: 'Test'});
    expect(wrapper).toContainReactComponent(Box, {
      'aria-label': undefined,
      as: 'div',
      role: 'group',
      background: 'bg-surface',
      paddingBlockStart: '300',
      paddingBlockEnd: '300',
      paddingInlineStart: '400',
      paddingInlineEnd: '400',
      borderWidth: '025',
      borderColor: 'border-brand',
      borderRadius: '300',
    });

    expect(wrapper).toContainReactComponent(AppCardMeasurer, {
      handleMeasurement: expect.any(Function),
    });
  });

  it('renders secondary variant styled Box component', () => {
    const wrapper = mountWithApp(
      <AppCardWrapper variant="secondary">
        <div>Test</div>
      </AppCardWrapper>,
    );

    expect(wrapper).toContainReactComponent(Box, {
      'aria-label': undefined,
      as: 'div',
      role: 'group',
      background: 'bg-surface-secondary',
      paddingBlockStart: '300',
      paddingBlockEnd: '300',
      paddingInlineStart: '400',
      paddingInlineEnd: '400',
      borderWidth: '025',
      borderColor: 'border-brand',
      borderRadius: '300',
    });
  });

  it('renders noBackground variant styled Box component', () => {
    const wrapper = mountWithApp(
      <AppCardWrapper variant="noBackground">
        <div>Test</div>
      </AppCardWrapper>,
    );

    expect(wrapper).toContainReactComponent(Box, {
      'aria-label': undefined,
      as: 'div',
      role: 'group',
      background: undefined,
      paddingBlockStart: '0',
      paddingBlockEnd: '0',
      paddingInlineStart: '0',
      paddingInlineEnd: '0',
      borderWidth: '0',
      borderColor: 'transparent',
      borderRadius: '300',
    });
  });

  it('renders as listitem', () => {
    const wrapper = mountWithApp(
      <AppCardWrapper as="li">
        <div>Test</div>
      </AppCardWrapper>,
    );

    expect(wrapper).toContainReactComponent(Box, {
      as: 'li',
      role: undefined,
    });
  });

  it('renders with accessibilityLabel', () => {
    const wrapper = mountWithApp(
      <AppCardWrapper accessibilityLabel="test">
        <div>Test</div>
      </AppCardWrapper>,
    );

    expect(wrapper).toContainReactComponent(Box, {
      as: 'div',
      role: 'group',
      'aria-label': 'test',
    });
  });

  it('triggers onNarrowChange with narrow value of false when containerWidth > 490px', () => {
    const spy = jest.fn();
    const wrapper = mountWithApp(
      <AppCardWrapper onNarrowChange={spy}>
        <div>Test</div>
      </AppCardWrapper>,
    );

    wrapper
      .find(AppCardMeasurer)
      ?.trigger('handleMeasurement', {containerWidth: 491});

    timer.runAllTimers();

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('triggers onNarrowChange with narrow value of true when containerWidth == 490px', () => {
    const spy = jest.fn();
    const wrapper = mountWithApp(
      <AppCardWrapper onNarrowChange={spy}>
        <div>Test</div>
      </AppCardWrapper>,
    );

    wrapper
      .find(AppCardMeasurer)
      ?.trigger('handleMeasurement', {containerWidth: 490});

    timer.runAllTimers();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('triggers onNarrowChange with narrow value of true when containerWidth < 490px', () => {
    const spy = jest.fn();
    const wrapper = mountWithApp(
      <AppCardWrapper onNarrowChange={spy}>
        <div>Test</div>
      </AppCardWrapper>,
    );

    wrapper
      .find(AppCardMeasurer)
      ?.trigger('handleMeasurement', {containerWidth: 300});

    timer.runAllTimers();

    expect(spy).toHaveBeenCalledWith(true);
  });
});
