import Image from "../Image";
import { className } from "../../utils/various";
import styles from "./IconGrid.module.scss";
import { Icon } from "@shopify/polaris-icons/metadata";
import Link from "next/link";

interface Props {
  title?: string;
  icons: Icon[];
  activeIcon?: string;
  query?: string;
}

function IconGrid({ title, icons, activeIcon, query = "" }: Props) {
  return (
    <>
      {title ? <h2 className={styles.SectionHeading}>{title}</h2> : null}
      <div className={styles.IconGrid}>
        <ul className={styles.IconGridInner}>
          {Object.values(icons).map(({ id, description, name }) => (
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
                    activeIcon === id && styles.isSelected
                  )}
                >
                  <Image
                    src={`/icons/${id}.svg`}
                    alt={description}
                    width={20}
                    height={20}
                    fadeIn={false}
                  />
                  <p>{name}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default IconGrid;
