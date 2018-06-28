/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import HTML, {DOCTYPE} from '@shopify/react-html';

export default function render(scripts, data) {
  return DOCTYPE + renderToString(<HTML scripts={scripts} data={data} />);
}
