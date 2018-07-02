/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import HTML, {DOCTYPE} from '@shopify/react-html';

export default function render(scripts, data) {
  return (
    DOCTYPE +
    renderToString(
      <HTML scripts={scripts} data={data}>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
        />
      </HTML>,
    )
  );
}
