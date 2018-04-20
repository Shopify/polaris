import * as React from 'react';
import {render} from 'react-dom';
import * as Polaris from '@shopify/polaris';

function renderPlayground() {
  render(
    <Polaris.Page title="Shrink Ray Test Page" />,
    document.getElementById('root'),
  );
}
