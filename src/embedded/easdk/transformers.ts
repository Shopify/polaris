import {EASDKTarget, ComplexAction, IconableAction} from '../../types';

export interface EASDKBreadcrumb {
  label: string;
  href?: string;
  target?: EASDKTarget;
  loading?: boolean;
  message?(): void;
}

export function transformBreadcrumb(
  breadcrumb: ComplexAction,
): EASDKBreadcrumb {
  if (breadcrumb.content == null) {
    throw new Error(
      `No content provided for breadcrumb (${JSON.stringify(breadcrumb)})`,
    );
  }

  let target: EASDKBreadcrumb['target'];
  if (breadcrumb.target) {
    target = breadcrumb.target;
  } else if (breadcrumb.url) {
    target = getTargetFromURL(breadcrumb.url);
  } else {
    target = undefined;
  }

  return {
    label: breadcrumb.content,
    href: breadcrumb.url,
    target,
    message:
      target === 'app' ? generateCallback(breadcrumb.url) : breadcrumb.onAction,
  };
}

export interface ActionGroup {
  title: string;
  icon?: IconableAction['icon'];
  actions: IconableAction[];
}

export interface EASDKBaseButton {
  label?: string;
  href?: string;
  style?: 'disabled' | 'danger';
  target?: EASDKTarget;
  loading?: boolean;
  message?(): void;
}

export interface EASDKLinkButton extends EASDKBaseButton {
  type: 'dropdown';
  links: EASDKButton[];
}

export type EASDKButton = EASDKBaseButton | EASDKLinkButton;

export function transformAction(action: ComplexAction): EASDKButton {
  let style: EASDKButton['style'];
  if (action.disabled) {
    style = 'disabled';
  } else if (action.destructive) {
    style = 'danger';
  }

  let target: EASDKBaseButton['target'];
  if (action.target) {
    target = action.target;
  } else if (action.url) {
    target = getTargetFromURL(action.url);
  } else {
    target = undefined;
  }

  return {
    label: action.content,
    href: action.url,
    target,
    message: target === 'app' ? generateCallback(action.url) : action.onAction,
    style,
  };
}

export function transformActionGroup(
  actionGroup: ActionGroup,
): EASDKLinkButton {
  return {
    type: 'dropdown',
    label: actionGroup.title,
    links: actionGroup.actions.map(transformAction),
  };
}

function getTargetFromURL(url: string): EASDKTarget {
  if (url[0] === '/') {
    return 'shopify';
  } else if (
    url.indexOf(window.location.hostname) >= 0 ||
    (url[0] !== '/' && url.indexOf('http') !== 0)
  ) {
    return 'app';
  } else {
    return 'new';
  }
}

function generateCallback(url: string | undefined) {
  if (url == null) {
    return;
  }
  return () => {
    window.location.assign(url);
  };
}

export interface Pagination {
  hasNext?: boolean;
  hasPrevious?: boolean;
  nextURL?: string;
  previousURL?: string;
  onNext?(): void;
  onPrevious?(): void;
}

export type PaginationDirection = {message(): void} | {href: string};

export interface EASDKPagination {
  next?: PaginationDirection;
  previous?: PaginationDirection;
}

export function transformPagination(pagination?: Pagination) {
  if (pagination == null) {
    return undefined;
  }

  const {
    hasNext,
    hasPrevious,
    nextURL,
    previousURL,
    onNext,
    onPrevious,
  } = pagination;
  const finalPagination: EASDKPagination = {};

  if (hasNext) {
    if (onNext) {
      finalPagination.next = {message: onNext};
    } else if (nextURL) {
      finalPagination.next = {href: nextURL};
    }
  }

  if (hasPrevious) {
    if (onPrevious) {
      finalPagination.previous = {message: onPrevious};
    } else if (previousURL) {
      finalPagination.previous = {href: previousURL};
    }
  }

  return finalPagination;
}
