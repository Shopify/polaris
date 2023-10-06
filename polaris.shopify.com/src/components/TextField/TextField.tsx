import {HTMLProps} from 'react';
import Icon from '../Icon';
import styles from './TextField.module.scss';

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
  icon?: React.ElementType;
  round?: boolean;
}

export default function TextField({onChange, icon, round, ...props}: Props) {
  const iconMarkup = icon ? (
    <div className={styles.Icon}>
      <Icon source={icon} />
    </div>
  ) : null;

  return (
    <div className={styles.TextField}>
      {iconMarkup}
      <input
        className={round ? styles.round : undefined}
        type="text"
        onChange={(evt) => {
          onChange && onChange(evt.target.value);
        }}
        {...props}
      />
    </div>
  );
}
