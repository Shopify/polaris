import {createVar, tokens, TokenGroup} from '@shopify/polaris-tokens';
import {NextRequest, NextResponse} from 'next/server';

type TokenGroupKey = keyof typeof tokens;
export const tokenGroupKeys = Object.keys(tokens) as TokenGroupKey[];

const formats = ['json', 'css'] as const;
type Format = typeof formats[number];

const isFormat = (format: string | null): format is Format =>
  formats.includes(format as Format);

const isTokenGroupKey = (key: unknown): key is TokenGroupKey =>
  tokenGroupKeys.includes(key as TokenGroupKey);

const formatTokenGroup = (tokenGroup: TokenGroup, format: Format) => {
  const tokenValues = Object.fromEntries(
    Object.entries(tokenGroup).map(([token, value]) => [token, value]),
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

export async function GET(
  req: NextRequest,
  {params}: {params: {tokenGroup: string}},
) {
  const {searchParams} = new URL(req.url);
  const format = searchParams.get('format');
  const formatParam = isFormat(format) ? format : 'json';

  const tokenGroupParam = params.tokenGroup || '';
  let tokenData: TokenGroup = {};

  if (tokenGroupParam === 'all') {
    tokenGroupKeys.forEach((group) => {
      const tokenGroup = tokens[group];
      tokenData = {...tokenData, ...tokenGroup};
    });
  }

  if (isTokenGroupKey(tokenGroupParam)) {
    const tokenGroup: TokenGroup = tokens[tokenGroupParam];
    tokenData = {...tokenData, ...tokenGroup};
  }

  if (Object.keys(tokenData).length === 0) {
    return NextResponse.error();
  }

  const formattedTokenData = formatTokenGroup(tokenData, formatParam);

  if (formatParam === 'css') {
    return new Response(formattedTokenData.toString(), {
      status: 200,
      headers: {
        'content-type': 'text/plain',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'true',
        'Access-Control-Allow-Methods': 'true',
        'Access-Control-Allow-Headers':
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      },
    });
  } else {
    return NextResponse.json(formattedTokenData);
  }
}
