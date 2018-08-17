import {autobind} from '@shopify/javascript-utilities/decorators';

import Messenger from '../Messenger';
import {
  transformBreadcrumb,
  transformAction,
  transformPagination,
  transformActionGroup,
  ActionGroup,
} from '../transformers';
import {
  ComplexAction,
  DisableableAction,
  LinkAction,
  LoadableAction,
} from '../../../types';

// eslint-disable-next-line shopify/strict-component-boundaries
import {Messages} from '../../../components/AppProvider';

export interface UpdateConfig {
  title: string;
  icon?: string;
  breadcrumbs?: LinkAction[];
  primaryAction?: DisableableAction & LoadableAction;
  secondaryActions?: ComplexAction[];
  actionGroups?: ActionGroup[];
  pagination?: {
    hasNext?: boolean;
    hasPrevious?: boolean;
    onNext?(): void;
    onPrevious?(): void;
  };
}

export default class Bar {
  constructor(private messenger: Messenger) {}

  update(config: UpdateConfig) {
    const {
      title,
      icon,
      breadcrumbs,
      secondaryActions,
      actionGroups,
      primaryAction,
      pagination,
    } = config;

    this.messenger.send(Messages.INITIALIZE, {
      buttons: {
        primary: primaryAction
          ? transformAction(this.messenger.targetOrigin)(primaryAction)
          : undefined,
        secondary: [
          ...(secondaryActions || []).map(
            transformAction(this.messenger.targetOrigin),
          ),
          ...(actionGroups || []).map(
            transformActionGroup(this.messenger.targetOrigin),
          ),
        ],
      },
      title,
      icon,
      breadcrumb: getLastLevelBreadcrumb(
        breadcrumbs,
        this.messenger.targetOrigin,
      ),
      pagination: transformPagination(pagination),
    });

    if (actionGroups) {
      document.addEventListener('click', this.closeDropdown);
    } else {
      document.removeEventListener('click', this.closeDropdown);
    }
  }

  @autobind
  private closeDropdown() {
    this.messenger.send(Messages.CLOSE_DROPDOWN);
  }
}

function getLastLevelBreadcrumb(
  breadcrumbs: UpdateConfig['breadcrumbs'],
  shopOrigin: string,
) {
  return breadcrumbs && breadcrumbs.length > 0
    ? transformBreadcrumb(breadcrumbs[breadcrumbs.length - 1], shopOrigin)
    : undefined;
}
