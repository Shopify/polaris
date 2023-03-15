import {Inline, Text, Stack, Divider} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function InlineWithBlockAlignExample() {
  return (
    <Stack gap="8">
      <Inline gap="025" blockAlign="start">
        <Placeholder width="106px" label="Start" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Divider />
      <Inline gap="025" blockAlign="center">
        <Placeholder width="106px" label="Center" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Divider />
      <Inline gap="025" blockAlign="end">
        <Placeholder width="106px" label="End" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </Inline>
      <Divider />
      <Inline gap="025" blockAlign="baseline">
        <Placeholder width="106px" label="Baseline" />
        <Placeholder width="106px" padding="0" label="text" />
        <Placeholder width="106px" padding="0" label="text" />
        <Placeholder width="106px" padding="0" label="text" />
        <Placeholder width="106px" padding="0" label="text" />
        <Placeholder width="106px" padding="0" label="text" />
      </Inline>
      <Divider />
      <Inline gap="025" blockAlign="stretch">
        <Placeholder width="106px" label="Strech" />
        <Placeholder width="106px" minHeight="20px" />
        <Placeholder width="106px" minHeight="20px" />
        <Placeholder width="106px" minHeight="20px" />
        <Placeholder width="106px" minHeight="20px" />
        <Placeholder width="106px" minHeight="20px" />
      </Inline>
    </Stack>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  minHeight = 'auto',
  padding = '6px 0px',
  showBorder = false,
}) => {
  return (
    <div
      style={{
        padding: padding,
        background: '#20828D',
        height: height,
        width: width,
        minHeight: minHeight,
        borderInlineStart: showBorder ? '1px dashed #EAFAF3' : 'none',
      }}
    >
      <Inline align="center">
        <div
          style={{
            color: '#FFFFFF',
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};

export default withPolarisExample(InlineWithBlockAlignExample);
