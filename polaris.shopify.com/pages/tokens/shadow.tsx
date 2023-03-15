import type {NextPage} from 'next';
import React from 'react';
import TokensPage from '../../src/components/TokensPage';
import PageMeta from '../../src/components/PageMeta';

const Components: NextPage = () => {
  return (
    <>
      <PageMeta title="Shadow tokens" />

      <TokensPage tokenGroup={'shadow'} />
    </>
  );
};

export default Components;
