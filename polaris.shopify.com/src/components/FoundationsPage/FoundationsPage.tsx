import {MarkdownFile, NavItem} from '../../types';
import Layout from '../Layout';
import Longform from '../Longform';
import Markdown from '../Markdown';
import PageMeta from '../PageMeta';

import navJson from '../../../.cache/nav.json';
const nav: NavItem[] = navJson;
const foundationsNavItems = nav.find(
  (item) => item.slug === '/foundations',
)?.children;

interface Props {
  markdownFile: MarkdownFile;
}

function FoundationsPage({markdownFile: {readme, frontMatter}}: Props) {
  let {title, description} = frontMatter;

  if (title.includes('/')) {
    const parts = title.split('/');
    title = parts[parts.length - 1];
  }

  return (
    <Layout width="narrow" navItems={foundationsNavItems} title={title}>
      <PageMeta title={title} description={description} />

      <Longform>
        <Markdown text={description} />
        <Markdown text={readme} />
      </Longform>
    </Layout>
  );
}

export default FoundationsPage;
