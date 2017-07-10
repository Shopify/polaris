import Messenger from '../Messenger';
import {
  transformBreadcrumb,
  transformAction,
  transformPagination,
  transformActionGroup,
  ActionGroup,
} from '../transformers';
import {Action, LinkAction} from '../../../types';

export interface UpdateConfig {
  title: string,
  icon?: string,
  breadcrumbs?: LinkAction[],
  primaryAction?: Action,
  secondaryActions?: Action[],
  actionGroups: ActionGroup[],
  pagination?: {
    hasNext?: boolean,
    hasPrevious?: boolean,
    onNext?(): void,
    onPrevious?(): void,
  },
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

    this.messenger.send('Shopify.API.Bar.initialize', {
      buttons: {
        primary: primaryAction ? transformAction(primaryAction) : undefined,
        secondary: [
          ...(secondaryActions || []).map(transformAction),
          ...(actionGroups || []).map(transformActionGroup),
        ],
      },
      title,
      icon,
      breadcrumb: getLastLevelBreadcrumb(breadcrumbs),
      pagination: transformPagination(pagination),
    });
  }
}

function getLastLevelBreadcrumb(breadcrumbs: UpdateConfig['breadcrumbs']) {
  return (breadcrumbs && breadcrumbs.length > 0)
    ? transformBreadcrumb(breadcrumbs[breadcrumbs.length - 1])
    : undefined;
}
