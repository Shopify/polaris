import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

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

import {DropZoneContext, Size} from '../../types';
import {dragDrop} from '../../icons';
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

  updateStateFromProps(props: Props) {
    const {actionTitle, actionHint} = this.state;

    if (props.actionTitle && props.actionTitle !== actionTitle) {
      this.setState({actionTitle: props.actionTitle});
    }

    if (props.actionHint && props.actionHint !== actionHint) {
      this.setState({actionHint: props.actionHint});
    }
  }

  componentWillReceiveProps(props: Props) {
    this.updateStateFromProps(props);
  }

  componentWillMount() {
    this.updateStateFromProps(this.props);
  }

  render() {
    const fileUploadMarkup = this.renderFileUploadMarkup();

    return <div className={styles.FileUpload}>{fileUploadMarkup}</div>;
  }

  private renderFileUploadMarkup() {
    const {
      context: {width, height, type},
    } = this.props;

    const {actionTitle, actionHint} = this.state;
    const imageClasses = classNames(
      styles.Image,
      width === Size.ExtraLarge && styles.sizeExtraLarge,
      width === Size.Large && styles.sizeLarge,
    );

    const fileType = type === 'file';
    const imageType = type === 'image';

    const size = Math.min(width, height);
    switch (size) {
      case Size.ExtraLarge:
        return (
          <Stack vertical>
            {fileType && (
              <img className={imageClasses} src={fileUpload} alt="" />
            )}
            {imageType && (
              <img className={imageClasses} src={imageUpload} alt="" />
            )}
            <Button>{actionTitle}</Button>
            <TextStyle variation="subdued">{actionHint}</TextStyle>
          </Stack>
        );
      case Size.Large:
        return (
          <Stack vertical spacing="tight">
            {fileType && (
              <img className={imageClasses} src={fileUpload} alt="" />
            )}
            {imageType && (
              <img className={imageClasses} src={imageUpload} alt="" />
            )}
            <Button size="slim">{actionTitle}</Button>
            <Caption>
              <TextStyle variation="subdued">{actionHint}</TextStyle>
            </Caption>
          </Stack>
        );
      case Size.Medium:
        return (
          <Stack vertical spacing="tight">
            <Link>{actionTitle}</Link>
            <Caption>
              <TextStyle variation="subdued">{actionHint}</TextStyle>
            </Caption>
          </Stack>
        );
      case Size.Small:
        return (
          <Stack vertical spacing="tight">
            <Icon source={dragDrop} color="inkLightest" />
          </Stack>
        );
    }
  }
}

export default compose<Props>(
  withContext<Props, WithAppProviderProps, DropZoneContext>(Consumer),
  withAppProvider<Props>(),
  withRef<Props>(),
)(FileUpload);
