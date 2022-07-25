/* eslint-disable @shopify/strict-component-boundaries */
import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';

import {TextStyle} from '../components/TextStyle';

const TextStyleWebComponent = reactToWebComponent(TextStyle, React, ReactDOM);

customElements.define('text-style', TextStyleWebComponent);
