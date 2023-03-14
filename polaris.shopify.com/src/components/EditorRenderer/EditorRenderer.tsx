import Image from 'next/image';
// import {content} from '../../content';
import Code from '../Code';
import {
  CodeBlock,
  ImageBlock,
  MarkdownBlock,
  ResolvedPageWithBlocks,
  SandboxEmbedBlock,
  TextImageBlock,
  YoutubeVideoBlock,
} from '../Editor/types';
import Longform from '../Longform';
import Markdown from '../Markdown';
import styles from './EditorRenderer.module.scss';

interface Props {
  page: ResolvedPageWithBlocks;
}

function EditorRenderer({page}: Props) {
  return (
    <div className={styles.EditorRenderer}>
      <div className={styles.Blocks}>
        {page.blocks.map((block) => (
          <div key={block.id} className={styles.Block}>
            {block.blockType === 'Markdown' && <MarkdownBlock block={block} />}
            {block.blockType === 'Image' && <ImageBlock block={block} />}
            {block.blockType === 'YoutubeVideo' && (
              <YoutubeVideoBlock block={block} />
            )}
            {block.blockType === 'SandboxEmbed' && (
              <SandboxEmbedBlock block={block} />
            )}
            {block.blockType === 'Code' && <CodeBlock block={block} />}
            {block.blockType === 'TextImage' && (
              <TextImageBlock block={block} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkdownBlock({block}: {block: MarkdownBlock}) {
  return (
    <Longform firstParagraphIsLede={false}>
      <Markdown>{block.content}</Markdown>
    </Longform>
  );
}

function ImageBlock({block}: {block: ImageBlock}) {
  return null;
  const image = content.images.find((image) => image.id === block.imageId);
  if (!image) {
    return null;
  }
  const lightVersion = image.variants.light;
  if (!lightVersion) {
    return null;
  }
  const WIDTH = 1200;
  return (
    <Image
      src={`/uploads/${lightVersion.fileName}`}
      alt={lightVersion.alt}
      width={WIDTH}
      height={lightVersion.height * (WIDTH / lightVersion.width)}
    />
  );
}

function TextImageBlock({block}: {block: TextImageBlock}) {
  return null;
  const image = content.images.find((image) => image.id === block.imageId);
  if (!image) {
    return null;
  }
  const lightVersion = image.variants.light;
  if (!lightVersion) {
    return null;
  }
  const WIDTH = 600;
  return (
    <div className={styles.ImageText}>
      <Longform firstParagraphIsLede={false}>
        <Markdown>{block.content}</Markdown>
      </Longform>
      <div>
        <Image
          src={`/uploads/${lightVersion.fileName}`}
          alt={lightVersion.alt}
          width={WIDTH}
          height={lightVersion.height * (WIDTH / lightVersion.width)}
        />
      </div>
    </div>
  );
}

function YoutubeVideoBlock({block}: {block: YoutubeVideoBlock}) {
  return <p>(TODO: Implement youtube videos)</p>;
}

function SandboxEmbedBlock({block}: {block: SandboxEmbedBlock}) {
  let url = block.embedUrl;
  url = url.replace('sandbox?', '/playroom/preview/index.html?');
  if (process.env.NODE_ENV === 'production') {
    url = url.replace('http://localhost:3000', 'https://polaris.shopify.com');
  }
  return <iframe src={url} width={600} height={400} />;
}

function CodeBlock({block}: {block: CodeBlock}) {
  const code = Object.values(block.code);
  return <Code code={code} />;
}

export default EditorRenderer;
