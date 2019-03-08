import * as React from 'react';
import {UnstyledLink} from '@shopify/polaris';

import * as styles from './Item.scss';

interface Props {
  url?: string;
  id: string;
  accessibilityLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  tabIndex: number;
  onFocus: () => void;
  onBlur: () => void;
  onClick: (event: React.MouseEvent<any>) => void;
}

const Accessible = React.memo(function Accessible({
  url,
  id,
  accessibilityLabel,
  onFocus,
  onBlur,
  onClick,
  ariaControls,
  ariaExpanded,
  tabIndex,
}: Props) {
  return url ? (
    <UnstyledLink
      aria-describedby={id}
      aria-label={accessibilityLabel}
      className={styles.Link}
      url={url}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
    />
  ) : (
    <button
      type="button"
      className={styles.Button}
      aria-label={accessibilityLabel}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
    />
  );
});

export default Accessible;
