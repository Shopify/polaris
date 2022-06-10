import { HTMLProps } from "react";
import { className as classNameHelper } from "../../utils/various";
import styles from "./Container.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  width?: "wide" | "medium";
}

function Container({ width = "wide", className, ...rest }: Props) {
  return (
    <div
      className={classNameHelper(
        styles.Container,
        width === "medium" && styles.medium,
        className
      )}
      {...rest}
    ></div>
  );
}

export default Container;
