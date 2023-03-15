import {Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithBorderRadiusExample() {
  return (
    <Box background="surface" borderRadius="2">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: '#BBD4F7',
        height: height,
        width: width,
        borderRadius: 'inherit',
      }}
    >
      <div
        style={{
          color: '#1F2124',
        }}
      >
        <Text as="h2" variant="bodyMd" fontWeight="medium">
          {label}
        </Text>
      </div>
    </div>
  );
};

export default withPolarisExample(BoxWithBorderRadiusExample);
