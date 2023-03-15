import {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  Caption,
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  Heading,
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  Subheading,
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  TextStyle,
  Text,
} from '@shopify/polaris';

declare const captionProps: {children: string};
declare const element: string;
declare function getVariation(): 'positive';

export function App() {
  return (
    <>
      <Text variant="heading4xl" as="p">
        DisplayText
      </Text>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Caption {...captionProps} />
      <Text variant="headingMd" as="h2">
        Heading - Default
      </Text>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Heading element="invalid">Heading - Invalid</Heading>
      <Text variant="headingMd" as="h2">
        Subheading - Default
      </Text>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Subheading element={element}>Subheading - Unknown</Subheading>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <TextStyle variation={getVariation()}>TextStyle - Unknown</TextStyle>
    </>
  );
}
