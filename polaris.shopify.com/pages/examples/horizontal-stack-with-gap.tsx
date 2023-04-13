import React from 'react';
import {HorizontalStack, VerticalStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithGapExample() {
  return (
    <VerticalStack>
      <HorizontalStack>
        <SpacingBackground width="436px" height="20px" margin>
          <HorizontalStack gap="4" wrap={false} blockAlign="center">
            <Placeholder width="106px" height="36px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
          </HorizontalStack>
        </SpacingBackground>
      </HorizontalStack>
      <SpacingBackground width="227.98px" height="40px">
        <HorizontalStack gap="4" wrap={false} blockAlign="end">
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </HorizontalStack>
      </SpacingBackground>
    </VerticalStack>
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
        background: 'var(--p-color-bg-success-subdued)',
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
