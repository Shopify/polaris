import React from 'react';
import {ArrowLeftMinor} from '@shopify/polaris-icons';

import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Button} from '../Button';

export interface BreadcrumbsProps {
  /** Back action link */
  backAction: CallbackAction | LinkAction;
}

export function Breadcrumbs({backAction}: BreadcrumbsProps) {
  const {content} = backAction;

  console.log({backAction});
  const breadcrumbMarkup = (
    <Button
      key={content}
      url={'url' in backAction ? backAction.url : undefined}
      onClick={'onAction' in backAction ? backAction.onAction : undefined}
      onPointerDown={handleMouseUpByBlurring}
      icon={ArrowLeftMinor}
      accessibilityLabel={backAction.accessibilityLabel ?? content}
      viewTransition={
        'viewTransition' in backAction ? backAction.viewTransition : undefined
      }
    />
  );

  return <nav role="navigation">{breadcrumbMarkup}</nav>;
}
