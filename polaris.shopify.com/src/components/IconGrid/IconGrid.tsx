import Image from "../Image";
import { className } from "../../utils/various";
import styles from "./IconGrid.module.scss";
import iconMetadata from "@shopify/polaris-icons/metadata";
import Link from "next/link";

interface Props {
  title?: string;
  icons: typeof iconMetadata;
  activeIcon?: string;
  query?: string;
}

function IconGrid({ title, icons, activeIcon, query = "" }: Props) {
  return (
    <>
      {title ? <h2 className={styles.SectionHeading}>{title}</h2> : null}
      <div className={styles.IconGrid}>
        <ul className={styles.IconGridInner}>
          {Object.keys(icons).map((iconFileName) => (
            <li key={iconFileName}>
              <Link
                href={{
                  pathname: "/icons",
                  query: {
                    icon: iconFileName,
                    ...(query === "" ? {} : { q: query }),
                  },
                }}
                scroll={false}
              >
                <a
                  className={className(
                    styles.Icon,
                    activeIcon === iconFileName && styles.isSelected
                  )}
                >
                  <Image
                    src={`/icons/${iconFileName}.svg`}
                    alt={icons[iconFileName].description}
                    width={20}
                    height={20}
                    fadeIn={false}
                  />
                  <p>{icons[iconFileName].name}</p>
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
