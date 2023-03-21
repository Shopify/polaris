import Code from '../Code';
import {
  CodeBlock,
  Image as ImageType,
  ImageBlock,
  MarkdownBlock,
  ResolvedPageWithBlocks,
  SandboxEmbedBlock,
  TextImageBlock,
  YoutubeVideoBlock,
} from '@/types';
import Longform from '../Longform';
import Markdown from '../Markdown';
import styles from './EditorRenderer.module.scss';
import ImageRenderer from '../ImageRenderer';

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
            {block.blockType === 'Image' && (
              <ImageBlock block={block} images={page.images} />
            )}
            {block.blockType === 'YoutubeVideo' && (
              <YoutubeVideoBlock block={block} />
            )}
            {block.blockType === 'SandboxEmbed' && (
              <SandboxEmbedBlock block={block} />
            )}
            {block.blockType === 'Code' && <CodeBlock block={block} />}
            {block.blockType === 'TextImage' && (
              <TextImageBlock block={block} images={page.images} />
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

function ImageBlock({block, images}: {block: ImageBlock; images: ImageType[]}) {
  const image = images.find((image) => image.id === block.imageId);
  if (!image) return null;
  return <ImageRenderer image={image} width={800} />;
}

function TextImageBlock({
  block,
  images,
}: {
  block: TextImageBlock;
  images: ImageType[];
}) {
  const image = images.find((image) => image.id === block.imageId);
  if (!image) return null;
  return (
    <div className={styles.ImageText}>
      <Longform firstParagraphIsLede={false}>
        <Markdown>{block.content}</Markdown>
      </Longform>
      <div>
        <ImageRenderer image={image} width={500} />
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
        frameBorder={0}
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
  return <iframe src={url} width={600} height={400} />;
}

function CodeBlock({block}: {block: CodeBlock}) {
  const code = Object.values(block.code);
  return <Code code={code} />;
}

export default EditorRenderer;
