import React, {useState, useCallback} from 'react';
import {mountWithApp} from 'test-utilities';
import {Tokens} from 'utilities/theme';

import {Collapsible, CollapsibleProps} from '../Collapsible';

describe('<Collapsible />', () => {
  it('does not render its children and indicates hidden with aria-hidden', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', {
      'aria-expanded': false,
    });
  });

  it('renders its children and does not render aria-hidden when open', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open>
        content
      </Collapsible>,
    );

    expect(collapsible).not.toContainReactComponent('div', {
      'aria-expanded': false,
    });

    expect(collapsible).toContainReactText('content');
  });

  it('does not render its children when closed', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    expect(collapsible).not.toContainReactComponent('div', {
      children: expect.stringContaining('content'),
    });
  });

  it('renders its children when expandOnPrint is true and open is false', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open={false} expandOnPrint>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', {
      children: expect.stringContaining('content'),
    });
  });

  it('renders its children when expandOnPrint is true and open is true', () => {
    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open expandOnPrint>
        content
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent('div', {
      children: expect.stringContaining('content'),
    });
  });

  describe('Transition', () => {
    it('passes a duration property', () => {
      const duration = Tokens.duration150;
      const collapsible = mountWithApp(
        <Collapsible id="test-collapsible" open transition={{duration}} />,
      );

      expect(collapsible).toHaveReactProps({transition: {duration}});
    });

    it('passes a timingFunction property', () => {
      const timingFunction = Tokens.ease;
      const collapsible = mountWithApp(
        <Collapsible
          id="test-collapsible"
          open
          transition={{timingFunction}}
        />,
      );

      expect(collapsible).toHaveReactProps({transition: {timingFunction}});
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
