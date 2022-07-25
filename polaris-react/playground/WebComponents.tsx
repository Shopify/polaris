import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import reactToWebComponent from 'react-to-webcomponent';

import {TextStyle} from '../src';

TextStyle.propTypes = {
  variation: PropTypes.string,
  children: PropTypes.element,
};

const TextStyleWebComponent = reactToWebComponent(TextStyle, React, ReactDOM);

customElements.define('text-style', TextStyleWebComponent);

export function WebComponents() {
  return (
    <div>
      <text-style variation="positive">text style content</text-style>
    </div>
  );
}
