import styles from "./TokensPage.module.scss";
import { TokenGroup, tokens as allTokens } from "@shopify/polaris-tokens";
import { useState } from "react";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import Tabs from "../Tabs";
import YoutubeVideo from "../YoutubeVideo";
import Link from "next/link";
import { TokenPropertiesWithName } from "../../types";
import TokenList from "../TokenList";

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
    <>
      <MaxPageWidthDiv className={styles.Intro}>
        <h1>Tokens</h1>
      </MaxPageWidthDiv>

      <Tabs
        items={[
          {
            title: "Colors",
            url: `/tokens/colors`,
            isCurrentIfPathStartsWith: `/tokens/colors`,
          },
          {
            title: "Typography",
            url: `/tokens/typography`,
            isCurrentIfPathStartsWith: `/tokens/typography`,
          },
          {
            title: "Shape",
            url: `/tokens/shape`,
            isCurrentIfPathStartsWith: `/tokens/shape`,
          },
          {
            title: "Spacing",
            url: `/tokens/spacing`,
            isCurrentIfPathStartsWith: `/tokens/spacing`,
          },
          {
            title: "Depth",
            url: `/tokens/depth`,
            isCurrentIfPathStartsWith: `/tokens/depth`,
          },
          {
            title: "Motion",
            url: `/tokens/motion`,
            isCurrentIfPathStartsWith: `/tokens/motion`,
          },
          {
            title: "Breakpoints",
            url: `/tokens/breakpoints`,
            isCurrentIfPathStartsWith: `/tokens/breakpoints`,
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
            <TokenList
              layout={["colors"].includes(tokenGroup) ? "grid" : "list"}
            >
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
          </MaxPageWidthDiv>
        </div>
      </div>
      <style jsx>{keyframeStyles}</style>
    </>
  );
}

export default TokensPage;
