import React from "react";
import styles from "./Section.module.scss";

interface Props {
  children: React.ReactNode;
}

function Section({ children }: Props) {
  return <div className={styles.Section}>{children}</div>;
}

export default Section;
