import type {NextApiRequest, NextApiResponse} from 'next';
import fetch from 'node-fetch';

interface TokenGroup {
  [token: string]: string;
}

/**
 * Colors token groups
 */
export const colorTokenGroupKeys = ['color.light', 'color.dark'] as const;

type ColorTokenGroupKey = typeof colorTokenGroupKeys[number];

/**
 * Color scheme independent token groups
 */
export const staticTokenGroupKeys = [
  'depth',
  'legacy-tokens',
  'motion',
  'shape',
  'spacing',
  'typography',
  'z-index',
] as const;

type StaticTokenGroupKey = typeof staticTokenGroupKeys[number];

function isStaticTokenGroup(
  tokenGroupKey: unknown,
): tokenGroupKey is StaticTokenGroupKey {
  return staticTokenGroupKeys.includes(tokenGroupKey as StaticTokenGroupKey);
}

const tokenGroupKeys = ['all', 'colors', ...staticTokenGroupKeys] as const;

type TokenGroupKey = typeof tokenGroupKeys[number];

function isTokenGroupKey(
  tokenGroupKey: unknown,
): tokenGroupKey is TokenGroupKey {
  return tokenGroupKeys.includes(tokenGroupKey as TokenGroupKey);
}

const schemes = ['light', 'dark'] as const;

export type Scheme = typeof schemes[number];

function isScheme(scheme: unknown): scheme is Scheme {
  return schemes.includes(scheme as Scheme);
}

/**
 * Mapping of color schemes to color token group keys
 */
export const colorSchemeMap: {[C in Scheme]: ColorTokenGroupKey} = {
  light: 'color.light',
  dark: 'color.dark',
};

const formats = ['json', 'css'] as const;

type Format = typeof formats[number];

function isFormat(format: unknown): format is Format {
  return formats.includes(format as Format);
}

/**
 * Create the valid github url for a token file.
 */
export const getGithubUrl = (file: string, isRaw: boolean) => {
  const fileName = `${file}.json`;
  const githubUrl = 'https://github.com/Shopify/polaris/blob';
  const rawUrl = 'https://raw.githubusercontent.com/Shopify/polaris';
  const filePath = `/main/polaris-react/src/tokens/token-groups/${fileName}`;

  if (isRaw) return `${rawUrl}${filePath}`;

  return `${githubUrl}${filePath}`;
};

/**
 * Format the token data into: css or json
 */
const formatTokenGroup = (tokenGroup: TokenGroup, format: Format) => {
  if (format === 'css') {
    return Object.keys(tokenGroup)
      .reduce<string[]>((result, token) => {
        const cssVariable = `--${token}: ${tokenGroup[token]};`;

        result.push(cssVariable);

        return result;
      }, [])
      .join('\n');
  }

  return tokenGroup;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const formatParam = (req.query.format || 'json') as Format;
  const schemeParam = (req.query.scheme || 'light') as Scheme;

  if (typeof formatParam === 'string' && typeof schemeParam === 'string') {
    const colorSchemeTokenGroup = colorSchemeMap[schemeParam];
    const tokenGroupParam: any = req.query.tokens || '';
    let tokenGroups: string[] = [];

    // Determine which list(s) we are querying for based on the token param
    if (tokenGroupParam === 'all') {
      tokenGroups = tokenGroups.concat(staticTokenGroupKeys);
    }

    if (tokenGroupParam === 'all' || tokenGroupParam === 'colors') {
      tokenGroups.push(colorSchemeTokenGroup);
    }

    if (staticTokenGroupKeys.includes(tokenGroupParam)) {
      tokenGroups.push(tokenGroupParam);
    }

    if (tokenGroups.length === 0) {
      res.status(400);
      res.json({error: true, status: 400});
      return;
    }

    // Convert the list of urls to a group of requests
    let requests: Promise<TokenGroup>[] = [];
    try {
      requests = tokenGroups.map((tokenFile) => {
        const url = getGithubUrl(tokenFile, true);

        if (url === null) {
          throw new Error('Could not fetch tokens');
        }

        return fetch(url).then((res) => {
          const json = res.json() as unknown;

          return json as TokenGroup;
        });
      });
    } catch (error) {
      res.status(400);
      res.json({error: true, status: 400});
      return;
    }

    const responses = await Promise.all(requests);

    // Combine all of the token data into a single object
    let tokenData: TokenGroup = {};
    responses.forEach((response) => {
      tokenData = {...tokenData, ...response};
    });

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
