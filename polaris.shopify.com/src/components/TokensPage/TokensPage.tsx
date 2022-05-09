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
import Tooltip from "../Tooltip";
import { ReactIcon, FigmaIcon, SassIcon } from "./icons";

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

  const [durationFilter, setDurationFilter] = useState(0);

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
        </MaxPageWidthDiv>

        <div className={styles.Group}>
          <MaxPageWidthDiv>
            <TokenGroup
              title="Colors"
              layout="grid"
              gridItemsPerRow={19}
              tokens={tokens.colors}
              showName={false}
            />
          </MaxPageWidthDiv>
        </div>

        <div className={styles.Group}>
          <MaxPageWidthDiv>
            <TokenGroup
              title="Breakpoints"
              layout="grid"
              tokens={tokens.breakpoints}
              gridItemsPerRow={tokens.breakpoints.length}
            />
          </MaxPageWidthDiv>
        </div>

        <div className={styles.Group}>
          <MaxPageWidthDiv>
            <TokenGroup
              title="Depth"
              layout="grid"
              gridItemsPerRow={6}
              tokens={tokens.depth}
            />
          </MaxPageWidthDiv>
        </div>

        <div className={styles.Group}>
          <MaxPageWidthDiv>
            <div>
              <input
                type="range"
                min="0"
                max={
                  tokens.motion.filter((token) =>
                    token.name.startsWith("duration")
                  ).length
                }
                value={durationFilter}
                onChange={(evt) =>
                  setDurationFilter(parseInt(evt.target.value))
                }
              />
              <TokenGroup
                title="Motion"
                layout="grid"
                gridItemsPerRow={12}
                tokens={tokens.motion}
              />
            </div>
          </MaxPageWidthDiv>
        </div>

        <div className={styles.Group}>
          <MaxPageWidthDiv>
            <TokenGroup
              title="Shape"
              layout="grid"
              gridItemsPerRow={10}
              tokens={tokens.shape}
            />
          </MaxPageWidthDiv>
        </div>

        <div className={styles.Group}>
          <MaxPageWidthDiv>
            <div className={styles.GroupColumns}>
              <div className={styles.GroupColumn}>
                <TokenGroup
                  title="Font size"
                  layout="table"
                  tokens={tokens.typography.filter((token) =>
                    token.name.startsWith("font-size")
                  )}
                />
              </div>
              <div className={styles.GroupColumn}>
                <TokenGroup
                  title="Line height"
                  layout="table"
                  tokens={tokens.typography.filter((token) =>
                    token.name.startsWith("line-height")
                  )}
                />
              </div>
              <div className={styles.GroupColumn}>
                <TokenGroup
                  title="Weight"
                  layout="table"
                  tokens={tokens.typography.filter((token) =>
                    token.name.startsWith("font-weight")
                  )}
                />
                <TokenGroup
                  title="Family"
                  layout="table"
                  tokens={tokens.typography.filter((token) =>
                    token.name.startsWith("font-family")
                  )}
                />
              </div>
            </div>
          </MaxPageWidthDiv>
        </div>

        <MaxPageWidthDiv>
          <TokenGroup
            title="Z-index"
            layout="grid"
            gridItemsPerRow={12}
            tokens={tokens.zIndex}
          />
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
  gridItemsPerRow?: number;
  showName?: boolean;
}

function TokenGroup({
  title,
  layout = "table",
  tokens,
  gridItemsPerRow = 10,
  showName = true,
}: TokenGroupProps) {
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
                <span className={styles.TokenName}>{name}</span>
              </td>
              <td>{description}</td>
              {/* <td>{value}</td> */}
            </tr>
          ))}
        </table>
      </div>
    );
  } else {
    return (
      <div className={styles.TokenGrid}>
        <h3>{title}</h3>
        <div
          className={styles.Grid}
          style={{
            gridTemplateColumns: `repeat(${gridItemsPerRow}, 1fr)`,
          }}
        >
          {tokens.map(({ name, value, description }) => (
            <div className={styles.Token} key={name}>
              <Tooltip
                placement="top"
                ariaLabel={`${name}. ${description ? `${description}.` : ""}`}
                renderContent={() => {
                  let figmaValue = name;
                  if (value.endsWith("rem")) {
                    const px = (
                      16 * parseFloat(value.replace("rem", ""))
                    ).toString();
                    figmaValue = `${px}px`;
                  }
                  if (name.startsWith("z-")) {
                    figmaValue = "Not applicable";
                  }
                  return (
                    <>
                      {/* <div style={{ width: 200 }}>
                      <TokenPreview name={name} value={value} />
                    </div> */}
                      <div className={styles.TokenTooltipContent}>
                        <span className={styles.TokenName}>{name}</span>
                        {description && <p>{description}</p>}

                        <span className={styles.FigmaName}>
                          <div className={styles.Icon}>
                            <FigmaIcon />
                          </div>
                          Figma: {figmaValue}
                        </span>

                        <span className={styles.CSSName}>
                          <div className={styles.Icon}>
                            <SassIcon />
                          </div>
                          Code: var(--p-{name});
                        </span>
                      </div>
                    </>
                  );
                }}
              >
                <button>
                  <TokenPreview name={name} value={value} />
                  {showName && <span className={styles.TokenName}>{name}</span>}
                </button>
              </Tooltip>
            </div>
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
    aspectRatio: "1/1",
    background: "#fff",
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
          background: "var(--primary)",
        }}
      ></div>
    );
  }

  // Border width
  else if (name.includes("border-width")) {
    return (
      <div style={{ ...wrapperStyles, display: "flex", alignItems: "center" }}>
        <div
          style={{
            height: value,
            background: "var(--primary)",
            flex: 1,
          }}
        ></div>
      </div>
    );
  }

  // Other borders width
  else if (name.includes("border")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          display: "flex",
          alignItems: "center",
          background: "var(--surface-subdued)",
        }}
      >
        <div
          style={{
            height: 0,
            borderTop: value,
            flex: 1,
          }}
        ></div>
      </div>
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
          background: "var(--surface-subdued)",
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
          background: "var(--surface-subdued)",
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
          background: "var(--surface-subdued)",
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
          background: "var(--surface-subdued)",
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
    const relativeWidth = (parseInt(value.replace("rem", "")) / 140) * 100;
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
            minWidth: 4,
            height: `50%`,
            boxShadow:
              "inset 0 0 0 3px #333, inset 0 -10px #333, 0 30px 30px rgba(0,0,0,.2)",
            background: "white",
            borderRadius: 4,
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
            background: "var(--primary)",
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
            background: "var(--primary)",
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
            background: "var(--primary)",
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
          background: "var(--primary)",
        }}
      >
        {[...Array(layerCount)].map((_, n) => (
          <div
            key={n}
            style={{
              height: `${100 / 12 / 2}%`,
              width: "80%",
              background:
                n + 1 === number
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,.2)",
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
