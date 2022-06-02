import React from "react";
import { useTOC } from "../../utils/hooks";
import { className, slugify } from "../../utils/various";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Nav, { NavItem } from "../Nav/Nav";
import styles from "./LeftNavLayout.module.scss";

interface Props {
  navItems: NavItem[];
  children: React.ReactNode
}

function LeftNavLayout({
  navItems,
  children
}: Props) {
  return (
    <MaxPageWidthDiv
      className={className(
        styles.LeftNavLayout,
      )}
    >
      <div className={styles.Nav}>
        {navItems && <Nav navItems={navItems} />}
      </div>

      {children}
    </MaxPageWidthDiv>
  );
}

export default LeftNavLayout;
