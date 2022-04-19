import { HTMLProps } from "react";
import styles from "./TextField.module.scss";

interface Props extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
}

function TextField({ onChange, ...props }: Props) {
  return (
    <input
      className={styles.TextField}
      onChange={(evt) => {
        onChange && onChange(evt.target.value);
      }}
      {...props}
    />
  );
}

export default TextField;
