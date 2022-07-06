import styles from "./TokensPage.module.scss";
import { TokenGroup, tokens as allTokens } from "@shopify/polaris-tokens";
import { useState } from "react";
import Container from "../Container";
import { TokenPropertiesWithName } from "../../types";
import TokenList from "../TokenList";
import type { NavItem } from "../Nav";
import Link from "next/link";
import { slugify } from "../../utils/various";
import { useRouter } from "next/router";

interface Props {
  tokenGroup:
    | "breakpoints"
    | "colors"
    | "depth"
    | "motion"
    | "shape"
    | "spacing"
    | "typography"
    | "zIndex";
}

const navItems: NavItem[] = [
  {
    title: "Colors",
    url: `/tokens/colors`,
  },
  {
    title: "Typography",
    url: `/tokens/typography`,
  },
  {
    title: "Shape",
    url: `/tokens/shape`,
  },
  {
    title: "Spacing",
    url: `/tokens/spacing`,
  },
  {
    title: "Depth",
    url: `/tokens/depth`,
  },
  {
    title: "Motion",
    url: `/tokens/motion`,
  },
  {
    title: "Breakpoints",
    url: `/tokens/breakpoints`,
  },
  {
    title: "Z-Index",
    url: `/tokens/z-index`,
  },
];

function tokensToFilteredArray(
  filter: string,
  tokenGroup: TokenGroup
): TokenPropertiesWithName[] {
  return Object.entries(tokenGroup)
    .filter(([name]) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    })
    .map(([name, value]) => {
      return { name, ...value };
    });
}

function TokensPage({ tokenGroup }: Props) {
  const [filter, setFilter] = useState("");
  const router = useRouter();

  const tokens = {
    breakpoints: tokensToFilteredArray(filter, allTokens.breakpoints),
    colors: tokensToFilteredArray(filter, allTokens.colorSchemes.light),
    depth: tokensToFilteredArray(filter, allTokens.depth),
    motion: tokensToFilteredArray(filter, allTokens.motion),
    shape: tokensToFilteredArray(filter, allTokens.shape),
    spacing: tokensToFilteredArray(filter, allTokens.spacing),
    typography: tokensToFilteredArray(filter, allTokens.typography),
    zIndex: tokensToFilteredArray(filter, allTokens.zIndex),
  };

  const keyframeStyles = tokens["motion"]
    .filter(({ name }) => name.includes("keyframes"))
    .map(({ name, value }) => `@keyframes ${name} ${value}`)
    .join("\n");

  return (
    <Container>
      <div className={styles.TokensPage}>
        <div className={styles.Banner}>
          <h1>Tokens</h1>
        </div>

        <div className={styles.Tokens}>
          <nav className={styles.TokensNav}>
            <ul>
              {navItems.map((item) => {
                if (!item.url) return null;
                const isCurrent = router.asPath.endsWith(slugify(item.title));
                return (
                  <li key={item.title}>
                    <Link href={item.url} passHref>
                      <a aria-current={isCurrent ? "page" : undefined}>
                        {item.title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <TokenList>
            {tokens[tokenGroup]
              .sort((token) =>
                token.name.includes("ease") || token.name.includes("linear")
                  ? -1
                  : 1
              )
              .map((token) => (
                <TokenList.Item key={token.name} token={token} />
              ))}
          </TokenList>
        </div>

        <style jsx>{keyframeStyles}</style>
      </div>
    </Container>
  );
}

export default TokensPage;
