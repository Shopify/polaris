import {Card as PolarisCard} from '@shopify/polaris';

const MyCard = PolarisCard;
export const LegacyCard = () => null;

export function App() {
  return (
    <>
      <PolarisCard>hello</PolarisCard>
      <MyCard>hello</MyCard>
    </>
  );
}
