import styles from "./TokensPage.module.scss";
import { TokenGroup, tokens as allTokens } from "@shopify/polaris-tokens";
import { useState } from "react";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Tabs from "../Tabs";
import YoutubeVideo from "../YoutubeVideo";
import Link from "next/link";
import { TokenPropertiesWithName } from "../../types";
import TokenList from "../TokenList";

interface Props {}

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

function TokensPage({}: Props) {
  const [filter, setFilter] = useState("");

  const tokens = {
    breakpoints: tokensToFilteredArray(filter, allTokens.breakpoints),
    colors: tokensToFilteredArray(filter, allTokens.colorSchemes.light),
    depth: tokensToFilteredArray(filter, allTokens.depth),
    motion: tokensToFilteredArray(filter, allTokens.motion),
    shape: tokensToFilteredArray(filter, allTokens.shape),
    typography: tokensToFilteredArray(filter, allTokens.typography),
    zIndex: tokensToFilteredArray(filter, allTokens.zIndex),
  };

  const keyframeStyles = tokens["motion"]
    .filter(({ name }) => name.includes("keyframes"))
    .map(({ name, value }) => `@keyframes ${name} ${value}`)
    .join("\n");

  return (
    <>
      <MaxPageWidthDiv className={styles.TokensPage}>
        <div className={styles.IntroBanner}>
          <div className={styles.Text}>
            <h1>Tokens</h1>
            <p>
              Design tokens represent design decisions such as color, spacing,
              and typography. Each token has a unique name that references a
              specific value. The benefits of using tokens over hard-coded
              values include lorem ipsum dolor.
            </p>
            <Link href="#">Learn more about tokens</Link>
          </div>
          <div className={styles.Video}>
            <YoutubeVideo id="NvDY37tOn_o" />
          </div>
        </div>
      </MaxPageWidthDiv>

      <Tabs
        items={[
          {
            title: "Colors",
            url: `/tokens/colors`,
            isCurrentIfPathStartsWith: `/tokens`,
          },
          {
            title: "Depth",
            url: `/tokens/depth`,
            isCurrentIfPathStartsWith: `/tokens/depth`,
          },
          {
            title: "Breakpoints",
            url: `/tokens/breakpoints`,
            isCurrentIfPathStartsWith: `/tokens/breakpoints`,
          },
          {
            title: "Motion",
            url: `/tokens/motion`,
            isCurrentIfPathStartsWith: `/tokens/motion`,
          },
          {
            title: "Shape",
            url: `/tokens/shape`,
            isCurrentIfPathStartsWith: `/tokens/shape`,
          },
          {
            title: "Typography",
            url: `/tokens/typography`,
            isCurrentIfPathStartsWith: `/tokens/typography`,
          },
          {
            title: "Z-Index",
            url: `/tokens/z-index`,
            isCurrentIfPathStartsWith: `/tokens/z-index`,
          },
        ]}
      />

      <div className={styles.TableSection}>
        <div className={styles.Group}>
          <MaxPageWidthDiv>
            <TokenList>
              {tokens.colors.map((color) => (
                <TokenList.Item key={color.name} token={color} />
              ))}
            </TokenList>
          </MaxPageWidthDiv>
        </div>
      </div>
      <style jsx>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <style jsx>{keyframeStyles}</style>
    </>
  );
}

export default TokensPage;
