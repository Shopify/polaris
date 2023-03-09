import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {content} from '../../content';
import Code from '../Code';
import {
  CodeBlock,
  ImageBlock,
  MarkdownBlock,
  SandboxEmbedBlock,
  TextImageBlock,
  YoutubeVideoBlock,
} from '../Editor/types';
import Longform from '../Longform';
import Markdown from '../Markdown';
import Page from '../Page';
import styles from './EditorRenderer.module.scss';

interface Props {}

function EditorRenderer({}: Props) {
  const router = useRouter();
  const {id} = router.query;
  const [currentTabId, setCurrentTabId] = useState<string | null>(null);
  const page = content.pages.find((page) => page.id === id);
  if (!page) {
    return <p>Page not found</p>;
  }

  const tabs = content.tabs.filter((tab) => tab.pageId === page.id);
  if (!tabs) {
    return <p>Page has no tabs</p>;
  }

  const tabIds = tabs.map((tab) => tab.id);
  const blocks = content.blocks.filter((block) => tabIds.includes(block.tabId));
  let currentTab = tabs.find((tab) => tab.id === currentTabId) || tabs[0];

  return (
    <Page showTOC>
      <div className={styles.EditorRenderer}>
        <Longform>
          <h1 className={styles.PageTitle}>{page.title}</h1>
        </Longform>

        {tabs.length > 1 && (
          <div className={styles.Tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={styles.TabButton}
                onClick={() => setCurrentTabId(tab.id)}
                aria-current={tab.id === currentTab.id}
              >
                {tab.title}
              </button>
            ))}
          </div>
        )}

        <div className={styles.Blocks}>
          {blocks
            .filter((block) => block.tabId === currentTab.id)
            .map((block) => (
              <div key={block.id} className={styles.Block}>
                {block.blockType === 'Markdown' && (
                  <MarkdownBlock block={block} />
                )}
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
    </Page>
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
