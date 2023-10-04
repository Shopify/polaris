import {InlineGrid} from '@shopify/polaris';

export function ThreeColumns({children}: {children: React.ReactElement}) {
  return (
    <InlineGrid gap="400" columns={{xs: '1', md: '2', lg: '3'}}>
      {children}
    </InlineGrid>
  );
}
