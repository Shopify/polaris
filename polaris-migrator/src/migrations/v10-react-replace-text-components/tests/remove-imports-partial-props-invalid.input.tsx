import {
  Caption,
  DisplayText,
  Heading,
  Subheading,
  TextStyle,
} from '@shopify/polaris';

declare const captionProps: {children: string};
declare const element: string;
declare function getVariation(): 'positive';

export function App() {
  return (
    <>
      <DisplayText size="extraLarge">DisplayText</DisplayText>
      <Caption {...captionProps} />
      <Heading>Heading - Default</Heading>
      <Heading element="invalid">Heading - Invalid</Heading>
      <Heading>Subheading - Default</Heading>
      <Subheading element={element}>Subheading - Unknown</Subheading>
      <TextStyle variation={getVariation()}>TextStyle - Unknown</TextStyle>
    </>
  );
}
