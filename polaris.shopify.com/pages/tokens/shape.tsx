import type {NextPage} from 'next';
import TokensPage from '../../src/components/TokensPage';
import PageMeta from '../../src/components/PageMeta';

const Components: NextPage = () => {
  return (
    <>
      <PageMeta title="Shape tokens" />

      <TokensPage tokenGroup={'shape'} />
    </>
  );
};

export default Components;
