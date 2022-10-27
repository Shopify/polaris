import React from 'react';
import {Inline, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithSpacingExample() {
  return (
    <AlphaStack spacing="10">
      <SpacingBackground width="436px">
        <Inline>
          <Placeholder width="106px" height="36px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </Inline>
      </SpacingBackground>
      <SpacingBackground width="212px">
        <Inline>
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
        background:
          'repeating-linear-gradient(-45deg, #7B47F1, #7B47F1 1px, #E8D1FA 1px, #E8D1FA 7px)',
        width: width ?? '100%',
        height: '20px',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </div>
  );
};

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: '#7B47F1',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    />
  );
};

export default withPolarisExample(InlineWithSpacingExample);
