import * as React from 'react';

import {variationName, classNames} from '@shopify/react-utilities/styles';
import {Button, Image, Stack, ContextualSaveBarProps} from '../../..';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';

import * as styles from './ContextualSaveBar.scss';

export type Props = ContextualSaveBarProps;
export type CombinedProps = Props & WithAppProviderProps;

export function ContextualSaveBar({
  message,
  branding,
  visible,
  discardAction,
  saveAction,
  polaris: {intl},
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

  const imageMarkup = branding && (
    <Image source={branding.src} className={styles.Logo} alt="" />
  );

  const logoContainerClassName = classNames(
    styles.LogoContainer,
    branding && styles[variationName('logo', branding.id)],
  );

  return (
    <div className={className}>
      <div className={logoContainerClassName}>{imageMarkup}</div>
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
