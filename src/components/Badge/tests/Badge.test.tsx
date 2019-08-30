import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {VisuallyHidden} from 'components';
import Badge, {Status, Progress, PROGRESS_LABELS, STATUS_LABELS} from '..';

describe('<Badge />', () => {
  it('renders its children', () => {
    const badge = mountWithAppProvider(<Badge>Badge test</Badge>);
    expect(badge.text()).toBe('Badge test');
    badge.unmount();
  });

  it('accepts a status prop and renders a visually hidden label', () => {
    Object.keys(STATUS_LABELS).forEach((key: Status) => {
      const badge = mountWithAppProvider(<Badge status={STATUS_LABELS[key]} />);
      expect(badge.find(VisuallyHidden).exists()).toBe(true);
      badge.unmount();
    });
  });

  it('accepts a progress prop and renders a visually hidden label', () => {
    Object.keys(PROGRESS_LABELS).forEach((key: Progress) => {
      const badge = mountWithAppProvider(
        <Badge progress={PROGRESS_LABELS[key]} />,
      );
      expect(badge.find(VisuallyHidden).exists()).toBe(true);
      badge.unmount();
    });
  });
});
