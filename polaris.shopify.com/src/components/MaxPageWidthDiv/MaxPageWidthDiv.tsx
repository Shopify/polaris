import { HTMLProps } from "react";
import { className as classNameHelper } from "../../utils/various";
import styles from "./MaxPageWidthDiv.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  padding?: boolean;
}

function MaxPageWidthDiv({ padding = true, className, ...rest }: Props) {
  return (
    <div
      className={classNameHelper(
        styles.MaxPageWidthDiv,
        padding && styles.padding,
        className
      )}
      {...rest}
    ></div>
  );
}

export default MaxPageWidthDiv;
