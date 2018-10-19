import * as React from 'react';
import {TextContainer, EventListener} from 'components';
import {mountWithAppProvider} from 'test-utilities';
import TrapFocus from '../TrapFocus';
import Focus from '../Focus';

describe('<TrapFocus />', () => {
  it('renders its children', () => {
    const trapFocus = mountWithAppProvider(
      <TrapFocus>
        <TextContainer>Test</TextContainer>
      </TrapFocus>,
    );

    expect(trapFocus.find(TextContainer).length).toBe(1);
  });

  it('renders Focus', () => {
    const trapFocus = mountWithAppProvider(
      <TrapFocus>
        <TextContainer>Test</TextContainer>
      </TrapFocus>,
    );
    expect(trapFocus.find(Focus).length).toBe(1);
  });

  it('renders EventListener with focusout', () => {
    const trapFocus = mountWithAppProvider(
      <TrapFocus>
        <TextContainer>Test</TextContainer>
      </TrapFocus>,
    );
    expect(trapFocus.find(EventListener).length).toBe(1);
    expect(trapFocus.find(EventListener).prop('event')).toBe('focusout');
  });
});
