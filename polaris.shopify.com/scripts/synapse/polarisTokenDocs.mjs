/* eslint-disable */
import {stripIndents} from 'common-tags';

export default function polarisTokenDocs(options = {delim: '----------'}) {
  const parser = (doc) => {
    const bitsRaw = doc.split(options.delim);
    const bits = bitsRaw.map((bit) => {
      const title = bit.split('\n\n')[0];

      return {
        type: 'BitNode',
        data: {
          title,
          text: stripIndents(bit),
          metadata: {
            slug: `/tokens/colors#${title.replace(/\n/, '')}`,
          },
        },
      };
    });

    return {
      type: 'root',
      children: bits,
    };
  };

  Object.assign(this, {Parser: parser});
}
