import {AriaAttributes} from 'react';

export function setActivatorAttributes(
  activator: HTMLElement,
  {
    id,
    active,
    ariaHaspopup,
  }: {
    id: string;
    active: boolean;
    ariaHaspopup: AriaAttributes['aria-haspopup'];
  },
) {
  activator.tabIndex = activator.tabIndex || 0;
  activator.setAttribute('aria-controls', id);
  activator.setAttribute('aria-owns', id);
  activator.setAttribute('aria-expanded', String(active));

  if (ariaHaspopup != null) {
    activator.setAttribute('aria-haspopup', String(ariaHaspopup));
  }
}
