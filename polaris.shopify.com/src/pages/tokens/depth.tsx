import type {NextPage} from 'next';
import React from 'react';
import TokensPage from '../../components/TokensPage';
import PageMeta from '../../components/PageMeta';

const Components: NextPage = () => {
  return (
    <>
      <PageMeta title="Depth tokens" />

      <TokensPage tokenGroup={'depth'} />
    </>
  );
};

export default Components;
