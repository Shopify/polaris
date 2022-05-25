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
    <>
      <ul
        className={className(
          styles.TokenList,
          layout === "list" && styles.list
        )}
      >
        {children}
      </ul>
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
    </>
  );
}

function getFigmaRecommendationForToken(
  name: string,
  value: string
): undefined | string {
  let recommendation: string | undefined = undefined;

  const REM = 16;

  if (value.startsWith("rgba")) {
    recommendation = "Use color style Lorem/Ipsum/Dolor";
  } else if (name.startsWith("shadow")) {
    recommendation = "Use shadow style Lorem/Ipsum dolor";
  } else if (name.includes("breakpoint")) {
    const artboardWidth = parseInt(value) * REM;
    if (artboardWidth > 0) {
      recommendation = `Set artboard width to ${artboardWidth}+ pixels`;
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
    <li
      key={name}
      className={className(
        styles.TokenListItem,
        isHighlighted && styles.isHighlighted
      )}
    >
      <div className={styles.Preview}>
        <TokenPreview name={name} value={value} />
      </div>
      <div className={styles.TokenInfo}>
        <div className={styles.TokenName}>
          <h4>--p-{name}</h4>
        </div>
        {description && <p>{description}</p>}
        {figmaRecommendation && (
          <div className={styles.FigmaRecommendation}>
            {figmaRecommendation}
          </div>
        )}
      </div>
    </li>
  );
}

TokenList.Item = TokenListItem;

interface TokenPreviewProps {
  name: string;
  value: string;
}

function TokenPreview({ name, value }: TokenPreviewProps) {
  const wrapperStyles = {
    background: "var(--decorative-1)",
  };

  // Colors
  if (value.startsWith("rgba")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          background: value,
          boxShadow:
            value === "rgba(255, 255, 255, 1)"
              ? "inset 0 0 0 1px rgba(0,0,0,.05)"
              : undefined,
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "20%",
            paddingBottom: "20%",
            borderRadius: value,
            background: "var(--primary)",
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
          background: "var(--decorative-3)",
          display: "flex",
          alignItems: "center",
        }}
      >
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

  // Spacing
  else if (name.includes("space")) {
    return (
      <div
        style={{
          ...wrapperStyles,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            aspectRatio: "1/1",
            borderRadius: 100,
            height: "30%",
            background: "var(--primary)",
          }}
        ></div>
        <div
          style={{
            width: value,
            height: "30%",
            background: "var(--primary)",
            opacity: 0.2,
          }}
        ></div>
        <div
          style={{
            aspectRatio: "1/1",
            borderRadius: 100,
            height: "30%",
            background: "var(--primary)",
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
          background: "var(--decorative-1)",
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
          background: "var(--decorative-2)",
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
          background: "var(--decorative-3)",
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
          background: "var(--decorative-4)",
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
          justifyContent: "center",
          alignItems: "center",
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
          justifyContent: "center",
          alignItems: "center",
          ...wrapperStyles,
          background: "var(--decorative-1)",
        }}
      >
        <div
          style={{
            height: "0%",
            width: "10%",
            paddingBottom: "10%",
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
          background: "var(--decorative-2)",
        }}
      >
        <div
          style={{
            height: "0%",
            width: "10%",
            paddingBottom: "10%",
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
          background: "var(--decorative-3)",
        }}
      >
        <div
          style={{
            height: "0%",
            width: "10%",
            paddingBottom: "10%",
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
