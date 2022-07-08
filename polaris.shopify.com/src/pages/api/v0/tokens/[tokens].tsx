import { Tokens, TokenGroup, createVar, tokens } from "@shopify/polaris-tokens";
import type { NextApiRequest, NextApiResponse } from "next";

type TokenGroupKey = keyof Tokens;

export const tokenGroupKeys = Object.keys(tokens) as TokenGroupKey[];

const formats = ["json", "css"] as const;

type Format = typeof formats[number];

function isFormat(format: unknown): format is Format {
  return formats.includes(format as Format);
}

function isTokenGroupKey(key: unknown): key is TokenGroupKey {
  return tokenGroupKeys.includes(key as TokenGroupKey);
}

/**
 * Format the token data into: css or json
 */
const formatTokenGroup = (tokenGroup: TokenGroup, format: Format) => {
  const tokenValues = Object.fromEntries(
    Object.entries(tokenGroup).map(([token, value]) => [token, value])
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

  if (typeof formatParam === "string") {
    const tokenGroupParam = req.query.tokens || "";
    let tokenData: TokenGroup = {};

    // Determine which list(s) we are querying for based on the token param
    if (tokenGroupParam === "all") {
      tokenGroupKeys.forEach((group) => {
        const tokenGroup = tokens[group];

        tokenData = { ...tokenData, ...tokenGroup };
      });
    }

    if (isTokenGroupKey(tokenGroupParam)) {
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
      res.setHeader("content-type", "text/plain");
      res.send(formattedTokenData);
    } else {
      res.json(formattedTokenData);
    }
  }
};

export default handler;
