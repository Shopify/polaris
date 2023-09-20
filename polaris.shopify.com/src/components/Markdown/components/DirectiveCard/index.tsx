import {Icon, Bleed} from '@shopify/polaris';
import {
  CancelSmallMinor,
  FlagMajor,
  RiskMajor,
  TickSmallMinor,
} from '@shopify/polaris-icons';

import {Box} from '../../../Box';
import {Card} from '../../../Card';
import {Stack, Row} from '../../../Stack';
import ImageThumbnail from '../../../ThumbnailPreview';
import styles from './styles.module.scss';

export enum DirectiveStatusName {
  Do = 'Do',
  Dont = "Don't",
  Caution = 'Caution',
  Tip = 'Tip',
}

export type DirectiveStatus = DirectiveStatusName;
type DirectiveProps = React.PropsWithChildren<{
  status: DirectiveStatus;
  img?: string;
}>;
export const DirectiveCard = ({children, status, img}: DirectiveProps) => {
  return (
    <Card>
      {img ? (
        <Stack gap="4">
          <Bleed marginInline="4" marginBlockStart="4">
            <ImageThumbnail className={styles.ImageThumbnail} src={img} />
          </Bleed>
          <Stack gap="2">
            <Pill status={status} />
            {children}
          </Stack>
        </Stack>
      ) : (
        <Stack gap="2">
          <Pill status={status} />
          {children}
        </Stack>
      )}
    </Card>
  );
};

export const Pill = ({status}: {status: DirectiveStatus}) => {
  const iconMap = {
    Do: TickSmallMinor,
    ["Don't"]: CancelSmallMinor,
    Caution: RiskMajor,
    Tip: FlagMajor,
  };
  return (
    <Box className={styles.Pill} data-value={status.toLowerCase()}>
      <Row>
        <Icon source={iconMap[status]} />
        {status}
      </Row>
    </Box>
  );
};
