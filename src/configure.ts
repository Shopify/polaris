import {UnstyledLink, LinkLikeComponent} from './components';

export function useLinkComponent(LinkComponent: LinkLikeComponent) {
  UnstyledLink.use(LinkComponent);
}

export interface Polaris {
  VERSION: string,
}

declare global {
  interface Window {
    Polaris: Polaris,
  }
}

if (typeof window !== 'undefined') {
  window.Polaris = window.Polaris || {};
  window.Polaris.VERSION = '{{VERSION}}';
}
