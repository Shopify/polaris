import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default function postcss({minify = true} = {}) {
  const processors = [autoprefixer()];
  if (minify) { processors.push(cssnano()); }
  return processors;
}
