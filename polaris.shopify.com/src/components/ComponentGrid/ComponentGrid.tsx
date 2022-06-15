import Image from "../Image";
import Link from "next/link";
import { HighlightableSearchResult } from "../../types";
import { className, slugify } from "../../utils/various";
import styles from "./ComponentGrid.module.scss";

interface ComponentGridProps {
  children: React.ReactNode;
}

function ComponentGrid({ children }: ComponentGridProps) {
  return <ul className={styles.ComponentGrid}>{children}</ul>;
}

interface ComponentGridItemProps extends HighlightableSearchResult {
  name: string;
  description: string;
  url: string;
}

function ComponentGridItem({
  name,
  description,
  url,
  isHighlighted,
}: ComponentGridItemProps) {
  return (
    <li
      className={className(
        styles.Component,
        isHighlighted && styles.isHighlighted
      )}
      key={name}
    >
      <Link href={url} passHref>
        <a>
          <div className={styles.Preview}>
            <Image
              src={`/component-previews/${slugify(name)}.png`}
              layout="responsive"
              width={525 * 2}
              height={300 * 2}
              alt={`Screenshot of the ${name} component`}
            />
          </div>
          <div className={styles.ComponentDescription}>
            <h4>{name}</h4>
            <p>{description}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

ComponentGrid.Item = ComponentGridItem;

export default ComponentGrid;
