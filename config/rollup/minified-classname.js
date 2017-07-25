const cssNames = (function* () {
  // 10 Digits + 26 lowercase letters.
  const base = 36;
  const min = parseInt('a0', base);
  const max = parseInt('zz', base);
  const maxLength = max - min;
  const taken = new Set([
    parseInt('ad', base), // Avoid terms that may be flagged by content blockers.
  ]);

  while (taken.size < maxLength) {
    let cssInt;
    do {
      cssInt = Math.floor(Math.random() * maxLength);
    } while (taken.has(cssInt));

    taken.add(cssInt);

    const cssString = (min + cssInt).toString(base);
    yield `p_${cssString}`;
  }

  throw new Error('Ran out of minified CSS names');
})();

const cache = {
  files: {},
};

export default function getMinifiedClassName(localName, filePath) {
  const file = cache.files[filePath] || {};
  const className = file[localName] || cssNames.next().value;

  file[localName] = className;
  cache.files[filePath] = file;
  return className;
}
