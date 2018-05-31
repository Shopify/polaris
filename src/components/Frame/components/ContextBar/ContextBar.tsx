import * as React from 'react';

import {variationName, classNames} from '@shopify/react-utilities/styles';
import {Button, Image, Stack, ContextBarProps} from '../../../';

import * as styles from './ContextBar.scss';

export type Props = ContextBarProps;

export default function ContextBar({
  message,
  branding,
  visible,
  cancelAction,
  primaryAction,
}: Props) {
  const className = classNames(styles.ContextBar, visible && styles.visible);
  const cancelActionMarkup = cancelAction && (
    <Button
      url={cancelAction.url}
      onClick={cancelAction.onAction}
      loading={cancelAction.loading}
      disabled={cancelAction.disabled}
      accessibilityLabel={cancelAction.content}
    >
      {cancelAction.content}
    </Button>
  );

  const primaryActionMarkup = primaryAction && (
    <Button
      primary
      url={primaryAction.url}
      onClick={primaryAction.onAction}
      loading={primaryAction.loading}
      disabled={primaryAction.disabled}
      accessibilityLabel={primaryAction.content}
    >
      {primaryAction.content}
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
          {cancelActionMarkup}
          {primaryActionMarkup}
        </Stack>
      </div>
    </div>
  );
}
