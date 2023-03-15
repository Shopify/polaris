import {Caption, DisplayText} from '@shopify/polaris';

export function App() {
  const MyCaption = Caption;

  return (
    <>
      <MyCaption>MyCaption</MyCaption>
      <Caption>Caption</Caption>
      <DisplayText size="extraLarge">DisplayText</DisplayText>
    </>
  );
}
