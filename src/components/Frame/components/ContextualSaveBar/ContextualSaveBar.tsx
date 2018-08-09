import * as React from 'react';

import {classNames} from '@shopify/react-utilities/styles';
import {Button, Image, Stack, ContextualSaveBarProps} from '../../..';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import {getWidth} from '../../../../utilities/getWidth';

import * as styles from './ContextualSaveBar.scss';

export type Props = ContextualSaveBarProps;
export type CombinedProps = Props & WithAppProviderProps;

function ContextualSaveBar({
  message,
  visible,
  discardAction,
  saveAction,
  polaris: {
    theme: {logo},
    intl,
  },
}: CombinedProps) {
  const className = classNames(
    styles.ContextualSaveBar,
    visible && styles.visible,
  );

  const discardActionContent =
    discardAction && discardAction.content
      ? discardAction.content
      : intl.translate('Polaris.ContextualSaveBar.discard');

  const discardActionMarkup = discardAction && (
    <Button
      url={discardAction.url}
      onClick={discardAction.onAction}
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
    <Image style={{width}} source={logo.contextualSaveBarSource || ''} alt="" />
  );

  return (
    <div className={className}>
      <div className={styles.LogoContainer} style={{width}}>
        {imageMarkup}
      </div>
      <div className={styles.Contents}>
        <h2 className={styles.Message}>{message}</h2>
        <Stack spacing="tight" wrap={false}>
          {discardActionMarkup}
          {saveActionMarkup}
        </Stack>
      </div>
    </div>
  );
}

export default withAppProvider<Props>()(ContextualSaveBar);
