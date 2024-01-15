import {SearchIcon} from '@shopify/polaris-icons';
import {HTMLProps} from 'react';
import Icon from '../Icon';
import styles from './SearchField.module.scss';

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

function SearchField({onChange, ...props}: Props) {
  return (
    <div className={styles.SearchField}>
      <div className={styles.Icon}>
        <Icon source={SearchIcon} />
      </div>
      <input
        type="search"
        onChange={(evt) => {
          onChange && onChange(evt.target.value);
        }}
        {...props}
      />
    </div>
  );
}

export default SearchField;
