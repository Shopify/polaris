import {Card, Scrollable} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ScrollableExample() {
  return (
    <Card title="Terms of service" sectioned>
      <Scrollable shadow style={{height: '100px'}} focusable>
        <p>
          By signing up for the Shopify service (“Service”) or any of the
          services of Shopify Inc. (“Shopify”) you are agreeing to be bound by
          the following terms and conditions (“Terms of Service”). The Services
          offered by Shopify under the Terms of Service include various products
          and services to help you create and manage a retail store, whether an
          online store (“Online Services”), a physical retail store (“POS
          Services”), or both. Any new features or tools which are added to the
          current Service shall be also subject to the Terms of Service. You can
          review the current version of the Terms of Service at any time at
          https://www.shopify.com/legal/terms. Shopify reserves the right to
          update and change the Terms of Service by posting updates and changes
          to the Shopify website. You are advised to check the Terms of Service
          from time to time for any updates or changes that may impact you.
        </p>
      </Scrollable>
    </Card>
  );
}

export default withPolarisExample(ScrollableExample);
