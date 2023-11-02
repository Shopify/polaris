import {
  Grid,
  GridCellProps,
  InlineGrid,
  InlineGridProps,
  Box,
} from '@shopify/polaris';
import {SpaceScale} from '@shopify/polaris-tokens';

import {Card} from '../../../Card';

import styles from './Mdx.module.css';
import {DirectiveCard, DirectiveStatusName} from '../DirectiveCard';

interface MdxCardProps {
  children: React.ReactNode;
  gap?: SpaceScale;
}

export const MdxCard = ({children, gap = '400'}: MdxCardProps) => (
  <div className={styles.MdxCard}>
    <Card>
      <Grid gap={{xs: gap}}>{children}</Grid>
    </Card>
  </div>
);

interface MdxColumnProps {
  children: React.ReactNode;
  span?: '1/3' | '2/3' | '1/2' | 'full';
  variant?: 'do' | 'dont' | 'caution' | 'tip';
}

export const MdxColumn = ({
  children,
  span = 'full',
  variant,
}: MdxColumnProps) => {
  const columnSpan: {
    [key in NonNullable<MdxColumnProps['span']>]: GridCellProps['columnSpan'];
  } = {
    '1/3': {xs: 6, lg: 4},
    '2/3': {xs: 6, lg: 8},
    '1/2': {xs: 6, lg: 6},
    full: {xs: 6, lg: 12},
  };

  const content = variant ? (
    <DirectiveCard minHeight="100%" status={statusMap[variant]}>
      {children}
    </DirectiveCard>
  ) : (
    <Box padding="400">{children}</Box>
  );

  return <Grid.Cell columnSpan={columnSpan[span]}>{content}</Grid.Cell>;
};

export const Section = ({children}: {children: React.ReactNode}) => (
  <div className={styles.Section}>
    <Card>{children}</Card>
  </div>
);

interface RowProps {
  children: React.ReactNode;
  variant?: '1' | '1-2' | '1-1' | '1-1-1';
}

export const Row = ({children, variant = '1-1-1'}: RowProps) => (
  <div className={styles.Row}>
    <InlineGrid gap="400" columns={rowVariantMap[variant]}>
      {children}
    </InlineGrid>
  </div>
);

const rowVariantMap: {
  [key in NonNullable<RowProps['variant']>]: InlineGridProps['columns'];
} = {
  '1': 1,
  '1-2': {xs: 1, lg: ['oneThird', 'twoThirds']},
  '1-1': {xs: 1, md: ['oneHalf', 'oneHalf']},
  '1-1-1': {xs: 1, lg: ['oneThird', 'oneThird', 'oneThird']},
};

interface ColumnProps {
  children: React.ReactNode;
  variant?: 'do' | 'dont' | 'caution' | 'tip' | 'directive';
}

export const Column = ({children, variant}: ColumnProps) =>
  variant ? (
    <DirectiveCard minHeight="100%" status={statusMap[variant]}>
      {children}
    </DirectiveCard>
  ) : (
    <Box padding="400">{children}</Box>
  );

const statusMap: {
  [key in NonNullable<ColumnProps['variant']>]: DirectiveStatusName | undefined;
} = {
  directive: undefined,
  do: DirectiveStatusName.Do,
  dont: DirectiveStatusName.Dont,
  caution: DirectiveStatusName.Caution,
  tip: DirectiveStatusName.Tip,
};
