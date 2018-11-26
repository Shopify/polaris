import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {getWidth} from '../../../../utilities/getWidth';

import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import Button from '../../../Button';
import {ContextualSaveBarProps} from '../../../ContextualSaveBar';
import Image from '../../../Image';
import Stack from '../../../Stack';

import {DiscardConfirmationModal} from './components';

import * as styles from './ContextualSaveBar.scss';

export type Props = ContextualSaveBarProps;
export type CombinedProps = Props & WithAppProviderProps;

export interface State {
  discardConfirmationModalVisible: boolean;
}

class ContextualSaveBar extends React.PureComponent<CombinedProps, State> {
  state: State = {
    discardConfirmationModalVisible: false,
  };

  render() {
    const {discardConfirmationModalVisible} = this.state;

    const {
      alignContentFlush,
      message,
      discardAction,
      saveAction,
      polaris: {
        theme: {logo},
        intl,
      },
    } = this.props;

    const discardActionContent =
      discardAction && discardAction.content
        ? discardAction.content
        : intl.translate('Polaris.ContextualSaveBar.discard');

    let discardActionHandler;
    if (discardAction && discardAction.discardConfirmationModal) {
      discardActionHandler = this.toggleDiscardConfirmationModal;
    } else if (discardAction) {
      discardActionHandler = discardAction.onAction;
    }

    const discardConfirmationModalMarkup = discardAction &&
      discardAction.onAction &&
      discardAction.discardConfirmationModal && (
        <DiscardConfirmationModal
          open={discardConfirmationModalVisible}
          onCancel={this.toggleDiscardConfirmationModal}
          onDiscard={discardAction.onAction}
        />
      );

    const discardActionMarkup = discardAction && (
      <Button
        url={discardAction.url}
        onClick={discardActionHandler}
        loading={discardAction.loading}
        disabled={discardAction.disabled}
        accessibilityLabel={discardAction.content}
      >
        {discardActionContent}
      </Button>
    );

    const saveActionContent =
      saveAction && saveAction.content
        ? saveAction.content
        : intl.translate('Polaris.ContextualSaveBar.save');

    const saveActionMarkup = saveAction && (
      <Button
        primary
        url={saveAction.url}
        onClick={saveAction.onAction}
        loading={saveAction.loading}
        disabled={saveAction.disabled}
        accessibilityLabel={saveAction.content}
      >
        {saveActionContent}
      </Button>
    );

    const width = getWidth(logo, 104);

    const imageMarkup = logo && (
      <Image
        style={{width}}
        source={logo.contextualSaveBarSource || ''}
        alt=""
      />
    );

    const logoMarkup = alignContentFlush ? null : (
      <div className={styles.LogoContainer} style={{width}}>
        {imageMarkup}
      </div>
    );

    return (
      <React.Fragment>
        <div className={styles.ContextualSaveBar}>
          {logoMarkup}
          <div className={styles.Contents}>
            <h2 className={styles.Message}>{message}</h2>
            <Stack spacing="tight" wrap={false}>
              {discardActionMarkup}
              {saveActionMarkup}
            </Stack>
          </div>
        </div>
        {discardConfirmationModalMarkup}
      </React.Fragment>
    );
  }

  @autobind
  private toggleDiscardConfirmationModal() {
    this.setState((prevState) => ({
      discardConfirmationModalVisible: !prevState.discardConfirmationModalVisible,
    }));
  }
}

export default withAppProvider<Props>()(ContextualSaveBar);
