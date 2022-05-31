import styles from "./TokenList.module.scss";
import {
  HighlightableSearchResult,
  TokenPropertiesWithName,
} from "../../types";
import { className } from "../../utils/various";

interface TokenListProps {
  layout?: "grid" | "list";
  children: React.ReactNode;
}

function TokenList({ layout = "grid", children }: TokenListProps) {
  return (
    <div
      className={className(styles.TokenList, layout === "list" && styles.list)}
    >
      <table>
        <thead>
          <tr>
            <th>Preview</th>
            <th>Token name</th>
            <th>Value</th>
            <th>Figma recommendation</th>
            <th>Description</th>
          </tr>
        </thead>
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
  );
}

function getFigmaRecommendationForToken(
  name: string,
  value: string
): undefined | string {
  let recommendation = "—";

  const REM = 16;

  if (value.startsWith("rgba")) {
    recommendation = "Lorem/Ipsum/Dolor";
  } else if (name.startsWith("shadow")) {
    recommendation = "Lorem/Ipsum dolor";
  } else if (name.includes("breakpoint")) {
    const artboardWidth = parseInt(value) * REM;
    if (artboardWidth > 0) {
      recommendation = `Frame width: ${artboardWidth}+ pixels`;
    }
  } else if (name.includes("border-radius-half")) {
    recommendation = "Use a circle";
  } else if (name.includes("radius")) {
    const radius = parseFloat(value) * REM;
    recommendation = `Use a radius of ${radius} pixels`;
  } else if (name.includes("font") || name.includes("line-height")) {
    recommendation = `Use font style Lorem/Ipsum/Dolor`;
  } else if (name.includes("space")) {
    const spacing = parseFloat(value) * REM;
    recommendation = `Use a spacing of ${spacing} pixels`;
  }

  return recommendation;
}

interface TokenListItemProps extends HighlightableSearchResult {
  token: TokenPropertiesWithName;
}

function TokenListItem({
  token: { name, value, description },
  isHighlighted,
}: TokenListItemProps) {
  const figmaRecommendation = getFigmaRecommendationForToken(name, value);

  return (
    <tr
      key={name}
      className={className(
        styles.TokenListItem,
        isHighlighted && styles.isHighlighted
      )}
    >
      <td>
        <div className={styles.Preview}>
          <TokenPreview name={name} value={value} />
        </div>
      </td>
      <td className={styles.Cell}>
        <span className={styles.TokenName}>--p-{name}</span>
      </td>
      <td className={styles.Cell}>{value && <p>{value}</p>}</td>
      <td className={styles.Cell}>
        {figmaRecommendation && (
          <div className={styles.FigmaRecommendation}>
            <span className={styles.Overflow}>{figmaRecommendation}</span>
          </div>
        )}
      </td>
      <td className={styles.Cell}>
        <div className={styles.TokenDescription}>
          <p>
            <span className={styles.Overflow}>{description || "—"}</span>
          </p>
        </div>
      </td>
    </tr>
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
          width: "100%",
          height: 50,
          borderRadius: 8,
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
        }}
      >
        <div
          style={{
            aspectRatio: "1/1",
            borderRadius: 100,
            height: "30%",
            background: "var(--text-strong)",
          }}
        ></div>
        <div
          style={{
            width: value,
            height: "30%",
            background: "var(--text-strong)",
            opacity: 0.2,
          }}
        ></div>
        <div
          style={{
            aspectRatio: "1/1",
            borderRadius: 100,
            height: "30%",
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
