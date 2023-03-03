import React from 'react';
import {Inline, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithGapExample() {
  return (
    <AlphaStack gap="4">
      <Inline>
        <SpacingBackground width="436px">
          <Inline gap="4" wrap={false}>
            <Placeholder width="106px" height="36px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
          </Inline>
        </SpacingBackground>
      </Inline>
      <SpacingBackground width="212px">
        <Inline gap="4" wrap={false}>
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
      </SpacingBackground>
    </AlphaStack>
  );
}

const SpacingBackground = ({children, width}) => {
  return (
    <div
      style={{
        display: 'flex',
        background: '#E0F8EE',
        width: width,
        height: '20px',
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
