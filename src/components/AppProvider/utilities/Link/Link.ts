import {LinkLikeComponent} from 'components/UnstyledLink';

export default class Link {
  constructor(private linkComponent?: LinkLikeComponent) {}

  setLinkComponent(link: LinkLikeComponent) {
    this.linkComponent = link;
  }

  getLinkComponent(): LinkLikeComponent {
    return this.linkComponent;
  }
}
