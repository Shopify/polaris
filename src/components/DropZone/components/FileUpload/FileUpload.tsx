import * as React from 'react';
import capitalize from 'lodash/capitalize';
import {classNames} from '@shopify/react-utilities/styles';
import compose from '../../../../utilities/react-compose';
import withRef from '../../../WithRef';

import {Link, Icon, Stack, Button, Caption, TextStyle} from '../../..';
import withContext from '../../../WithContext';
import {Consumer} from '../Context';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';

import IconDragDrop from '../../icons/drag-drop.svg';
import AssetFileUpload from '../../images/file-upload.svg';
import AssetImageUpload from '../../images/image-upload.svg';

import {DropZoneContext} from '../../types';
import {WithContextTypes} from '../../../../types';

import * as styles from './FileUpload.scss';

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

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(props: Props) {
    this.updateStateFromProps(props);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.updateStateFromProps(this.props);
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
            <img className={imageClasses} src={AssetFileUpload} alt="" />
          )}
          {type === 'image' && (
            <img className={imageClasses} src={AssetImageUpload} alt="" />
          )}
          <Button>{actionTitle}</Button>
          <TextStyle variation="subdued">{actionHint}</TextStyle>
        </Stack>
      ) : null;

    const largeView =
      size === 'large' ? (
        <Stack vertical spacing="tight">
          {type === 'file' && (
            <img className={imageClasses} src={AssetFileUpload} alt="" />
          )}
          {type === 'image' && (
            <img className={imageClasses} src={AssetImageUpload} alt="" />
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
          <Icon source={IconDragDrop} color="inkLightest" />
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
