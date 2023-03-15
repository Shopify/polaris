import type {TextStyleProps} from '@shopify/polaris';

const MyTextStyle = (_props: TextStyleProps) => {
  return null;
};

export function App() {
  const textStyleProps: TextStyleProps = {
    variation: 'positive',
  };

  return <MyTextStyle {...textStyleProps} />;
}
