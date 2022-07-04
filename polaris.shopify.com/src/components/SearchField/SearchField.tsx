import { HTMLProps } from "react";
import Image from "../Image";
import styles from "./SearchField.module.scss";

interface Props extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
}

function SearchField({ onChange, ...props }: Props) {
  return (
    <div className={styles.SearchField}>
      <div className={styles.Icon}>
        <Image
          src="/icons/SearchMajor.svg"
          width={20}
          height={20}
          alt=""
          icon
        />
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
