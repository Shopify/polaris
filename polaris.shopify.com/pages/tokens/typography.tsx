import type {NextPage} from 'next';
import React from 'react';
import TokensPage from '../../src/components/TokensPage';
import PageMeta from '../../src/components/PageMeta';

const Components: NextPage = () => {
  return (
    <>
      <PageMeta title="Typography tokens" />

      <TokensPage tokenGroup={'typography'} />
    </>
  );
};

export default Components;
