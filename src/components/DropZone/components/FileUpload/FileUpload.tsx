import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {DragDropMajorMonotone} from '@shopify/polaris-icons';

import {WithContextTypes} from '../../../../types';
import compose from '../../../../utilities/react-compose';
import capitalize from '../../../../utilities/capitalize';

import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import Link from '../../../Link';
import Icon from '../../../Icon';
import Stack from '../../../Stack';
import Button from '../../../Button';
import Caption from '../../../Caption';
import TextStyle from '../../../TextStyle';
import withContext from '../../../WithContext';
import withRef from '../../../WithRef';

import {DropZoneContext} from '../../types';
import {fileUpload, imageUpload} from '../../images';

import {Consumer} from '../Context';

import styles from './FileUpload.scss';

export interface State {
  actionTitle?: string;
  actionHint?: string;
}

export interface Props {
  actionTitle?: string;
  actionHint?: string;
}

export type CombinedProps = Props &
  WithAppProviderProps &
  WithContextTypes<DropZoneContext>;

export class FileUpload extends React.Component<CombinedProps, State> {
  static getDerivedStateFromProps(
    {
      actionTitle: nextActionTitle,
      actionHint: nextActionHint,
      polaris: {
        intl: {translate},
      },
      context: {type},
    }: CombinedProps,
    {actionTitle, actionHint}: State,
  ) {
    const hasActionTitleChanged = nextActionTitle !== actionTitle;
    const hasActionHintChanged = nextActionHint !== actionHint;

    if (!hasActionTitleChanged && !hasActionHintChanged) {
      return null;
    }

    const suffix = capitalize(type);

    return {
      actionTitle:
        nextActionTitle && hasActionTitleChanged
          ? nextActionTitle
          : translate(`Polaris.DropZone.FileUpload.actionTitle${suffix}`),
      actionHint:
        nextActionHint && hasActionHintChanged
          ? nextActionHint
          : translate(`Polaris.DropZone.FileUpload.actionHint${suffix}`),
    };
  }

  constructor(props: CombinedProps) {
    super(props);

    const {
      polaris: {
        intl: {translate},
      },
      context: {type},
    } = props;
    const suffix = capitalize(type);

    this.state = {
      actionTitle: translate(
        `Polaris.DropZone.FileUpload.actionTitle${suffix}`,
      ),
      actionHint: translate(`Polaris.DropZone.FileUpload.actionHint${suffix}`),
    };
  }

  render() {
    const {
      context: {size, type},
    } = this.props;
    const {actionTitle, actionHint} = this.state;
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
}

export default compose<Props>(
  withContext<Props, WithAppProviderProps, DropZoneContext>(Consumer),
  withAppProvider<Props>(),
  withRef<Props>(),
)(FileUpload);
