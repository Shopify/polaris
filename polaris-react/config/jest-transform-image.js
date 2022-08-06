import {basename} from 'path';

export default {
  process(src, filename) {
    const stringifedBasename = JSON.stringify(basename(filename));
    return `export default ${stringifedBasename};`;
  },
};
