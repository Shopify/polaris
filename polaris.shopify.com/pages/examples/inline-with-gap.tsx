import React from 'react';
import {Inline, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithGapExample() {
  return (
    <AlphaStack>
      <Inline>
        <SpacingBackground width="436px" height="20px" margin>
          <Inline gap="4" wrap={false} blockAlign="center">
            <Placeholder width="106px" height="36px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
          </Inline>
        </SpacingBackground>
      </Inline>
      <SpacingBackground width="227.98px" height="40px">
        <Inline gap="4" wrap={false} blockAlign="end">
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
      </SpacingBackground>
    </AlphaStack>
  );
}

const SpacingBackground = ({children, width, height, margin = false}) => {
  return (
    <div
      style={{
        display: 'flex',
        background: '#E0F8EE',
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
        background: '#20828D',
        height: height,
        width: width,
      }}
    />
  );
};

export default withPolarisExample(InlineWithGapExample);
