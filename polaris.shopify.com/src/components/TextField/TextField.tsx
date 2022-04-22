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

interface WrappedTextFieldProps {
  renderTextField: (className: string) => React.ReactNode;
}

export function WrappedTextField({ renderTextField }: WrappedTextFieldProps) {
  return <>{renderTextField(styles.TextField)}</>;
}

export default TextField;
