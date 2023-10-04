import {BannerHandles} from '@shopify/polaris';
import dynamic from 'next/dynamic';
import React, {useRef, useEffect} from 'react';
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

function BannerWithFocusExample() {
  const banner = useRef<BannerHandles>(null);

  useEffect(() => banner.current?.focus(), []);

  return (
    <Banner
      title="High risk of fraud detected"
      onDismiss={() => {}}
      tone="critical"
      ref={banner}
    >
      <p>
        Before fulfilling this order or capturing payment, please review the
        fraud analysis and determine if this order is fraudulent
      </p>
    </Banner>
  );
}

export default withPolarisExample(BannerWithFocusExample);
