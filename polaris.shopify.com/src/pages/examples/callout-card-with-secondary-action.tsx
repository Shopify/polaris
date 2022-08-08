import {CalloutCard} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function Example() {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{content: 'Customize checkout'}}
      secondaryAction={{content: 'Learn more about customizing checkout'}}
    >
      <p>Upload your store’s logo, change colors and fonts, and more.</p>
    </CalloutCard>
  );
}

export default withPolarisExample(Example);
