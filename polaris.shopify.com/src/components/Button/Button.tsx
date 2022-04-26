import { HTMLProps } from "react";
import styles from "./Button.module.scss";

interface Props extends HTMLProps<HTMLButtonElement> {
  small?: boolean;
  pill?: boolean;
  children: React.ReactNode;
}

function Button({ small, pill, children, ...rest }: Props) {
  return (
    <button
      className={[
        styles.Button,
        small ? styles.small : null,
        pill ? styles.pill : null,
      ].join(" ")}
      {...rest}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
