import type {CaptionProps} from '@shopify/polaris';
import {Caption, DisplayText} from '@shopify/polaris';

declare function MyCaption(props: CaptionProps): JSX.Element;

export function App() {
  return (
    <>
      <MyCaption>MyCaption</MyCaption>
      <Caption>Caption</Caption>
      <DisplayText size="extraLarge">DisplayText</DisplayText>
    </>
  );
}
