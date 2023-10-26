import React from 'react';
import {Grid, GridCellProps} from '@shopify/polaris';
import {DirectiveCard, DirectiveStatusName} from '../DirectiveCard';
import {Card} from '../../../Card';
export function Section({
  children,
  card = false,
}: React.PropsWithChildren<{card?: boolean}>) {
  if (!!card) {
    return (
      <Card>
        <Grid gap={{xs: '400'}}>{children}</Grid>
      </Card>
    );
  }
  return <Grid gap={{xs: '400'}}>{children}</Grid>;
}
export function Small({
  children,
  variant,
  offset,
}: React.PropsWithChildren<SpecificProps>) {
  return (
    <Column columnSpan={{xs: 6, lg: 4}} variant={variant} offset={offset}>
      {children}
    </Column>
  );
}
export function Medium({
  children,
  variant,
  offset,
}: React.PropsWithChildren<SpecificProps>) {
  return (
    <Column
      columnSpan={{xs: 6, md: 3, lg: 6}}
      variant={variant}
      offset={offset}
    >
      {children}
    </Column>
  );
}
export function Large({
  children,
  ...props
}: React.PropsWithChildren<SpecificProps>) {
  return (
    <Column columnSpan={{xs: 6, lg: 8}} {...props}>
      {children}
    </Column>
  );
}

export function ExtraLarge({children}: React.PropsWithChildren<SpecificProps>) {
  return <Column columnSpan={{xs: 6, lg: 12}}>{children}</Column>;
}
type SpecificProps = {
  variant?: 'do' | 'dont' | 'tip' | 'caution';
  offset?: boolean;
};
type ColumnProps = React.PropsWithChildren<GridCellProps & SpecificProps>;
function Column({children, variant, offset, ...props}: ColumnProps) {
  const statusMap = {
    do: DirectiveStatusName.Do,
    dont: DirectiveStatusName.Dont,
    tip: DirectiveStatusName.Tip,
    caution: DirectiveStatusName.Caution,
  };
  if (variant) {
    return (
      <Grid.Cell {...props} colStart={offset ? {lg: '5'} : undefined}>
        <DirectiveCard minHeight="100%" status={statusMap[variant]}>
          {children}
        </DirectiveCard>
      </Grid.Cell>
    );
  }
  return (
    <Grid.Cell {...props} colStart={offset ? {lg: '5'} : undefined}>
      {children}
    </Grid.Cell>
  );
}

// export function Text({children}: React.PropsWithChildren) {
//   return <Grid.Cell column={{lg: '4'}}>{children}</Grid.Cell>;
// }
