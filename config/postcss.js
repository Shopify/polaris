import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import designTokenFunc from 'postcss-design-token-function';

import colorData from '../tokens/colors';
import borderRadiusData from '../tokens/border-radius';
import spacingData from '../tokens/spacing';
import shadowData from '../tokens/shadows';

export default function postcss({minify = true} = {}) {
  const processors = [
    designTokenFunc({name: 'quilt-shadow', data: shadowData}),
    designTokenFunc({name: 'quilt-color', data: colorData}),
    designTokenFunc({name: 'quilt-border-radius', data: borderRadiusData}),
    designTokenFunc({name: 'quilt-spacing', data: spacingData}),
    cssnext(),
  ];
  if (minify) { processors.push(cssnano()); }
  return processors;
}
