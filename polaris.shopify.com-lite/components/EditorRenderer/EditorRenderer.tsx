import Code from '../Code';
import {
  Block,
  CodeBlock as CodeblockType,
  DoDontBlock,
  Image,
  Image as ImageType,
  ImageBlock,
  MarkdownBlock,
  Page,
  ResolvedPage,
  SandboxEmbedBlock,
  TabbedContentBlock,
  TextImageBlock,
  YoutubeVideoBlock,
} from '@/types';
import Markdown from '../Markdown';
import styles from './EditorRenderer.module.scss';
import ImageRenderer from '../ImageRenderer';
import {Tab, Tabs} from '../Tabs';
import {className} from '@/utils';
import {Fragment} from 'react';
import Iframe from '../Iframe';

interface Props {
  page: ResolvedPage;
}

function EditorRenderer({page}: Props) {
  return (
    <div className={styles.EditorRenderer}>
      <RenderBlocks blocks={page.blocks} />
    </div>
  );
}

function RenderBlocks({blocks}: {blocks: Block[]}) {
  return (
    <>
      {blocks.map((block) => (
        <Fragment key={block.id}>
          {block.blockType === 'Markdown' && <MarkdownBlock block={block} />}
          {block.blockType === 'Image' && <ImageBlock block={block} />}
          {block.blockType === 'YoutubeVideo' && (
            <YoutubeVideoBlock block={block} />
          )}
          {block.blockType === 'SandboxEmbed' && (
            <SandboxEmbedBlock block={block} />
          )}
          {block.blockType === 'Code' && <CodeBlock block={block} />}
          {block.blockType === 'TextImage' && <TextImageBlock block={block} />}
          {block.blockType === 'DoDont' && <DoDontBock block={block} />}
          {block.blockType === 'TabbedContent' && (
            <TabbedContentBlock block={block} />
          )}
        </Fragment>
      ))}
    </>
  );
}

function MarkdownBlock({block}: {block: MarkdownBlock}) {
  return <Markdown>{block.content}</Markdown>;
}

function ImageBlock({block}: {block: ImageBlock}) {
  return <ImageRenderer image={block.image} width={800} />;
}

function TextImageBlock({block}: {block: TextImageBlock}) {
  return (
    <div className={styles.ImageText}>
      <div>
        <Markdown>{block.content}</Markdown>
      </div>
      <div>
        <ImageRenderer image={block.image} width={500} />
      </div>
    </div>
  );
}

function YoutubeVideoBlock({block}: {block: YoutubeVideoBlock}) {
  function getYoutubeIdFromUrl(url: string): string | null {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : null;
  }

  const youtubeId = getYoutubeIdFromUrl(block.youtubeUrl);
  if (!youtubeId) return null;
  return (
    <div className={styles.ResponsiveEmbed}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function SandboxEmbedBlock({block}: {block: SandboxEmbedBlock}) {
  let url = block.embedUrl;
  url = url.replace('sandbox?', '/playroom/preview/index.html?');
  if (process.env.NODE_ENV === 'production') {
    url = url.replace('http://localhost:3000', 'https://polaris.shopify.com');
  }
  return (
    <Iframe src={url} minBreakpoint="breakpoints-lg" aspectRatio="16 / 9" />
  );
}

function CodeBlock({block}: {block: CodeblockType}) {
  return <Code snippets={block.snippets} />;
}

function DoDontBock({block}: {block: DoDontBlock}) {
  return (
    <>
      {block.doMarkdown && (
        <div className={className(styles.DoDontItem, styles.do)}>
          <h4>✅ Do</h4>
          <div className={styles.DoDontMarkdown}>
            <Markdown>{block.doMarkdown}</Markdown>
          </div>
        </div>
      )}
      {block.dontMarkdown && (
        <div className={className(styles.DoDontItem, styles.dont)}>
          <h4>❌ Don't</h4>
          <div className={styles.DoDontMarkdown}>
            <Markdown>{block.dontMarkdown}</Markdown>
          </div>
        </div>
      )}
    </>
  );
}

function TabbedContentBlock({block}: {block: TabbedContentBlock}) {
  return (
    <div>
      <Tabs tabs={block.tabs.map(({id, label}) => ({id, label}))} boxed>
        {block.tabs.map((tab) => (
          <Tab key={tab.id}>
            <RenderBlocks blocks={tab.blocks} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default EditorRenderer;
