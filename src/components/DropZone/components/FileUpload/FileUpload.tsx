import * as React from 'react';
import * as PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

import Link from '../../../Link';
import Icon from '../../../Icon';
import Stack from '../../../Stack';
import Button from '../../../Button';
import Caption from '../../../Caption';
import TextStyle from '../../../TextStyle';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';

import IconDragDrop from '../../icons/drag-drop.svg';
import AssetFileUpload from '../../images/file-upload.svg';
import AssetImageUpload from '../../images/image-upload.svg';

import {DropZoneContext} from '../../types';

import * as styles from './FileUpload.scss';

export interface State {
  actionTitle?: string;
  actionHint?: string;
}

export interface Props {
  actionTitle?: string;
  actionHint?: string;
}

export type CombinedProps = Props & WithAppProviderProps;

export class FileUpload extends React.Component<CombinedProps, State> {
  public static contextTypes = {
    size: PropTypes.string,
    type: PropTypes.string,
  };

  constructor(props: CombinedProps, context: DropZoneContext) {
    super(props);

    const {type} = context;
    const suffix = capitalize(type);
    const {polaris: {intl: {translate}}} = props;

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
    const {size, type} = this.context;
    const {actionTitle, actionHint} = this.state;

    const largeView =
      size === 'large' ? (
        <Stack vertical>
          {type === 'file' && (
            <img className={styles.Image} src={AssetFileUpload} alt="" />
          )}
          {type === 'image' && (
            <img className={styles.Image} src={AssetImageUpload} alt="" />
          )}
          <Button>{actionTitle}</Button>
          <TextStyle variation="subdued">{actionHint}</TextStyle>
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
      </div>
    );
  }
}

export default withAppProvider<Props>()(FileUpload);
