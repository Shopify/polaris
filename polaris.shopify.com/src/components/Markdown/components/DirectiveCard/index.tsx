import {Children, ReactElement} from 'react';
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
}>;
export const DirectiveCard = ({children, status}: DirectiveProps) => {
  const childrenArray = Children.toArray(children) as ReactElement[];

  let image: ReactElement | undefined;

  const rest = childrenArray.filter((d) => {
    if (d?.props?.src) {
      image = d;
    }

    return !d?.props?.src;
  });

  return (
    <Card>
      {image?.props?.src ? (
        <Stack gap="4">
          <Bleed marginInline="4" marginBlockStart="4">
            <ImageThumbnail
              className={styles.ImageThumbnail}
              src={image?.props?.src}
              alt={image?.props?.alt}
            />
          </Bleed>
          <Stack gap="2">
            <Pill status={status} />
            {rest}
          </Stack>
        </Stack>
      ) : (
        <Stack gap="2">
          <Pill status={status} />
          {rest}
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
