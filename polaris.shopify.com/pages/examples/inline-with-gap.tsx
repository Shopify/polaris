import React from 'react';
import {Inline, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithGapExample() {
  return (
    <AlphaStack gap="8">
      <Inline blockAlign="center">
        <SpacingBackground width="436px">
          <Inline wrap={false}>
            <Placeholder width="106px" height="36px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
            <Placeholder width="106px" height="20px" />
          </Inline>
        </SpacingBackground>
      </Inline>
      <SpacingBackground width="212px">
        <Inline wrap={false}>
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
        background:
          'repeating-linear-gradient(-45deg, #7B47F1, #7B47F1 1px, #E8D1FA 1px, #E8D1FA 7px)',
        width: width ?? '100%',
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
        background: '#7B47F1',
        height: height,
        width: width,
      }}
    />
  );
};

export default withPolarisExample(InlineWithGapExample);
