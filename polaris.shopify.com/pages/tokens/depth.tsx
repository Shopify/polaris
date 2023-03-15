import type {NextPage} from 'next';
import TokensPage from '../../src/components/TokensPage';
import PageMeta from '../../src/components/PageMeta';

const Components: NextPage = () => {
  return (
    <>
      <PageMeta title="Depth tokens" />

      <TokensPage tokenGroup={'depth'} />
    </>
  );
};

export default Components;
