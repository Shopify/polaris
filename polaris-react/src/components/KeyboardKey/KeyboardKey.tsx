import {classNames} from '../../utilities/css';

import styles from './KeyboardKey.scss';

type Size = 'small';

export interface KeyboardKeyProps {
  children?: string;
  size?: Size;
}
export function KeyboardKey({children = '', size}: KeyboardKeyProps) {
  const key =
    !size && children.length > 1
      ? children.toLowerCase()
      : children.toUpperCase();

  const className = classNames(styles.KeyboardKey, size && styles[size]);

  return <kbd className={className}>{key}</kbd>;
}
