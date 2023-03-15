import type {HeadingProps} from '@shopify/polaris';
import {Subheading} from '@shopify/polaris';

const MyHeading = (_props: HeadingProps) => {
  return null;
};

export function App() {
  const headingProps: HeadingProps = {
    element: 'h3',
  };

  return (
    <>
      <Subheading>Subheading</Subheading>
      <MyHeading {...headingProps} />
    </>
  );
}
