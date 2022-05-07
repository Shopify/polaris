import styles from "./TokensPage.module.scss";
import {
  TokenGroup,
  TokenProperties,
  tokens as allTokens,
} from "@shopify/polaris-tokens";
import TextField from "../TextField";
import { useState } from "react";
import MaxPageWidthDiv from "../MaxPageWidthDiv";
import { LinkButton } from "../Button/Button";
import { Popover } from "@headlessui/react";

interface Props {}

interface TokenPropertiesWithName extends TokenProperties {
  name: string;
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
            <h1>Extend Polaris using Tokens</h1>
            <p>
              Design tokens represent design decisions such as color, spacing,
              and typography. Each token has a unique name that references a
              specific value. The benefits of using tokens over hard-coded
              values include:
            </p>
            <LinkButton href="">Learn more about tokens</LinkButton>
          </div>
          {/* <div className={styles.Video}>
            <YoutubeVideo id="NvDY37tOn_o" />
          </div> */}
        </div>
      </MaxPageWidthDiv>

      <div className={styles.TableSection}>
        <MaxPageWidthDiv>
          <div className={styles.Filters}>
            <TextField
              value={filter}
              onChange={(value) => setFilter(value)}
              placeholder="Filter tokens"
            />

            <LinkButton pill href={`/components`} aria-current={true}>
              All
            </LinkButton>
            {Object.keys(tokens).map((token) => (
              <LinkButton
                key={token}
                pill
                href={`/components`}
                aria-current={false}
              >
                {token}
              </LinkButton>
            ))}
          </div>

          <TokenGroup
            title="Breakpoints"
            layout="grid"
            tokens={tokens.breakpoints}
          />
          <TokenGroup title="Colors" layout="grid" tokens={tokens.colors} />
          <TokenGroup title="Depth" layout="table" tokens={tokens.depth} />
          <TokenGroup title="Motion" layout="table" tokens={tokens.motion} />
          <TokenGroup title="Shape" layout="table" tokens={tokens.shape} />
          <TokenGroup
            title="Typography"
            layout="table"
            tokens={tokens.typography}
          />
          <TokenGroup title="Z-index" layout="table" tokens={tokens.zIndex} />
        </MaxPageWidthDiv>
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

interface TokenGroupProps {
  title: string;
  layout: "table" | "grid";
  tokens: TokenPropertiesWithName[];
}

function TokenGroup({ title, layout = "table", tokens }: TokenGroupProps) {
  if (tokens.length === 0) {
    return null;
  }
  if (layout === "table") {
    return (
      <div className={styles.TokenTable}>
        <h3>{title}</h3>
        <table>
          {tokens.map(({ name, value, description }) => (
            <tr key={name}>
              <td>
                <TokenPreview name={name} value={value} />
              </td>
              <td>
                <span className={styles.TokenName}>--p-{name}</span>
              </td>
              <td>{description}</td>
              <td>{value}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  } else {
    return (
      <div className={styles.TokenGrid}>
        <h3>{title}</h3>
        <div className={styles.Grid}>
          {tokens.map(({ name, value, description }) => (
            <Popover className={styles.Token} key={name}>
              <Popover.Button>
                <TokenPreview name={name} value={value} />
              </Popover.Button>

              <Popover.Panel className={styles.Popover}>
                <TokenPreview name={name} value={value} />
                <span className={styles.TokenName}>--p-{name}</span>
                {description}
                {value}
              </Popover.Panel>
            </Popover>
          ))}
        </div>
      </div>
    );
  }
}

interface TokenPreviewProps {
  name: string;
  value: string;
}

function TokenPreview({ name, value }: TokenPreviewProps) {
  const wrapperStyles = {
    paddingBottom: "100%",
    backgroundColor: "#555",
    color: "white",
    borderRadius: 2,
  };

  // Colors
  if (value.startsWith("rgba")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          background: value,
        }}
      ></div>
    );
  }

  // Border radii
  else if (name.includes("border-radius")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          borderRadius: value,
        }}
      ></div>
    );
  }

  // Border width
  else if (name.includes("border-width")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          height: value,
        }}
      ></div>
    );
  }

  // Other borders width
  else if (name.includes("border")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          height: 0,
          borderTop: value,
        }}
      ></div>
    );
  }

  // Font families
  else if (name.includes("font-family")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: value,
        }}
      >
        Commerce
      </div>
    );
  }

  // Font sizes
  else if (name.includes("font-size")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: value,
        }}
      >
        Aa
      </div>
    );
  }

  // Font weights
  else if (name.includes("font-weight")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: value,
        }}
      >
        Aa
      </div>
    );
  }

  // Line height
  else if (name.includes("line-height")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: value,
        }}
      >
        Hello
        <br />
        World
      </div>
    );
  }

  // Breakpoints
  else if (name.includes("breakpoints")) {
    const relativeWidth = (parseInt(value.replace("rem", "")) / 111) * 100;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            width: `${relativeWidth}%`,
            height: `50%`,
            background: "white",
          }}
        ></div>
      </div>
    );
  }

  // Depth
  else if (name.includes("shadow")) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "50%",
            width: "50%",
            background: "white",
            boxShadow: value,
          }}
        ></div>
      </div>
    );
  }

  // Duration
  else if (name.includes("duration")) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "50%",
            width: "50%",
            background: "white",
            animation: `spin ${value} infinite both linear`,
          }}
        ></div>
      </div>
    );
  }

  // Easing
  else if (name.includes("ease") || name.includes("linear")) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "50%",
            width: "50%",
            background: "white",
            boxShadow: value,
            animation: `spin 1s ${value} infinite both`,
          }}
        ></div>
      </div>
    );
  }

  // Keyframes
  else if (name.includes("keyframes")) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "50%",
            width: "50%",
            background: "white",
            boxShadow: value,
            animation: `${name} 1s infinite both`,
          }}
        ></div>
      </div>
    );
  }

  // Z-index
  else if (name.includes("z-")) {
    const layerCount = 12;
    const number = parseInt(name.replace("z-", ""));
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          ...wrapperStyles,
        }}
      >
        {[...Array(layerCount)].map((_, n) => (
          <div
            key={n}
            style={{
              height: `${100 / 12 / 2}%`,
              width: "80%",
              background: n + 1 === number ? "#aaa" : "white",
              boxShadow: value,
              animation: `${name} 1s infinite both`,
            }}
          ></div>
        ))}
      </div>
    );
  }

  return null;
}

export default TokensPage;
