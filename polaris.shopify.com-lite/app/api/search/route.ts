import {NextRequest, NextResponse} from 'next/server';
import {content} from '@/content';
import {getPageByPath, getPageUrl, getResolvedPage} from '@/utils';
import Fuse from 'fuse.js';
import iconsMeta from '@shopify/polaris-icons/metadata';
import {metadata, MetadataProperties} from '@shopify/polaris-tokens';
import {Image} from '@/types';

enum SearchResultType {
  Page = 'Page',
  Token = 'Token',
  Icon = 'Icon',
}

interface IndexItem {
  id: string;
  title: string;
  keywords: string[];
  excerpt: string;
  body: string;
  url: string;
  urlAppendix: string;
  type: SearchResultType;
  thumbnail?: Image;
}

export type SearchResult = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  urlAppendix: string;
  type: SearchResultType;
  thumbnail?: Image;
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
    let searchIndex: IndexItem[] = content.pages
      .map((page) => getResolvedPage(content, page, true))
      .map((page) => ({
        id: page.id,
        title: page.title,
        keywords: page.keywords,
        excerpt: page.excerpt,
        body:
          page.excerpt +
          ' ' +
          page.blocks
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
        url: getPageUrl(content, page),
        urlAppendix: '',
        thumbnail: page.images.find(
          (image) => image.id === page.thumbnailImageId,
        ),
        type: SearchResultType.Page,
      }));

    const tokensPage = getPageByPath(content, 'tokens');
    if (tokensPage) {
      const tokenGroups = Object.keys(metadata) as Array<keyof typeof metadata>;
      tokenGroups.forEach((group) => {
        const tokenGroup = metadata[group];
        Object.entries(tokenGroup).forEach(
          ([tokenName, tokenProperties]: [string, MetadataProperties]) => {
            searchIndex.push({
              id: tokenName,
              title: tokenName,
              body: tokenProperties.description || '',
              excerpt: tokenProperties.description || '',
              keywords: ['token', group],
              url: `tokens/${group}`,
              urlAppendix: `?token=${tokenName}`,
              type: SearchResultType.Token,
            });
          },
        );
      });
    }

    Object.keys(iconsMeta).forEach((fileName) => {
      const meta = iconsMeta[fileName];
      searchIndex.push({
        id: fileName,
        title: `${meta.name} (${meta.set})`,
        keywords: ['icon', ...meta.keywords],
        excerpt: meta.description,
        body: '',
        url: 'icons',
        urlAppendix: `?q=${fileName}`,
        type: SearchResultType.Icon,
      });
    });

    const fuse = new Fuse(searchIndex, {
      keys: [
        {name: 'title', weight: 100},
        {name: 'keywords', weight: 50},
        {name: 'body', weight: 10},
      ],
      includeScore: false,
      threshold: 0.5,
      shouldSort: true,
      isCaseSensitive: false,
      fieldNormWeight: 3,
      includeMatches: true,
    });

    const fuseResults: SearchResult[] = fuse
      .search(q)
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .map((result) => result.item)
      .slice(0, 20)
      .map((result) => {
        return {
          id: result.id,
          title: result.title,
          excerpt: result.excerpt,
          url: result.url,
          urlAppendix: result.urlAppendix,
          type: result.type,
          thumbnail: result.thumbnail,
        };
      });

    return NextResponse.json(fuseResults);
  }
}
