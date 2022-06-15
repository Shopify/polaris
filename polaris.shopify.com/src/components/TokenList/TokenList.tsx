import {
  HighlightableSearchResult,
  TokenPropertiesWithName,
} from "../../types";
import { createContext } from "react";
import { className } from "../../utils/various";
import styles from "./TokenList.module.scss";
import { useCopyToClipboard } from "../../utils/hooks";
import iconClipboard from "../../../public/icon-clipboard.svg";
import Image from "../Image";
import Tooltip from "../Tooltip";

interface ColumnsConfig {
  preview: boolean;
  name: boolean;
  value: boolean;
  figmaUsage: boolean;
  description: boolean;
}

const defaultColumnsConfig: ColumnsConfig = {
  preview: true,
  name: true,
  value: true,
  figmaUsage: true,
  description: true,
};

interface TokenListProps {
  showTableHeading?: boolean;
  columns?: ColumnsConfig;
  children: React.ReactNode;
}

const TokenListContext = createContext<{
  columns: ColumnsConfig;
}>({ columns: defaultColumnsConfig });

function TokenList({
  showTableHeading = true,
  columns = defaultColumnsConfig,
  children,
}: TokenListProps) {
  return (
    <TokenListContext.Provider value={{ columns }}>
      <div className={styles.TokenList}>
        <table>
          {showTableHeading && (
            <thead>
              <tr>
                {columns.preview && <th></th>}
                {columns.name && <th>Token name</th>}
                {columns.value && <th>Current value</th>}
                {columns.figmaUsage && <th>Figma usage</th>}
                {columns.description && <th>Description</th>}
              </tr>
            </thead>
          )}
          <tbody>{children}</tbody>
        </table>
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
      </div>
    </TokenListContext.Provider>
  );
}

function getFigmaUsageForToken(
  name: string,
  value: string
): undefined | string {
  let usage = "—";

  const REM = 16;

  if (value.startsWith("rgba")) {
    usage = "Lorem/Ipsum/Dolor";
  } else if (name.startsWith("shadow")) {
    usage = "Lorem/Ipsum dolor";
  } else if (name.includes("breakpoint")) {
    const artboardWidth = parseInt(value) * REM;
    if (artboardWidth > 0) {
      usage = `Frame width: ${artboardWidth}+ pixels`;
    }
  } else if (name.includes("border-radius-half")) {
    usage = "Use a circle";
  } else if (name.includes("radius")) {
    const radius = parseFloat(value) * REM;
    usage = `Use a radius of ${radius} pixels`;
  } else if (name.includes("font") || name.includes("line-height")) {
    usage = `Use font style Lorem/Ipsum/Dolor`;
  } else if (name.includes("space")) {
    const spacing = parseFloat(value) * REM;
    usage = `Use a spacing of ${spacing} pixels`;
  }

  return usage;
}

interface TokenListItemProps extends HighlightableSearchResult {
  token: TokenPropertiesWithName;
}

function TokenListItem({
  token: { name, value, description },
  isHighlighted,
}: TokenListItemProps) {
  const figmaUsage = getFigmaUsageForToken(name, value);
  const tokenNameWithPrefix = `--p-${name}`;
  const [copy, didJustCopy] = useCopyToClipboard(tokenNameWithPrefix);

  return (
    <TokenListContext.Consumer>
      {({ columns }) => (
        <tr
          key={name}
          className={className(
            styles.TokenListItem,
            isHighlighted && styles.isHighlighted
          )}
        >
          {columns.preview && (
            <td className={styles.Preview}>
              <TokenPreview name={name} value={value} />
            </td>
          )}
          {columns.name && (
            <td>
              <span className={styles.TokenContainer}>
                <div className={styles.TokenName}>
                  <span>{tokenNameWithPrefix}</span>
                </div>
                <div className={styles.TokenClipboard}>
                  <Tooltip
                    ariaLabel="Copy to clipboard"
                    placement="top"
                    renderContent={() => (
                      <div className={styles.TokenToolTip}>
                        <p>{didJustCopy ? "Copied!" : "Copy to clipboard"}</p>
                      </div>
                    )}
                  >
                    <button onClick={copy}>
                      <Image
                        src={iconClipboard}
                        alt={"Copy"}
                        width={14}
                        height={14}
                        fadeIn={false}
                        icon
                      />
                    </button>
                  </Tooltip>
                </div>
              </span>
            </td>
          )}
          {columns.value && <td className={styles.Value}>{value}</td>}
          {columns.figmaUsage && (
            <td className={styles.FigmaUsage}>{figmaUsage || "—"}</td>
          )}
          {columns.description && (
            <td className={styles.TokenDescription}>{description || "—"}</td>
          )}
        </tr>
      )}
    </TokenListContext.Consumer>
  );
}

TokenList.Item = TokenListItem;

interface TokenPreviewProps {
  name: string;
  value: string;
}

function TokenPreview({ name, value }: TokenPreviewProps) {
  const wrapperStyles = {};

  // Colors
  if (value.startsWith("rgba")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          background: value,
          width: 200,
          height: 52,
          borderRadius: 2,
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
          display: "flex",
        }}
      >
        <div
          style={{
            width: "20%",
            paddingBottom: "20%",
            borderRadius: value,
            background: "var(--text-strong)",
          }}
        ></div>
      </div>
    );
  }

  // Border width
  else if (name.includes("border-width")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          background: "transparent",
          display: "flex",
        }}
      >
        <div
          style={{
            height: value,
            background: "var(--text-strong)",
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

  // Spacing
  else if (name.includes("space")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            aspectRatio: "1/1",
            borderRadius: 100,
            height: "10px",
            background: "var(--text-strong)",
          }}
        ></div>
        <div
          style={{
            width: value,
            height: "30px",
            background: "var(--text-strong)",
            opacity: 0.2,
          }}
        ></div>
        <div
          style={{
            aspectRatio: "1/1",
            borderRadius: 100,
            height: "10px",
            background: "var(--text-strong)",
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
          fontFamily: value,
          background: "transparent",
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
          fontSize: value,
          background: "transparent",
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
          fontWeight: value,
          background: "transparent",
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
          lineHeight: value,
          background: "transparent",
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
    const relativeWidth = (parseInt(value.replace("rem", "")) / 450) * 100;
    return (
      <div
        style={{
          display: "flex",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            width: `${relativeWidth}%`,
            minWidth: 4,
            height: `50%`,
            boxShadow: "inset 0 0 0 3px #333, inset 0 -10px #333",
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
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "0%",
            width: "10%",
            paddingBottom: "10%",
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
          ...wrapperStyles,
          background: "transparent",
        }}
      >
        <div
          style={{
            height: "0%",
            width: "10%",
            paddingBottom: "10%",
            background: "var(--text-strong)",
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
          ...wrapperStyles,
          background: "transparent",
        }}
      >
        <div
          style={{
            height: "0%",
            width: "10%",
            paddingBottom: "10%",
            background: "var(--text-strong)",
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
          ...wrapperStyles,
          background: "transparent",
        }}
      >
        <div
          style={{
            height: "0%",
            width: "10%",
            paddingBottom: "10%",
            background: "var(--text-strong)",
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
          gap: 2,
          ...wrapperStyles,
        }}
      >
        {[...Array(layerCount)].map((_, n) => (
          <div
            key={n}
            style={{
              height: `${100 / 12 / 2}%`,
              width: "20%",
              background:
                n + 1 === number ? "rgba(0,0,0,.7)" : "rgba(0,0,0,.1)",
              animation: `${name} 1s infinite both`,
            }}
          ></div>
        ))}
      </div>
    );
  }

  return null;
}

export default TokenList;
