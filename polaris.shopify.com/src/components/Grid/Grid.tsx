import React from "react";
import styles from "./Grid.module.scss";

export class Grid extends React.Component<{
  center?: boolean;
  children: React.ReactNode;
}> {
  static Column = Column;

  render() {
    return (
      <div
        className={[
          styles.Grid,
          this.props.center ? styles.Centered : null,
        ].join(" ")}
      >
        {this.props.children}
      </div>
    );
  }
}

function Column({
  start,
  end,
  children,
}: {
  start: number;
  end: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ gridColumnStart: start, gridColumnEnd: end }}>{children}</div>
  );
}

export default Grid;
