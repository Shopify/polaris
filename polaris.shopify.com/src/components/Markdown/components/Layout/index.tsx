import React from 'react';
import {Box, Grid, GridCellProps} from '@shopify/polaris';
import {DirectiveCard, DirectiveStatusName} from '../DirectiveCard';
import {Card} from '../../../Card';
import styles from './Layout.module.css';
export function Section({
  children,
  card = false,
}: React.PropsWithChildren<{card?: boolean}>) {
  if (!!card) {
    return (
      <div className={styles.Section}>
        <Card>
          <Grid gap={{xs: '400'}}>{children}</Grid>
        </Card>
      </div>
    );
  }
  return (
    <div className={styles.Section}>
      <Grid gap={{xs: '400'}}>{children}</Grid>
    </div>
  );
}
export function Text({
  children,
  variant,
  offset,
}: React.PropsWithChildren<SpecificProps>) {
  return (
    <Column
      columnSpan={{xs: 6, md: 6, lg: 4}}
      variant={variant}
      offset={offset}
    >
      <Box padding="400">{children}</Box>
    </Column>
  );
}
export function Small({
  children,
  variant,
  offset,
}: React.PropsWithChildren<SpecificProps>) {
  return (
    <Column
      columnSpan={{xs: 6, md: 3, lg: 4}}
      variant={variant}
      offset={offset}
    >
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
      <Grid.Cell {...props}>
        <DirectiveCard minHeight="100%" status={statusMap[variant]}>
          {children}
        </DirectiveCard>
      </Grid.Cell>
    );
  }
  return <Grid.Cell {...props}>{children}</Grid.Cell>;
}
