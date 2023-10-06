import {SearchMajor} from '@shopify/polaris-icons';
import {HTMLProps} from 'react';
import TextField from '../TextField';

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

function SearchField({onChange, ...props}: Props) {
  return (
    <TextField
      round
      type="search"
      onChange={onChange}
      icon={SearchMajor}
      {...props}
    />
  );
}

export default SearchField;
