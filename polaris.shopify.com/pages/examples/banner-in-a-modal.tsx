import {Button, Modal, TextContainer} from '@shopify/polaris';
import dynamic from 'next/dynamic';
import React, {useState, useCallback} from 'react';
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

function BannerInModalExample() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{height: '500px'}}>
      <Button onClick={handleChange}>Open</Button>
      <Modal
        open={active}
        onClose={handleChange}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <Banner action={{content: 'Connect account'}} tone="warning">
              <p>
                Connect your instagram account to your shop before proceeding.
              </p>
            </Banner>
            <p>
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default withPolarisExample(BannerInModalExample);
