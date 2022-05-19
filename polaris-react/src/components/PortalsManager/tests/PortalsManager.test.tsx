import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {usePortalsManager} from '../../../utilities/portals';
import {PortalsManager} from '../PortalsManager';

const TestConsumer = () => {
  const portalsManager = usePortalsManager();
  return <>{portalsManager.container ? portalsManager.container.id : null}</>;
};

describe('<PortalsManager />', () => {
  it('renders children', () => {
    const children = <p />;
    const manager = mountWithApp(<PortalsManager>{children}</PortalsManager>);
    expect(manager).toContainReactComponent('p');
  });

  it('creates default container and shares through context', () => {
    const manager = mountWithApp(
      <PortalsManager>
        <TestConsumer />
      </PortalsManager>,
    );
    expect(manager.text()).toBe('PolarisPortalsContainer');
  });
});
