import {mountWithApp} from 'tests/utilities';

import {Collapsible} from '../../../../../../Collapsible';
import {Secondary} from '../Secondary';

describe('Secondary()', () => {
  it('passes a default id to Collapsible', () => {
    const component = mountWithApp(<Secondary expanded />);
    expect(component).toContainReactComponent(Collapsible, {
      id: 'PolarisSecondaryNavigation1',
    });
  });

  it('passes a custom id to Collapsible when provided', () => {
    const component = mountWithApp(
      <Secondary expanded id="CustomSecondaryId" />,
    );
    expect(component).toContainReactComponent(Collapsible, {
      id: 'CustomSecondaryId',
    });
  });

  it('adds custom transition props to Collapsible', () => {
    const component = mountWithApp(<Secondary expanded />);
    expect(component).toContainReactComponent(Collapsible, {
      transition: {
        duration: expect.any(String),
        timingFunction: expect.any(String),
      },
    });
  });

  it('passes expanded to Collapsible', () => {
    const component = mountWithApp(<Secondary expanded />);
    expect(component).toContainReactComponent(Collapsible, {open: true});
  });

  it('renders an unorders list for its children', () => {
    const component = mountWithApp(<Secondary expanded />);
    expect(component).toContainReactComponent('ul');
  });
});
