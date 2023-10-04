import {List} from '@shopify/polaris';
import dynamic from 'next/dynamic';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

/**
 * For some reason when the Banner component is hydrated on the client the css
 * variables are incorrect, causing the top border-radius of the component to
 * not get set correctly. Disabling SSR via the documentation below resolves
 * this hydration issue, but I'm not sure what the root cause of this problem is.
 * This is a temporary fix until we can dig into things furthur
 *
 * To see the hydration error, remove lines 17-20 and import the Banner component
 * as you normally would. Then load the page with the banner component example
 * and open up the dev console.
 *
 * https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
 */
const Banner = dynamic(
  () => import('@shopify/polaris').then((polaris) => polaris.Banner),
  {ssr: false},
);

function BannerExample() {
  return (
    <Banner
      title="Before you can purchase a shipping label, this change needs to be made:"
      action={{content: 'Edit address'}}
      tone="warning"
    >
      <List>
        <List.Item>
          The name of the city you’re shipping to has characters that aren’t
          allowed. City name can only include spaces and hyphens.
        </List.Item>
      </List>
    </Banner>
  );
}

export default withPolarisExample(BannerExample);
