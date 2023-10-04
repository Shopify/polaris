import {Link} from '@shopify/polaris';
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
    <Banner onDismiss={() => {}}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link url="">Let us know what you think</Link>
      </p>
    </Banner>
  );
}

export default withPolarisExample(BannerExample);
