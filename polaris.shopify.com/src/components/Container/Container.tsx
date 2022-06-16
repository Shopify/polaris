import { HTMLProps } from "react";
import { className as classNameHelper } from "../../utils/various";
import styles from "./Container.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {}

function Container({ className, ...rest }: Props) {
  return (
    <div
      className={classNameHelper(styles.Container, className)}
      {...rest}
    ></div>
  );
}

export default Container;
