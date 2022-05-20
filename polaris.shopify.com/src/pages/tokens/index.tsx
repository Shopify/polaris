import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { getTitleTagValue } from "../../utils/various";
import TokensPage from "../../components/TokensPage";

const Components: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitleTagValue("Getting started with tokens")}</title>
      </Head>

      <TokensPage />
    </>
  );
};

export default Components;
