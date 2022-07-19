import {
  Tokens,
  TokenGroup,
  ColorScheme,
  createVar,
  tokens,
} from "@shopify/polaris-tokens";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Color scheme independent token groups
 */
type StaticTokenGroupKey = Exclude<keyof Tokens, "colorSchemes">;

export const staticTokenGroupKeys = Object.keys(tokens).filter(
  (token) => token !== "colorSchemes"
) as StaticTokenGroupKey[];

const formats = ["json", "css"] as const;

type Format = typeof formats[number];

function isFormat(format: unknown): format is Format {
  return formats.includes(format as Format);
}

function isScheme(scheme: unknown): scheme is ColorScheme {
  return Object.keys(tokens.colorSchemes).includes(scheme as ColorScheme);
}

function isStaticTokenGroupKey(key: unknown): key is StaticTokenGroupKey {
  // return Object.keys(tokens.colorSchemes).includes(scheme as ColorScheme);
  return staticTokenGroupKeys.includes(key as StaticTokenGroupKey);
}

/**
 * Format the token data into: css or json
 */
const formatTokenGroup = (tokenGroup: TokenGroup, format: Format) => {
  const tokenValues = Object.fromEntries(
    Object.entries(tokenGroup).map(([token, tokenProps]) => [
      token,
      tokenProps.value,
    ])
  );

  if (format === "css") {
    return Object.keys(tokenValues)
      .reduce<string[]>((result, token) => {
        const cssVariable = `${createVar(token)}: ${tokenValues[token]};`;

        result.push(cssVariable);

        return result;
      }, [])
      .join("\n");
  }

  return tokenValues;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatParam = isFormat(req.query.format) ? req.query.format : "json";
  const schemeParam = isScheme(req.query.scheme) ? req.query.scheme : "light";

  if (typeof formatParam === "string" && typeof schemeParam === "string") {
    const tokenGroupParam = req.query.tokens || "";
    let tokenData: TokenGroup = {};

    // Determine which list(s) we are querying for based on the token param
    if (tokenGroupParam === "all") {
      staticTokenGroupKeys.forEach((group) => {
        const tokenGroup = tokens[group];

        tokenData = { ...tokenData, ...tokenGroup };
      });
    }

    if (tokenGroupParam === "all" || tokenGroupParam === "colors") {
      const colorSchemeTokenGroup = tokens.colorSchemes[schemeParam];

      tokenData = { ...tokenData, ...colorSchemeTokenGroup };
    }

    if (isStaticTokenGroupKey(tokenGroupParam)) {
      const tokenGroup: TokenGroup = tokens[tokenGroupParam];

      tokenData = { ...tokenData, ...tokenGroup };
    }

    if (Object.keys(tokenData).length === 0) {
      res.status(400);
      res.json({ error: true, status: 400 });
      return;
    }

    const formattedTokenData = formatTokenGroup(tokenData, formatParam);

    if (formatParam === "css") {
      res.setHeader("content-type", "text/css");
      res.send(formattedTokenData);
    } else {
      res.json(formattedTokenData);
    }
  }
};

export default handler;
