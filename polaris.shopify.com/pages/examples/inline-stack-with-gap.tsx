import React from 'react';
import {InlineStack, BlockStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithGapExample() {
  return (
    <BlockStack>
      <InlineStack>
        <SpacingBackground width="436px" height="20px" margin>
          <InlineStack gap="400" wrap={false} blockAlign="center">
            <Placeholder width="106px" height="36px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
          </InlineStack>
        </SpacingBackground>
      </InlineStack>
      <SpacingBackground width="227.98px" height="40px">
        <InlineStack gap="400" wrap={false} blockAlign="end">
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </InlineStack>
      </SpacingBackground>
    </BlockStack>
  );
}

const SpacingBackground = ({
  children,
  width,
  height,
  margin = false,
}: {
  children: React.ReactNode;
  width: string;
  height: string;
  margin?: boolean;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--p-color-bg-surface-success)',
        width: width,
        height: height,
        marginBlockEnd: margin ? '8px' : 'none',
      }}
    >
      {children}
    </div>
  );
};

const Placeholder = ({height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
      }}
    />
  );
};

export default withPolarisExample(InlineWithGapExample);
