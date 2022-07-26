/* eslint-disable import/extensions */
/* eslint-disable @shopify/strict-component-boundaries */
import React from 'react';
import {
  html,
  LitElement,
  ReactiveController,
  ReactiveControllerHost,
} from 'lit';
import {customElement} from 'lit/decorators.js';

import {Variation, VariationValue} from '../src/components/TextStyle/TextStyle';
// import as a function that type is (params: { css: typeof require('lit-element').css }) => CSSResult
import styles from '../src/components/TextStyle/TextStyle.scss';

import theme from './theme.scss';

export class ToastController implements ReactiveController {
  host?: ReactiveControllerHost;
  public toasts: {message: string}[] = [];

  addHost(host: ReactiveControllerHost) {
    this.host = host;
    this.host.addController(this);

    return this;
  }

  show(toast: any) {
    this.toasts.push(toast);
    this.host?.requestUpdate();
  }

  hostConnected() {}

  hostDisconnected() {
    this.toasts.length = 0;
  }
}

// How do we ensure that this is a singleton?
const toast = new ToastController();

@customElement('ui-frame')
export class UIFrame extends LitElement {
  static styles = [theme];
  private toast = toast.addHost(this);

  getToasts() {
    return html`<div>
      ${this.toast.toasts.map((toast) => html`<div>${toast.message}</div>`)}
    </div>`;
  }

  render() {
    return html`<div>
      ${this.getToasts()}
      <slot />
    </div>`;
  }
}

@customElement('ui-text')
export class UIText extends LitElement {
  static styles = [styles];

  getVariationClass(variation: Variation) {
    if (!variation) {
      return undefined;
    }

    return `variation${variation
      .slice(0, 1)
      .toUpperCase()
      .concat(variation.slice(1))}`;
  }

  render() {
    const variation = this.getAttribute('variation') as Variation;
    if (variation === VariationValue.Code) {
      return html`<code class="${this.getVariationClass(variation)}"
        ><slot
      /></code>`;
    }
    return html`<span class="${this.getVariationClass(variation)}">
      <button
        @click="${() => {
          toast.show({message: 'show toast from ui-text'});
        }}"
      >
        Show toast
      </button>
      <slot
    /></span>`;
  }
}

export function WebComponentsManual() {
  return (
    <ui-frame>
      <button onClick={() => toast.show({message: 'show toast from ui-text'})}>
        Show Toast
      </button>
      <p>
        <ui-text variation="positive">positive text style content</ui-text>
      </p>
      <p>
        <ui-text variation="negative">negative text style content</ui-text>
      </p>
      <p>
        <ui-text variation="subdued">subdued text style content</ui-text>
      </p>
      <p>
        <ui-text variation="code">code text style content</ui-text>
      </p>
    </ui-frame>
  );
}
