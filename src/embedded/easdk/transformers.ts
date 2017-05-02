import {LinkAction, ComplexAction} from '../../types';
import url from 'url';

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
    target: getTargetFromUrl(action.url),
    message: action.onAction,
    style,
  } as EASDKButton;
}

function getTargetFromUrl(urlParam: EASDKButton['href']): EASDKButton['target'] {

  if (!urlParam || urlParam === '#') {
    return undefined;
  }

  const parsedUrl = url.parse(urlParam);
  if (urlParam[0] === '/') {
    return 'shopify';
  } else if (parsedUrl.hostname === window.location.hostname) {
    return 'app';
  } else {
    return 'new'; // or 'parent' ?
  }
}

export interface Pagination {
  hasNext?: boolean,
  hasPrevious?: boolean,
  nextURL?: string,
  previousURL?: string,
  onNext?(): void,
  onPrevious?(): void,
}

export type PaginationDirection = {message(): void} | {href: string};

export interface EASDKPagination {
  next?: PaginationDirection,
  previous?: PaginationDirection,
}

export function transformPagination(pagination?: Pagination) {
  if (pagination == null) { return undefined; }

  const {hasNext, hasPrevious, nextURL, previousURL, onNext, onPrevious} = pagination;
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
