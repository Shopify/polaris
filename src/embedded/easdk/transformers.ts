import {LinkAction, ComplexAction} from '../../types';

export interface EASDKBreadcrumb {
  label: string,
  href?: string,
  target?: string,
  loading?: boolean,
}

export function transformBreadcrumb(breadcrumb: LinkAction | undefined) {
  if (breadcrumb == null || !breadcrumb) {
    return undefined;
  }

  return {
    label: breadcrumb.content,
    href: breadcrumb.url,
  } as EASDKBreadcrumb;
}

export interface EASDKButton {
  label?: string,
  href?: string,
  style?: 'disabled' | 'danger',
  target?: 'app' | 'shopify' | 'new' | 'parent',
  loading?: boolean,
  type?: string,
  links?: EASDKButton[],
  message?(): void,
}

export function transformAction(action: ComplexAction | undefined) {
  if (action == null || !action) {
    return undefined;
  }

  let style;
  if (action.disabled) {
    style = 'disabled';
  } else if (action.destructive) {
    style = 'danger';
  }

  return {
    label: action.content,
    href: action.url,
    message: action.onAction,
    style,
  } as EASDKButton;
}

export interface Pagination {
  hasNext?: boolean,
  hasPrevious?: boolean,
  onNext?(): void,
  onPrevious?(): void,
}

export interface EASDKPagination {
  next?: {message(): void},
  previous?: {message(): void},
}

export function transformPagination(pagination?: Pagination) {
  if (pagination == null) { return undefined; }

  const {hasNext, hasPrevious, onNext, onPrevious} = pagination;
  const finalPagination: EASDKPagination = {};

  if (hasNext && onNext) {
    finalPagination.next = {message: onNext};
  }

  if (hasPrevious && onPrevious) {
    finalPagination.previous = {message: onPrevious};
  }

  return finalPagination;
}

