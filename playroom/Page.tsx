import * as React from 'react';
import {Page} from '../src';

interface Props {
  title?: string;
  breadcrumbs?: boolean;
  action?: boolean;
  secondaryActions?: boolean;
  children: React.ReactNode;
}

export default function PlayroomPage({
  title,
  children,
  action,
  breadcrumbs,
  secondaryActions,
}: Props) {
  return (
    <Page
      breadcrumbs={breadcrumbs && [{content: 'Previous Page', url: '#'}]}
      title={title || 'Mock Title'}
      primaryAction={action && {content: 'Primary Action', disabled: true}}
      secondaryActions={
        secondaryActions && [
          {content: 'Secondary Action 1'},
          {content: 'Secondary Action 2'},
        ]
      }
    >
      {children}
    </Page>
  );
}
