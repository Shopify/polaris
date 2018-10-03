import {LinkLikeComponent} from 'src/components';

export default class Link {
  constructor(private linkComponent?: LinkLikeComponent) {}

  setLinkComponent(link: LinkLikeComponent) {
    this.linkComponent = link;
  }

  getLinkComponent(): LinkLikeComponent {
    return this.linkComponent;
  }
}
