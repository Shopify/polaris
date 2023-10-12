import {Grid, GridCellProps} from '@shopify/polaris';
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
    children
  );

  return <Grid.Cell columnSpan={columnSpan[span]}>{content}</Grid.Cell>;
};

const statusMap: {
  [key in NonNullable<MdxColumnProps['variant']>]: DirectiveStatusName;
} = {
  do: DirectiveStatusName.Do,
  dont: DirectiveStatusName.Dont,
  caution: DirectiveStatusName.Caution,
  tip: DirectiveStatusName.Tip,
};
