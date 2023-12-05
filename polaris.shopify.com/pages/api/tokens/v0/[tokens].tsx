import type {Theme} from '@shopify/polaris-tokens';
import {
  createVarName,
  isTokenName,
  themeDefault,
} from '@shopify/polaris-tokens';
import type {NextApiRequest, NextApiResponse} from 'next';

type TokenGroupName = keyof Theme;
type TokenGroup = Theme[TokenGroupName];

export const tokenGroupNames = Object.keys(themeDefault) as TokenGroupName[];

const formats = ['json', 'css'] as const;

type Format = typeof formats[number];

function isFormat(format: unknown): format is Format {
  return formats.includes(format as Format);
}

function isTokenGroupName(key: unknown): key is TokenGroupName {
  return tokenGroupNames.includes(key as TokenGroupName);
}

/**
 * Format the token data into: css or json
 */
const formatTokenGroup = (tokenGroup: Partial<TokenGroup>, format: Format) => {
  const tokenValues = Object.fromEntries(
    Object.entries(tokenGroup).map(([token, value]) => [token, value]),
  );

  if (format === 'css') {
    return Object.keys(tokenValues)
      .reduce<string[]>((result, tokenName) => {
        if (!isTokenName(tokenName)) {
          throw new Error(`Invalid token name: ${tokenName}`);
        }

        const cssVariable = `${createVarName(tokenName)}: ${
          tokenValues[tokenName]
        };`;

        result.push(cssVariable);

        return result;
      }, [])
      .join('\n');
  }

  return tokenValues;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatParam = isFormat(req.query.format) ? req.query.format : 'json';

  if (typeof formatParam === 'string') {
    const tokenGroupParam = req.query.tokens || '';
    let tokenData: Partial<TokenGroup> = {};

    // Determine which list(s) we are querying for based on the token param
    if (tokenGroupParam === 'all') {
      tokenGroupNames.forEach((tokenGroupName) => {
        const tokenGroup = themeDefault[tokenGroupName];

        tokenData = {...tokenData, ...tokenGroup};
      });
    }

    if (isTokenGroupName(tokenGroupParam)) {
      const tokenGroup: TokenGroup = themeDefault[tokenGroupParam];

      tokenData = {...tokenData, ...tokenGroup};
    }

    if (Object.keys(tokenData).length === 0) {
      res.status(400);
      res.json({error: true, status: 400});
      return;
    }

    const formattedTokenData = formatTokenGroup(tokenData, formatParam);

    if (formatParam === 'css') {
      res.setHeader('content-type', 'text/plain');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'true');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      );
      res.send(formattedTokenData);
    } else {
      res.json(formattedTokenData);
    }
  }
};

export default handler;
