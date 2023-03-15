// @ts-nocheck
import { DisplayText } from '../DisplayText';
import {Heading} from '../Heading';
import {Subheading} from '../Subheading';
import {Caption} from '../Caption';
import {TextStyle} from '../TextStyle';
import {VisuallyHidden} from '../VisuallyHidden';

export function App() {
  return (
    <>
      <DisplayText size="invalid">Display text</DisplayText>
      <DisplayText size="extraLarge">Display text</DisplayText>
      <DisplayText size="large">Display text</DisplayText>
      <DisplayText size="medium">Display text</DisplayText>
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
      <VisuallyHidden>Hidden text</VisuallyHidden>
    </>
  );
}
