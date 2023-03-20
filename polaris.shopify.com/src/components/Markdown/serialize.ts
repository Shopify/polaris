import {type MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import {visit} from 'unist-util-visit';
import type {Plugin} from 'unified';

export type DefaultScope = Record<string, unknown>;
export type DefaultFrontmatter = Record<string, unknown>;
export type SerializedMdx<
  TFrontmatter = DefaultFrontmatter,
  TScope = DefaultScope,
> = MDXRemoteSerializeResult<TScope, TFrontmatter>;

// rehype-raw will strip the non-HTML-standard `meta` field from the node when
// converting the parsed markdown to HTML, so we have to capture it in a
// different property which wont be stripped out.
function codeMetaAsDataAttribute(): Plugin {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.meta) {
        const data = node.data || (node.data = {});
        const props = data.hProperties || (data.hProperties = {});
        props.meta = node.meta;
      }
    });
  };
}

// NOTE: This function can work on the client side, but it's meant to ve used on
// the server. To reduce client bundle size, this function should only be
// imported directly in a page level component, and not exported from this
// folder's index file.
export const serializeMdx = <
  TFrontmatter = Record<string, unknown>,
  TScope = Record<string, unknown>,
>(
  content: string,
  mdxOptions?: Exclude<
    Parameters<typeof serialize>[1],
    undefined
  >['mdxOptions'],
) => {
  return serialize<TScope, TFrontmatter>(content, {
    parseFrontmatter: true,
    mdxOptions: {
      ...mdxOptions,
      remarkPlugins: [
        [remarkGfm, {tablePipeAlign: true}],
        remarkUnwrapImages,
        ...(mdxOptions?.remarkPlugins ?? []),
        codeMetaAsDataAttribute,
      ],
      rehypePlugins: [
        // TODO: FIXME: Why does this throw an error?
        //rehypeRaw,
        rehypeSlug,
        ...(mdxOptions?.rehypePlugins ?? []),
      ],
    },
  });
};
