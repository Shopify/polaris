import Image from "../Image";
import Tooltip from "../Tooltip";
import styles from "./IconGrid.module.scss";
import iconMetadata from "@shopify/polaris-icons/metadata";
import Link from "next/link";

interface Props {
  title?: string;
  icons: typeof iconMetadata;
  activeIcon: string;
  query: string;
}

function IconGrid({ title, icons, activeIcon, query }: Props) {
  return (
    <>
      <h2 className={styles.SectionHeading}>{title}</h2>
      <ul className={styles.IconGrid}>
        {Object.keys(icons).map((iconFileName) => (
          <li key={iconFileName}>
            <Link
              href={{ query: { icon: iconFileName, q: query } }}
              scroll={false}
            >
              <a className={styles.Icon}>
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
