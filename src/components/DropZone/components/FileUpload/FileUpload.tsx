import React, {useContext} from 'react';
import {DragDropMajorMonotone} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {capitalize} from '../../../../utilities/capitalize';

import Link from '../../../Link';
import Icon from '../../../Icon';
import Stack from '../../../Stack';
import Button from '../../../Button';
import Caption from '../../../Caption';
import TextStyle from '../../../TextStyle';

import {fileUpload, imageUpload} from '../../images';

import DropZoneContext from '../../context';
import {usePolaris} from '../../../../hooks';

import styles from './FileUpload.scss';

export interface Props {
  actionTitle?: string;
  actionHint?: string;
}

export default function FileUpload(props: Props) {
  const {
    intl: {translate},
  } = usePolaris();
  const {size, type} = useContext(DropZoneContext);
  const suffix = capitalize(type);
  const {
    actionTitle = translate(`Polaris.DropZone.FileUpload.actionTitle${suffix}`),
    actionHint = translate(`Polaris.DropZone.FileUpload.actionHint${suffix}`),
  } = props;
  const imageClasses = classNames(
    styles.Image,
    size && size === 'extraLarge' && styles.sizeExtraLarge,
    size && size === 'large' && styles.sizeLarge,
  );

  const extraLargeView =
    size === 'extraLarge' ? (
      <Stack vertical>
        {type === 'file' && (
          <img className={imageClasses} src={fileUpload} alt="" />
        )}
        {type === 'image' && (
          <img className={imageClasses} src={imageUpload} alt="" />
        )}
        <Button>{actionTitle}</Button>
        <TextStyle variation="subdued">{actionHint}</TextStyle>
      </Stack>
    ) : null;

  const largeView =
    size === 'large' ? (
      <Stack vertical spacing="tight">
        {type === 'file' && (
          <img className={imageClasses} src={fileUpload} alt="" />
        )}
        {type === 'image' && (
          <img className={imageClasses} src={imageUpload} alt="" />
        )}
        <Button size="slim">{actionTitle}</Button>
        <Caption>
          <TextStyle variation="subdued">{actionHint}</TextStyle>
        </Caption>
      </Stack>
    ) : null;

  const mediumView =
    size === 'medium' ? (
      <Stack vertical spacing="tight">
        <Link>{actionTitle}</Link>
        <Caption>
          <TextStyle variation="subdued">{actionHint}</TextStyle>
        </Caption>
      </Stack>
    ) : null;

  const smallView =
    size === 'small' ? (
      <Stack vertical spacing="tight">
        <Icon source={DragDropMajorMonotone} color="inkLightest" />
      </Stack>
    ) : null;

  return (
    <div className={styles.FileUpload}>
      {smallView}
      {mediumView}
      {largeView}
      {extraLargeView}
    </div>
  );
}
