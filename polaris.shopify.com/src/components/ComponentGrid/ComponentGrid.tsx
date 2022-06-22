import Image from "../Image";
import Link from "next/link";
import { SearchResultItem } from "../../types";
import { className, slugify } from "../../utils/various";
import styles from "./ComponentGrid.module.scss";

interface ComponentGridProps {
  children: React.ReactNode;
}

function ComponentGrid({ children }: ComponentGridProps) {
  return <ul className={styles.ComponentGrid}>{children}</ul>;
}

interface ComponentGridItemProps extends SearchResultItem {
  name: string;
  description: string;
  url: string;
}

function ComponentGridItem({
  name,
  description,
  url,
  searchResultData,
}: ComponentGridItemProps) {
  return (
    <li
      key={name}
      className={className(
        styles.Component,
        searchResultData?.isHighlighted && styles.isHighlighted
      )}
      {...searchResultData?.itemAttributes}
    >
      <Link href={url} passHref>
        <a tabIndex={searchResultData?.tabIndex}>
          <div className={styles.Preview}>
            <Image
              src={`/component-previews/${slugify(name)}.png`}
              layout="responsive"
              width={525}
              height={300}
              quality={70}
              sizes="300px"
              alt={`Screenshot of the ${name} component`}
              lazyBoundary="1000px"
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
