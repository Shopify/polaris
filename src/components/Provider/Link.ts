import {LinkLikeComponent} from '../UnstyledLink';

export default class Link {
  constructor(
    private link?: LinkLikeComponent,
  ) {}

  set linkComponent(link: LinkLikeComponent) {
    this.link = link;
  }

  get linkComponent(): LinkLikeComponent {
    return this.link;
  }
}
