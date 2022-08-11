import type {NextPage} from 'next';
import React from 'react';
import TokensPage from '../../src/components/TokensPage';
import PageMeta from '../../src/components/PageMeta';

const Components: NextPage = () => {
  return (
    <>
      <PageMeta title="Z index tokens" />

      <TokensPage tokenGroup={'zIndex'} />
    </>
  );
};

export default Components;
