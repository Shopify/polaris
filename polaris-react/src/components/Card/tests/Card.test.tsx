import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {WithinContentContext} from '../../../utilities/within-content-context';
import {Card} from '..';
import {ShadowBevel} from '../../ShadowBevel';

const heading = <p>Online store dashboard</p>;
const subheading = <p>View a summary of your online store performance</p>;

describe('Card', () => {
  it('has a child with prop withinContentContainer set to true', () => {
    function TestComponent(_: {withinContentContainer: any}) {
      return null;
    }

    const card = mountWithApp(
      <Card>
        <WithinContentContext.Consumer>
          {(withinContentContext) => {
            return (
              <TestComponent withinContentContainer={withinContentContext} />
            );
          }}
        </WithinContentContext.Consumer>
      </Card>,
    );
    expect(card).toContainReactComponent(TestComponent, {
      withinContentContainer: true,
    });
  });

  it('renders children', () => {
    const card = mountWithApp(
      <Card>
        {heading}
        {subheading}
      </Card>,
    );

    expect(card).toContainReactComponentTimes('p', 2);
  });

  it('cards are rounded sm and above by default', () => {
    const card = mountWithApp(
      <Card>
        {heading}
        {subheading}
      </Card>,
    );

    expect(card).toContainReactComponent(ShadowBevel, {
      bevel: {sm: true},
    });
  });

  it('cards respect incoming roundedAbove prop', () => {
    const card = mountWithApp(
      <Card roundedAbove="md">
        {heading}
        {subheading}
      </Card>,
    );

    expect(card).toContainReactComponent(ShadowBevel, {
      bevel: {md: true},
    });
  });
});
