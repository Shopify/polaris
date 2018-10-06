import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'tests/utilities';
import Item from '../../Item';
import Section from '../Section';

describe('<Section />', () => {
  it('renders its items', () => {
    const section = mountWithAppProvider(
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

    expect(section.find(Item).length).toBe(2);
  });

  it('renders items as li when hasMultipleSections is false', () => {
    const section = mountWithAppProvider(
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

    expect(section.find('li').length).toBe(2);
  });

  it('wraps items in an li when hasMultipleSections is true', () => {
    const section = mountWithAppProvider(
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

    expect(section.find('li').length).toBe(3);
  });

  it('passes content to Item', () => {
    const callback = () => {};
    const section = mountWithAppProvider(
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

    expect(
      section
        .find(Item)
        .first()
        .prop('content'),
    ).toBe('Import file');
  });

  it('passes the onActionAnyItem callback to Item', () => {
    const callback = () => {};
    const section = mountWithAppProvider(
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

    expect(
      section
        .find(Item)
        .first()
        .prop('onAction'),
    );
  });
});
