import Page from '../Page';
import PageMeta from '../PageMeta';

const description = '';

export const PatternIndexLayoutPage = () => (
  <>
    <PageMeta title="Patterns" description={description} />

    <Page showTOC={false}>
      <div>Hello from the index layout patterns page</div>
    </Page>
  </>
);
