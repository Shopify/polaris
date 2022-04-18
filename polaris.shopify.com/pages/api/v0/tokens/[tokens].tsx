import {
  TokenGroup,
  ColorScheme,
  createVar,
  tokens,
} from '@shopify/polaris-tokens';
import type {NextApiRequest, NextApiResponse} from 'next';

/**
 * Color scheme independent token groups
 */
export const staticTokenGroupKeys = [
  'depth',
  'legacyTokens',
  'motion',
  'shape',
  'spacing',
  'typography',
  'zIndex',
] as const;

type StaticTokenGroupKey = typeof staticTokenGroupKeys[number];

const tokenGroupKeys = ['all', 'colors', ...staticTokenGroupKeys] as const;

type TokenGroupKey = typeof tokenGroupKeys[number];

const formats = ['json', 'css'] as const;

type Format = typeof formats[number];

function isFormat(format: unknown): format is Format {
  return formats.includes(format as Format);
}

function isScheme(scheme: unknown): scheme is ColorScheme {
  return Object.keys(tokens.colorSchemes).includes(scheme as ColorScheme);
}

/**
 * Format the token data into: css or json
 */
const formatTokenGroup = (tokenGroup: TokenGroup, format: Format) => {
  const tokenValues = Object.fromEntries(
    Object.entries(tokenGroup).map(([token, tokenProps]) => [
      token,
      tokenProps.value,
    ]),
  );

  if (format === 'css') {
    return Object.keys(tokenValues)
      .reduce<string[]>((result, token) => {
        const cssVariable = `${createVar(token)}: ${tokenValues[token]};`;

        result.push(cssVariable);

        return result;
      }, [])
      .join('\n');
  }

  return tokenValues;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatParam = isFormat(req.query.format) ? req.query.format : 'json';
  const schemeParam = isScheme(req.query.scheme) ? req.query.scheme : 'light';

  if (typeof formatParam === 'string' && typeof schemeParam === 'string') {
    const tokenGroupParam = (req.query.tokens || '') as TokenGroupKey;
    let tokenData: TokenGroup = {};

    // Determine which list(s) we are querying for based on the token param
    if (tokenGroupParam === 'all') {
      staticTokenGroupKeys.forEach((group) => {
        const tokenGroup: TokenGroup = tokens[group] || {};

        tokenData = {...tokenData, ...tokenGroup};
      });
    }

    if (tokenGroupParam === 'all' || tokenGroupParam === 'colors') {
      const colorSchemeTokenGroup: TokenGroup =
        tokens.colorSchemes[schemeParam] || {};

      tokenData = {...tokenData, ...colorSchemeTokenGroup};
    }

    if (staticTokenGroupKeys.includes(tokenGroupParam as StaticTokenGroupKey)) {
      const tokenGroupName = tokenGroupParam as StaticTokenGroupKey;
      const tokenGroup: TokenGroup = tokens[tokenGroupName] || {};

      tokenData = {...tokenData, ...tokenGroup};
    }

    if (Object.keys(tokenData).length === 0) {
      res.status(400);
      res.json({error: true, status: 400});
      return;
    }

    const formattedTokenData = formatTokenGroup(tokenData, formatParam);

    if (formatParam === 'css') {
      res.setHeader('content-type', 'text/css');
      res.send(formattedTokenData);
    } else {
      res.json(formattedTokenData);
    }
  }
};

export default handler;
