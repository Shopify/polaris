import * as React from 'react';
import Icon, {Props as IconProps} from '../../../../../Icon';
import UnstyledLink from '../../../../../UnstyledLink';
import * as styles from './ActionItem.scss';

interface Props {
  tabIndex: number;
  onClick(): void;
  className: string;
  children?: string;
  icon?: IconProps['source'];
  url?: string;
}

function ActionItem({
  className,
  icon,
  url,
  children,
  onClick,
  tabIndex,
}: Props) {
  return url ? (
    <UnstyledLink
      url={url}
      key={children}
      className={className}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {icon && (
        <span className={styles.Icon}>
          <Icon source={icon} />
        </span>
      )}
      {children}
    </UnstyledLink>
  ) : (
    <button
      type="button"
      key={children}
      onClick={onClick}
      className={className}
      tabIndex={tabIndex}
    >
      {icon && (
        <span className={styles.Icon}>
          <Icon source={icon} />
        </span>
      )}
      {children}
    </button>
  );
}

export default ActionItem;
