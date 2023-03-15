import {mountWithApp} from 'tests/utilities';

import {Item} from '../../Item';
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

    expect(section).toContainReactComponentTimes(Item, 2);
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

  it('passes content to Item', () => {
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

    expect(section.findAll(Item)[0]).toHaveReactProps({
      content: 'Import file',
    });
  });

  it('passes helpText to Item', () => {
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

    expect(section.findAll(Item)[0]).toHaveReactProps({
      helpText: 'Foo',
    });
  });

  it('passes the onActionAnyItem callback to Item', () => {
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

    section.findAll(Item)[0].findAll('button')[0].trigger('onClick');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

function noop() {}
