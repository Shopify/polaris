/* eslint-disable id-length */
import {Token} from './types';
import apiColorTokens from './tokens/apiTokenColors.json';

const tokens: {
  [tokenName: string]: Token;
} = {};

apiColorTokens.forEach((token) => {
  tokens[token.name] = token;
});

export const rgbaToHex = (rgba: RGBA): string => {
  const color = ((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b)
    .toString(16)
    .slice(1)
    .toUpperCase()
    .toString();

  if (color.length > 6) {
    return color.slice(0, 6);
  }

  return color;
};

export const solidPaintToRgba = (solidPaint: SolidPaint): RGBA => {
  return {
    r: solidPaint.color.r * 255 || 0,
    g: solidPaint.color.g * 255 || 0,
    b: solidPaint.color.b * 255 || 0,
    a: solidPaint.opacity || 1,
  };
};

export function rgbaDistance(a: RGBA, b: RGBA): number {
  return Math.sqrt(
    (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2 + (a.a - b.a) ** 2,
  );
}

const tokensArray = Object.values(tokens);
const backgroundTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Background'),
);
const surfaceTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Surface'),
);
// const shadowTokens: Token[] = tokensArray.filter(({figmaName}) =>
//   figmaName.startsWith('Shadow'),
// );
// const hintTokens: Token[] = tokensArray.filter(({figmaName}) =>
//   figmaName.startsWith('Hint'),
// );
const textTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Text'),
);
const iconTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Icon'),
);
const interactiveTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Interactive'),
);
const borderTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Border'),
);
const dividerTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Divider'),
);
const focusedTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Focused'),
);
const actionTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Action'),
);
const decorativeTokens: Token[] = tokensArray.filter(({figmaName}) =>
  figmaName.startsWith('Decorative'),
);

const closestTokenCache: {[key: string]: Token} = {};

function getRelevantTokens(
  type?: 'fill' | 'stroke',
  layerType?: string,
): Token[] {
  if (type === 'fill') {
    const fillTypes = [
      'FRAME',
      'VECTOR',
      'STAR',
      'LINE',
      'POLYGON',
      'RECTANGLE',
      'ELLIPSE',
    ];
    if (layerType && fillTypes.includes(layerType)) {
      return [
        ...backgroundTokens,
        ...surfaceTokens,
        ...iconTokens,
        ...interactiveTokens,
        ...focusedTokens,
        ...actionTokens,
        ...decorativeTokens,
      ];
    }
    if (layerType === 'TEXT') {
      return [...textTokens];
    }
  } else {
    const strokeTypes = ['FRAME', 'STAR', 'POLYGON', 'RECTANGLE', 'ELLIPSE'];
    if (layerType && strokeTypes.includes(layerType)) {
      return [...borderTokens, ...dividerTokens];
    }
    if (layerType === 'VECTOR' || layerType === 'LINE') {
      return [
        ...backgroundTokens,
        ...surfaceTokens,
        ...iconTokens,
        ...interactiveTokens,
        ...focusedTokens,
        ...actionTokens,
        ...decorativeTokens,
        ...borderTokens,
        ...dividerTokens,
      ];
    }
  }

  return Object.values(tokens);
}

export function getClosestToken(
  color: RGBA,
  type?: 'fill' | 'stroke',
  layerType?: string,
): Token | undefined {
  let lowestDistance = Number.POSITIVE_INFINITY;
  let currentDistance: number;
  let closestToken: Token | undefined;

  const cacheKey = `${color.r}-${color.g}-${color.b}-${color.a}`;
  const cachedToken = closestTokenCache[cacheKey];
  if (cachedToken) {
    return cachedToken;
  }

  const relevantTokens = getRelevantTokens(type, layerType);

  relevantTokens.forEach((token) => {
    currentDistance = rgbaDistance(color, token.value);
    if (currentDistance < lowestDistance) {
      lowestDistance = currentDistance;
      closestToken = token;
    }
  });

  if (closestToken) {
    closestTokenCache[cacheKey] = closestToken;
  }

  return closestToken;
}
