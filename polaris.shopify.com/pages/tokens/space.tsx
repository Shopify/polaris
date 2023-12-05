import type {NextPage} from 'next';
import React from 'react';
import TokensPage from '../../src/components/TokensPage';
import PageMeta from '../../src/components/PageMeta';

const Components: NextPage = () => {
  return (
    <>
      <PageMeta title="Space tokens" />
      <TokensPage tokenGroup={'space'} />
    </>
  );
};

export default Components;
