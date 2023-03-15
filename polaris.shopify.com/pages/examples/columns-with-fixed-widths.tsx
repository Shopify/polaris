import {Columns, Text, Inline} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ColumnsWithFreeAndFixedWidthsExample() {
  return (
    <Columns columns={['oneThird', 'twoThirds']} gap="025">
      <Placeholder height="320px" label="oneThird" />
      <Placeholder height="320px" label="twoThirds" />
    </Columns>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        display: 'inherit',
        background: '#20828D',
        height: height ?? undefined,
        width: width ?? undefined,
      }}
    >
      <Inline gap="4" align="center" blockAlign="center">
        <div
          style={{
            color: '#FFFFFF',
            width: width ?? undefined,
          }}
        >
          <Text as="h2" variant="bodyMd" fontWeight="medium" alignment="center">
            {label}
          </Text>
        </div>
      </Inline>
    </div>
  );
};

export default withPolarisExample(ColumnsWithFreeAndFixedWidthsExample);
