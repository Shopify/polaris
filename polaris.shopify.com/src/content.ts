import {Content} from './components/Editor/types';

/*
  Automatically generated file (created by /api/editor.tsx).
  Do not edit by hand.
*/

const pages: Content['pages'] = [
  {
    id: 'q8-Jo4EkKxZ2iC0sWiZRn',
    title: 'Compoents',
    slug: 'q8-Jo4EkKxZ2iC0sWiZRn',
    parentId: null,
    order: 0,
    rendering: 'custom',
    blocks: [
      {
        id: 'aypz3iDuqGEhWMCwox1iJ',
        order: 0,
        parentBlockId: null,
        blockType: 'Image',
        imageId: null,
      },
      {
        id: 'SqFz6OOeUw4hLa83Ok7Tq',
        order: 1,
        parentBlockId: null,
        blockType: 'Markdown',
        content: '',
      },
      {
        id: 'I2RgfQPrGcRYwkHTOkT1k',
        order: 2,
        parentBlockId: null,
        blockType: 'YoutubeVideo',
        youtubeUrl: '',
      },
    ],
    keywords: [],
    pageMeta: null,
    childPageMetaType: 'components',
  },
  {
    id: 'oX8eLoSG7v_idEi5RyVNd',
    title: 'New page',
    slug: 'oX8eLoSG7v_idEi5RyVNd',
    parentId: 'q8-Jo4EkKxZ2iC0sWiZRn',
    order: 0,
    rendering: 'blocks',
    blocks: [],
    keywords: [],
    childPageMetaType: null,
    pageMeta: {
      type: 'components',
      category: '',
      description: '',
      examples: [],
    },
  },
  {
    id: 'oX8eLoSG7v_idEi5RyVNx',
    title: 'New page',
    slug: 'oX8eLoSG7v_idEi5RyVNd',
    parentId: null,
    order: 0,
    rendering: 'custom',
    blocks: [],
    keywords: [],
    childPageMetaType: 'patterns',
    pageMeta: {
      type: 'components',
      category: '',
      description: '',
      examples: [],
    },
  },
  {
    id: 'kZigLCqo346U24xoGed3x',
    title: 'New page',
    slug: 'kZigLCqo346U24xoGed3x',
    parentId: 'oX8eLoSG7v_idEi5RyVNx',
    order: 0,
    rendering: 'blocks',
    blocks: [],
    keywords: [],
    childPageMetaType: null,
    pageMeta: {
      type: 'patterns',
      tags: [],
    },
  },
];

const images: Content['images'] = [];

export const content: Content = {pages, images};
