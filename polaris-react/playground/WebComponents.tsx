import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import reactToWebComponent from 'react-to-webcomponent';

import {TextStyle, Card} from '../src';

TextStyle.propTypes = {
  variation: PropTypes.string.isRequired,
  children: PropTypes.element,
};

Card.propTypes = {
  title: PropTypes.node,
};

const TextStyleWebComponent = reactToWebComponent(TextStyle, React, ReactDOM);
const CardWebComponent = reactToWebComponent(Card, React, ReactDOM);

customElements.define('text-style', TextStyleWebComponent);
customElements.define('ui-card', CardWebComponent);

export function WebComponents() {
  return (
    <div>
      <ui-card title="test title">card content </ui-card>
      <text-style variation="positive">text style content</text-style>
    </div>
  );
}
