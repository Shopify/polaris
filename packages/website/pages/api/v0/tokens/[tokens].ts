import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch';

/**
 * List of token groups
 */
export const colorSchemeMap = {
  light: 'color.light',
  dark: 'color.dark',
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
export const getGithubUrl = (file, isRaw) => {
  const fileName = `${file}.json`;
  const githubUrl = "https://github.com/Shopify/polaris-react/blob";
  const rawUrl = "https://raw.githubusercontent.com/Shopify/polaris-react";

  if (isRaw) return `${rawUrl}/v9.0.0-major/src/tokens/token-groups/${fileName}`;

  return `${githubUrl}/v9.0.0-major/src/tokens/token-groups/${fileName}`;
};

/**
 * Format the token data into: css or json
 */
const formatTokenGroup = (data, format) => {
  if (format === 'css') {
    return Object.keys(data).reduce((result, key) => {
      const cssVariable = `--${key}: ${data[key]};`;

      result.push(cssVariable);

      return result;
    }, []).join('\n');
  }

  return data;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatParam:any = req.query.format || 'json';
  const schemeParam:any = req.query.scheme || 'light';
  const colorSchemeTokenGroup = colorSchemeMap[schemeParam];
  let tokenGroupParam:any = req.query.tokens || '';
  let tokenGroups = [];

  // Determine which list(s) we are querying for based on the token param
  if (tokenGroupParam === 'all') {
    tokenGroups = tokenGroups.concat(nonColorSchemeTokenGroups)
  }

  if (tokenGroupParam === 'all' || tokenGroupParam === 'colors') {
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
  const requests = tokenGroups.map(tokenFile => {
    const url = getGithubUrl(tokenFile, true);

    return fetch(url).then(res => res.json())
  });
  const responses = await Promise.all(requests);

  // Reduce all of the token data into a single object
  const tokenData = responses.reduce((result:any, tokenGroup, index) => {
    const data:any = responses?.[index] || {};

    return {...result, ...data};
  }, {});
  const formattedTokenData = formatTokenGroup(tokenData, formatParam);

  if (formatParam === 'css') {
    res.setHeader('content-type', 'text/css');
    res.send(formattedTokenData);
  } else {
    res.json(formattedTokenData);
  }

  return;
};

export default handler;
