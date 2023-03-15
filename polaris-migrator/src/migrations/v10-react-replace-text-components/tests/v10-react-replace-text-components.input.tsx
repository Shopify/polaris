import type {TextStyleProps} from '@shopify/polaris';
import {
  DisplayText,
  Heading,
  Subheading,
  Caption,
  TextStyle,
  VisuallyHidden,
} from '@shopify/polaris';

const noop = (..._: any) => {};

export function App() {
  const textStyle = TextStyle;
  const textStyleProps: TextStyleProps = {
    variation: 'positive',
  };

  const MyDisplayText = DisplayText;

  noop(textStyle);

  return (
    <>
      <DisplayText size="extraLarge">Display text</DisplayText>
      <DisplayText size="large">Display text</DisplayText>
      <DisplayText size="medium">Display text</DisplayText>
      <DisplayText>Display text</DisplayText>
      <DisplayText size="small">Display text</DisplayText>
      <Heading element="h1">Heading</Heading>
      <Heading>Heading</Heading>
      <Subheading element="h2">Subheading</Subheading>
      <Subheading>Subheading</Subheading>
      <Caption>Caption</Caption>
      <TextStyle variation="strong">Strong</TextStyle>
      <TextStyle variation="positive">Positive</TextStyle>
      <TextStyle variation="negative">Negative</TextStyle>
      <TextStyle variation="warning">Warning</TextStyle>
      <TextStyle variation="code">Code</TextStyle>
      <TextStyle>
        <TextStyle variation="code">Code</TextStyle>
      </TextStyle>
      <TextStyle variation={Math.random() > 0.5 ? 'positive' : 'negative'}>
        Code
      </TextStyle>
      <TextStyle {...textStyleProps}>Positive</TextStyle>
      <VisuallyHidden>Hidden text</VisuallyHidden>
      <MyDisplayText />
    </>
  );
}
