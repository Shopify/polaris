/* eslint-disable import/extensions */
/* eslint-disable @shopify/strict-component-boundaries */
import React from 'react';
import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

import {Variation, VariationValue} from '../src/components/TextStyle/TextStyle';
// import as a function that type is (params: { css: typeof require('lit-element').css }) => CSSResult
import styles from '../src/components/TextStyle/TextStyle.scss';

import theme from './theme.scss';

@customElement('ui-theme')
export class UITheme extends LitElement {
  static styles = [theme];

  render() {
    return html`<slot />`;
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
    return html`<span class="${this.getVariationClass(variation)}"
      ><slot
    /></span>`;
  }
}

export function WebComponentsManual() {
  return (
    <ui-theme>
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
    </ui-theme>
  );
}
