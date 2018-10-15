import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {TextContainer, Scrollable} from 'components';
import Pane from '../Pane';

describe('<Pane />', () => {
  it('renders its children', () => {
    const children = (
      <TextContainer>
        <p>Content</p>
      </TextContainer>
    );
    const pane = mountWithAppProvider(<Pane>{children}</Pane>);

    expect(pane.contains(children)).toBe(true);
  });

  it('renders a div if fixed', () => {
    const children = (
      <TextContainer>
        <p>Content</p>
      </TextContainer>
    );
    const pane = mountWithAppProvider(<Pane fixed>{children}</Pane>);

    expect(pane.find('div').exists()).toBe(true);
    expect(pane.find(Scrollable).exists()).toBe(false);
  });

  it('renders Scrollable if not fixed', () => {
    const children = (
      <TextContainer>
        <p>Content</p>
      </TextContainer>
    );
    const pane = mountWithAppProvider(<Pane>{children}</Pane>);

    expect(pane.find(Scrollable).exists()).toBe(true);
  });
});
