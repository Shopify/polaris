import Image from "../Image";
import { className } from "../../utils/various";
import { SearchResultItem } from "../../types";
import styles from "./IconGrid.module.scss";
import { Icon } from "@shopify/polaris-icons/metadata";
import Link from "next/link";

interface IconGridProps {
  title?: string;
  children: React.ReactNode;
}

function IconGrid({ title, children }: IconGridProps) {
  return (
    <>
      {title ? <h2 className={styles.SectionHeading}>{title}</h2> : null}
      <div className={styles.IconGrid}>
        <ul className={styles.IconGridInner}>{children}</ul>
      </div>
    </>
  );
}

interface IconGridItemProps extends SearchResultItem {
  icon: Icon;
  query?: string;
  activeIcon?: string;
}

function IconGridItem({
  icon,
  activeIcon,
  query,
  searchResultData,
}: IconGridItemProps) {
  const { id, name, description } = icon;
  return (
    <li key={id}>
      <Link
        href={{
          pathname: "/icons",
          query: {
            icon: id,
            ...(query === "" ? {} : { q: query }),
          },
        }}
        scroll={false}
      >
        <a
          className={className(
            styles.Icon,
            activeIcon === id && styles.isSelected,
            searchResultData?.isHighlighted && styles.isSelected
          )}
          {...searchResultData?.itemAttributes}
          id={icon.id}
        >
          <Image
            src={`/icons/${id}.svg`}
            alt={description}
            width={20}
            height={20}
            icon
          />
          <p>{name}</p>
        </a>
      </Link>
    </li>
  );
}

IconGrid.Item = IconGridItem;

export default IconGrid;
