import {InlineGrid} from '@shopify/polaris';

export function TwoColumns({children}: {children: React.ReactElement}) {
  return (
    <InlineGrid gap="400" columns={{xs: '1', md: '2'}}>
      {children}
    </InlineGrid>
  );
}
