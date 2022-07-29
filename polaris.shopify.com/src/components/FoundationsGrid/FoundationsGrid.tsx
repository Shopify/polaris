import Link from "next/link";
import React from "react";
import { stripMarkdownLinks } from "../../utils/various";
import { useGlobalSearchResult } from "../GlobalSearch/GlobalSearch";
import styles from "./FoundationsGrid.module.scss";

interface Props {
  title?: string;
  children: React.ReactNode;
}

function FoundationsGrid({ title, children }: Props) {
  return (
    <div className={styles.FoundationsGrid}>
      <div key={title} className={styles.Category}>
        <div className={styles.Text}>
          {title && <h2>{title}</h2>}
          <ul>{children}</ul>
        </div>
      </div>
    </div>
  );
}

interface FoundationsGridItemProps {
  title: string;
  excerpt: string;
  url: string;
  icon: JSX.Element;
  category: string;
}

function FoundationsGridItem({
  title,
  excerpt,
  url,
  icon,
  category,
}: FoundationsGridItemProps) {
  const searchAttributes = useGlobalSearchResult();

  return (
    <li className={styles.FoundationsGridItem} data-category={category}>
      <Link href={url} passHref>
        <a {...searchAttributes}>
          <div className={styles.Icon}>{icon}</div>
          <h4>{title}</h4>
          <p>{stripMarkdownLinks(excerpt)}</p>
        </a>
      </Link>
    </li>
  );
}

FoundationsGrid.Item = FoundationsGridItem;

export default FoundationsGrid;
