import Link from "next/link";
import Image from "next/image";

import GlobalSearch from "../GlobalSearch";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import { className } from "../../utils/various";
import shopifyLogo from "../../../public/shopify-logo.svg";

import styles from "./Header.module.scss";

const headerNavItems: {
  label: string;
  url: string;
}[] = [
  {
    label: "Getting started",
    url: "/resources",
  },
  {
    label: "Guidelines",
    url: "/guidelines/foundations/experience-values",
  },
  {
    label: "Components",
    url: "/components",
  },
  {
    label: "Tokens",
    url: "/tokens/colors",
  },
  {
    label: "Icons",
    url: "/icons",
  },
];

interface Props {
  currentSection?: string;
}

function Header({ currentSection }: Props) {
  const hasBorder = currentSection === "/guidelines";

  return (
    <div className={className(styles.Header, hasBorder && styles.withBorder)}>
      <MaxPageWidthDiv className={styles.HeaderInner}>
        <Link href="/">
          <a className={styles.Logo}>
            <Image
              src={shopifyLogo}
              layout="fixed"
              width={24}
              height={24}
              alt="Shopify logo"
            />
            Polaris
          </a>
        </Link>

        <nav className={styles.Nav}>
          <ul>
            {headerNavItems.map(({ url, label }) => {
              const isCurrent =
                currentSection && url.startsWith(currentSection)
                  ? "page"
                  : false;

              return (
                <li key={url}>
                  <Link href={url} passHref>
                    <a aria-current={isCurrent}>{label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.SearchWrapper}>
          <GlobalSearch />
        </div>
      </MaxPageWidthDiv>
    </div>
  );
}

export default Header;
