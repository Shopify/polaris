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
      <ul className={styles.IconGrid}>
        {Object.keys(icons).map((iconFileName) => (
          <li key={iconFileName}>
            <Link
              href={{
                pathname: "/icons",
                query: { icon: iconFileName, q: query },
              }}
              scroll={false}
            >
              <a
                className={className(
                  styles.Icon,
                  activeIcon === iconFileName && styles.IconSelected
                )}
              >
                <Image
                  src={`/icons/${iconFileName}.svg`}
                  alt={icons[iconFileName].description}
                  width={20}
                  height={20}
                  fadeIn={false}
                />
                <span className={styles.IconName}>
                  {icons[iconFileName].name}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default IconGrid;
