import React from 'react';
import {ArrowLeftIcon} from '@shopify/polaris-icons';

import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Button} from '../Button';

export interface BreadcrumbsProps {
  /**
   * @deprecated Back action link
   * Use `breadcrumbs` prop instead as documented [here](https://shopify.dev/docs/api/app-bridge/previous-versions/actions/titlebar#using-titlebar-with-polaris)
   */
  backAction: CallbackAction | LinkAction;
}

export function Breadcrumbs({backAction}: BreadcrumbsProps) {
  const {content} = backAction;

  return (
    <Button
      key={content}
      url={'url' in backAction ? backAction.url : undefined}
      onClick={'onAction' in backAction ? backAction.onAction : undefined}
      onPointerDown={handleMouseUpByBlurring}
      icon={ArrowLeftIcon}
      accessibilityLabel={backAction.accessibilityLabel ?? content}
    />
  );
}
