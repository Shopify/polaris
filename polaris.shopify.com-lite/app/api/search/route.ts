import {NextRequest, NextResponse} from 'next/server';
import {content} from '@/content';
import {getResolvedPage} from '@/utils';
import Fuse from 'fuse.js';
import iconsMeta from '@shopify/polaris-icons/metadata';
import {metadata, MetadataProperties} from '@shopify/polaris-tokens';
import {blockTypes} from '@/types';

export type SearchResult = {
  id: string;
  type: 'page' | 'icon' | 'token';
  title: string;
  excerpt: string;
  url: string;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const q = searchParams.get('q');

  if (q) {
    let searchResults: {
      id: string;
      title: string;
      excerpt: string;
      body: string;
      url: string;
    }[] = content.pages
      .map((page) => getResolvedPage(content, page, true))
      .map((page) => ({
        id: page.id,
        title: page.title,
        excerpt: page.excerpt,
        url: page.url,
        body: page.blocks
          .map((block) => {
            switch (block.blockType) {
              case 'Markdown':
                return block.content;

              case 'TextImage':
                return block.content;

              default:
                return '';
            }
          })
          .join(' '),
      }));

    const tokenGroups = Object.keys(metadata) as Array<keyof typeof metadata>;
    tokenGroups.forEach((group) => {
      const tokenGroup = metadata[group];
      Object.entries(tokenGroup).forEach(
        ([tokenName, tokenProperties]: [string, MetadataProperties]) => {
          searchResults.push({
            id: tokenName,
            title: tokenName,
            body: tokenProperties.description || '',
            excerpt: tokenProperties.description || '',
            url: `/tokens/?TODO`,
            // meta: {
            //   tokens: {
            //     category: groupSlug,
            //     token: {
            //       name: tokenName,
            //       description: tokenProperties.description || '',
            //       value: tokenProperties.value,
            //     },
            //   },
            // },
          });
        },
      );
    });

    const fuse = new Fuse(searchResults, {
      keys: [
        {name: 'title', weight: 100},
        // {name: 'excerpt', weight: 50},
        {name: 'body', weight: 100},
      ],
      includeScore: false,
      threshold: 0.5,
      shouldSort: true,
      ignoreLocation: true,
      isCaseSensitive: true,
    });

    // Object.keys(iconsMeta).forEach((fileName) => {
    //   searchResults.push({
    //     id: fileName,
    //     title: iconsMeta[fileName].name,
    //     excerpt: iconsMeta[fileName].description,
    //     url: `/icons?icon=${fileName}`,
    //     type: 'icon',
    //   });
    // });

    const fuseResults: SearchResult[] = fuse
      .search(q)
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .map((fuseResult) => fuseResult.item)
      .slice(0, 20)
      .map((page) => {
        return {
          id: page.id,
          title: page.title,
          excerpt: page.body,
          url: page.url,
          type: 'page',
        };
      });

    return NextResponse.json(fuseResults);
  }
}
