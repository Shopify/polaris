import {InlineGrid, InlineGridProps} from '@shopify/polaris';

import {Card} from '../../../Card';

import styles from './Mdx.module.css';
import {DirectiveCard, DirectiveStatusName} from '../DirectiveCard';

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
    <div>{children}</div>
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
