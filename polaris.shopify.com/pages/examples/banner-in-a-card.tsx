import {Card, TextContainer, Banner, Link} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerExample() {
  return (
    <Card title="Online store dashboard" sectioned>
      <TextContainer>
        <Banner onDismiss={() => {}}>
          <p>
            Use your finance report to get detailed information about your
            business. <Link url="">Let us know what you think</Link>
          </p>
        </Banner>

        <p>View a summary of your online store’s performance.</p>
      </TextContainer>
    </Card>
  );
}

export default withPolarisExample(BannerExample);
