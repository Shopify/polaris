import {TextContainer, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextContainerExample() {
  return (
    <TextContainer spacing="tight">
      <Text variant="headingMd" as="h2">
        Install the Shopify POS App
      </Text>
      <p>
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </p>
    </TextContainer>
  );
}

export default withPolarisExample(TextContainerExample);
