import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ActionButton} from '../../../../ActionButton';
import {Section} from '../Section';

describe('<Section />', () => {
  it('renders its items', () => {
    const section = mountWithApp(
      <Section
        hasMultipleSections={false}
        section={{
          items: [
            {content: 'Import file', onAction: noop},
            {content: 'Export file', onAction: noop},
          ],
        }}
      />,
    );

    expect(section).toContainReactComponentTimes(ActionButton, 2);
  });

  it('renders items as li when hasMultipleSections is false', () => {
    const section = mountWithApp(
      <Section
        hasMultipleSections={false}
        section={{
          items: [
            {content: 'Import file', onAction: noop},
            {content: 'Export file', onAction: noop},
          ],
        }}
      />,
    );

    expect(section).toContainReactComponentTimes('li', 2);
  });

  it('wraps items in an li when hasMultipleSections is true', () => {
    const section = mountWithApp(
      <Section
        hasMultipleSections
        section={{
          items: [
            {content: 'Import file', onAction: noop},
            {content: 'Export file', onAction: noop},
          ],
        }}
      />,
    );

    expect(section).toContainReactComponentTimes('li', 3);
  });

  it('passes content to ActionButton', () => {
    const callback = () => {};
    const section = mountWithApp(
      <Section
        hasMultipleSections
        section={{
          items: [
            {content: 'Import file', onAction: noop},
            {content: 'Export file', onAction: noop},
          ],
        }}
        onActionAnyItem={callback}
      />,
    );

    expect(section.findAll(ActionButton)[0]).toHaveReactProps({
      content: 'Import file',
    });
  });

  it('passes helpText to ActionButton', () => {
    const section = mountWithApp(
      <Section
        hasMultipleSections
        section={{
          items: [
            {content: 'Import file', helpText: 'Foo', onAction: noop},
            {content: 'Export file', helpText: 'Bar', onAction: noop},
          ],
        }}
      />,
    );

    expect(section.findAll(ActionButton)[0]).toHaveReactProps({
      helpText: 'Foo',
    });
  });

  it('passes the onActionAnyActionButton callback to ActionButton', () => {
    const spy = jest.fn();
    const section = mountWithApp(
      <Section
        hasMultipleSections
        section={{
          items: [
            {content: 'Import file', onAction: noop},
            {content: 'Export file', onAction: noop},
          ],
        }}
        onActionAnyItem={spy}
      />,
    );

    section.findAll(ActionButton)[0].findAll('button')[0].trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

function noop() {}
