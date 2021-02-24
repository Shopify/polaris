import React, {useState, useCallback} from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities/react-testing';
import {Tokens} from 'utilities/theme';

import {Collapsible, CollapsibleProps} from '../Collapsible';

describe('<Collapsible />', () => {
  const ariaExpandedSelector = '[aria-expanded=false]';

  it('does not render its children and indicates hidden with aria-hidden', () => {
    const collapsible = mountWithAppProvider(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    const hidden = collapsible.find(ariaExpandedSelector);
    expect(hidden.exists()).toBe(true);
  });

  it('renders its children and does not render aria-hidden when open', () => {
    const collapsible = mountWithAppProvider(
      <Collapsible id="test-collapsible" open>
        content
      </Collapsible>,
    );

    const hidden = collapsible.find(ariaExpandedSelector);
    expect(hidden.exists()).toBe(false);
    expect(collapsible.contains('content')).toBe(true);
  });

  it('does not render its children when closed', () => {
    const collapsible = mountWithAppProvider(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    expect(collapsible.contains('content')).toBe(false);
  });

  it('renders its children when expandOnPrint is true and open is false', () => {
    const collapsible = mountWithAppProvider(
      <Collapsible id="test-collapsible" open={false} expandOnPrint>
        content
      </Collapsible>,
    );

    expect(collapsible.contains('content')).toBe(true);
  });

  it('renders its children when expandOnPrint is true and open is true', () => {
    const collapsible = mountWithAppProvider(
      <Collapsible id="test-collapsible" open expandOnPrint>
        content
      </Collapsible>,
    );

    expect(collapsible.contains('content')).toBe(true);
  });

  describe('Transition', () => {
    it('passes a duration property', () => {
      const duration = Tokens.duration150;
      const collapsible = mountWithAppProvider(
        <Collapsible id="test-collapsible" open transition={{duration}} />,
      );

      expect(collapsible.props()).toMatchObject({transition: {duration}});
    });

    it('passes a timingFunction property', () => {
      const timingFunction = Tokens.ease;
      const collapsible = mountWithAppProvider(
        <Collapsible
          id="test-collapsible"
          open
          transition={{timingFunction}}
        />,
      );

      expect(collapsible.props()).toMatchObject({transition: {timingFunction}});
    });
  });

  describe('onTransitionEnd', () => {
    it('adds an isFullyClosed class to the collapsible onTransitionEnd if the event target is the collapsible div', () => {
      const id = 'test-collapsible';
      const collapsibleWithToggle = mountWithApp(
        <CollapsibleWithToggle id={id} />,
      );
      collapsibleWithToggle.find('button')!.trigger('onClick');

      const wrapper = collapsibleWithToggle.find('div', {id})!;
      wrapper.trigger('onTransitionEnd', {
        target: wrapper.domNode as HTMLDivElement,
      });

      expect(
        collapsibleWithToggle.find('div', {
          id,
          'aria-expanded': false,
          className: 'Collapsible isFullyClosed',
        }),
      ).not.toBeNull();
    });

    it('does not add an isFullyClosed class to the collapsible onTransitionEnd if the event target is not the collapsible div', () => {
      const id = 'test-collapsible';
      const collapsibleWithToggle = mountWithApp(
        <CollapsibleWithToggle id={id} />,
      );
      collapsibleWithToggle.find('button')!.trigger('onClick');

      collapsibleWithToggle.find('div', {id})!.trigger('onTransitionEnd', {
        target: document.createElement('div'),
      });

      expect(
        collapsibleWithToggle.find('div', {
          id,
          'aria-expanded': false,
          className: 'Collapsible',
        }),
      ).not.toBeNull();
    });
  });
});

function CollapsibleWithToggle(props: Omit<CollapsibleProps, 'open'>) {
  const [open, setOpen] = useState(true);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <>
      <button onClick={handleToggle}>Activator</button>
      <Collapsible {...props} open={open} />
    </>
  );
}
