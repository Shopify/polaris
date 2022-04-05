import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

type TokenObject = { [key: string]: string };

/**
 * List of token groups
 */
export const colorSchemeMap: { [key: string]: string } = {
  light: "color.light",
  dark: "color.dark",
};

export const nonColorSchemeTokenGroups = [
  "depth",
  "legacy-tokens",
  "motion",
  "shape",
  "spacing",
  "typography",
  "z-index",
];

/**
 * Create the valid github url for a token file.
 */
export const getGithubUrl = (
  tokenGroup: string,
  isRaw: boolean
): string | null => {
  const tokenGroupIsValid =
    nonColorSchemeTokenGroups.includes(tokenGroup) ||
    Object.values(colorSchemeMap).includes(tokenGroup);

  if (!tokenGroupIsValid) {
    return null;
  }

  const fileName = `${tokenGroup}.json`;
  const githubUrl = "https://github.com/Shopify/polaris/blob";
  const rawUrl = "https://raw.githubusercontent.com/Shopify/polaris";

  if (isRaw)
    return `${rawUrl}/v9.0.0-major/src/tokens/token-groups/${fileName}`;

  return `${githubUrl}/v9.0.0-major/src/tokens/token-groups/${fileName}`;
};

/**
 * Format the token data into: css or json
 */
const formatTokenGroup = (
  data: { [tokenName: string]: string },
  format: string
) => {
  if (format === "css") {
    return Object.keys(data)
      .reduce((result: string[], key: string) => {
        const cssVariable = `--${key}: ${data[key]};`;

        result.push(cssVariable);

        return result;
      }, [])
      .join("\n");
  }

  return data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatParam = req.query.format || "json";
  const schemeParam = req.query.scheme || "light";

  if (typeof formatParam === "string" && typeof schemeParam === "string") {
    const colorSchemeTokenGroup = colorSchemeMap[schemeParam];
    let tokenGroupParam: any = req.query.tokens || "";
    let tokenGroups: string[] = [];

    // Determine which list(s) we are querying for based on the token param
    if (tokenGroupParam === "all") {
      tokenGroups = tokenGroups.concat(nonColorSchemeTokenGroups);
    }

    if (tokenGroupParam === "all" || tokenGroupParam === "colors") {
      tokenGroups.push(colorSchemeTokenGroup);
    }

    if (nonColorSchemeTokenGroups.includes(tokenGroupParam)) {
      tokenGroups.push(tokenGroupParam);
    }

    if (tokenGroups.length === 0) {
      res.status(400);
      res.json({ error: true, status: 400 });
      return;
    }

    // Convert the list of urls to a group of requests
    let requests: Promise<TokenObject>[] = [];
    try {
      requests = tokenGroups.map((tokenFile) => {
        const url = getGithubUrl(tokenFile, true);

        if (url === null) {
          throw new Error("Could not fetch tokens");
        }

        return fetch(url).then((res) => {
          const json = res.json() as unknown;
          return json as TokenObject;
        });
      });
    } catch (error) {
      res.status(400);
      res.json({ error: true, status: 400 });
      return;
    }

    const responses = await Promise.all(requests);

    // Combine all of the token data into a single object
    let tokenData: TokenObject = {};
    responses.forEach((response) => {
      tokenData = { ...tokenData, ...response };
    });

    const formattedTokenData = formatTokenGroup(tokenData, formatParam);

    if (formatParam === "css") {
      res.setHeader("content-type", "text/css");
      res.send(formattedTokenData);
    } else {
      res.json(formattedTokenData);
    }
  }

  return;
};

export default handler;
