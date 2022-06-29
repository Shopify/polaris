import { HTMLProps } from "react";
import styles from "./SearchField.module.scss";

interface Props extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
}

function SearchField({ onChange, ...props }: Props) {
  return (
    <input
      type="search"
      className={styles.SearchField}
      onChange={(evt) => {
        onChange && onChange(evt.target.value);
      }}
      {...props}
    />
  );
}

export default SearchField;
