import {UnstyledLink, LinkLikeComponent} from './components';

export function useLinkComponent(LinkComponent: LinkLikeComponent) {
  UnstyledLink.use(LinkComponent);
}
