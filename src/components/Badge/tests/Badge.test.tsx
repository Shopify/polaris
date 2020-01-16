import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {VisuallyHidden} from 'components';
import {Badge, PROGRESS_LABELS, STATUS_LABELS} from '..';

describe('<Badge />', () => {
  it('renders its children', () => {
    const badge = mountWithAppProvider(<Badge>Badge test</Badge>);
    expect(badge.text()).toBe('Badge test');
    badge.unmount();
  });

  it('accepts a status prop and renders a visually hidden label', () => {
    Object.keys(STATUS_LABELS).forEach((key: keyof typeof STATUS_LABELS) => {
      const badge = mountWithAppProvider(<Badge status={STATUS_LABELS[key]} />);
      expect(badge.find(VisuallyHidden).exists()).toBe(true);
      badge.unmount();
    });
  });

  it('accepts a progress prop and renders a visually hidden label', () => {
    Object.keys(PROGRESS_LABELS).forEach(
      (key: keyof typeof PROGRESS_LABELS) => {
        const badge = mountWithAppProvider(
          <Badge progress={PROGRESS_LABELS[key]} />,
        );
        expect(badge.find(VisuallyHidden).exists()).toBe(true);
        badge.unmount();
      },
    );
  });
});
