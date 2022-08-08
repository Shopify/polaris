import {VisuallyHidden} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function VisuallyHiddenExample() {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">
            <VisuallyHidden>Line item</VisuallyHidden>
          </th>
          <th scope="col">
            <VisuallyHidden>Value</VisuallyHidden>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Subtotal</th>
          <td>$184.13</td>
        </tr>
        <tr>
          <th scope="row">Tax</th>
          <td>$0.00</td>
        </tr>
        <tr>
          <th scope="row">Total</th>
          <td>$184.13</td>
        </tr>
      </tbody>
    </table>
  );
}

export default withPolarisExample(VisuallyHiddenExample);
