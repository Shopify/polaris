import {Children, ReactElement} from 'react';
import {Icon, Bleed} from '@shopify/polaris';
import {
  CancelSmallMinor,
  FlagMajor,
  RiskMajor,
  TickSmallMinor,
} from '@shopify/polaris-icons';

import {Box} from '../../../Box';
import {Card, CardProps} from '../../../Card';
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
interface DirectiveCardProps extends CardProps {
  status?: DirectiveStatus;
}
type DirectiveProps = React.PropsWithChildren<DirectiveCardProps>;
export const DirectiveCard = ({children, status, ...props}: DirectiveProps) => {
  const childrenArray = Children.toArray(children) as ReactElement[];

  let image: ReactElement | undefined;
  let video: ReactElement | undefined;

  const rest = childrenArray.filter((d) => {
    const isImage = d?.props?.src;
    const isVideo = d?.type === 'video';

    if (isImage) {
      image = d;
    }

    if (isVideo) {
      video = d;
    }

    return !isImage && !isVideo;
  });

  return (
    <Card {...props}>
      <Stack gap={Boolean(image || video) ? '400' : '0'}>
        {image ? <MediaThumbnail media={image} type="image" /> : null}
        {video ? <MediaThumbnail media={video} type="video" /> : null}
        <Stack gap="200">
          {status ? <Pill status={status} /> : null}
          {rest}
        </Stack>
      </Stack>
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

const MediaThumbnail = ({
  media,
  type = 'image',
}: {
  media: ReactElement;
  type: 'image' | 'video';
}) => {
  return (
    <Bleed marginInline="400" marginBlockStart="400">
      {type === 'image' ? (
        <ImageThumbnail
          className={styles.MediaThumbnail}
          src={media?.props?.src}
          alt={media?.props?.alt}
          aspectRatio="4:3"
        />
      ) : (
        <div className={styles.MediaThumbnail}>{media}</div>
      )}
    </Bleed>
  );
};
