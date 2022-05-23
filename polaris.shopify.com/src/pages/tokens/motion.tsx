import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { getTitleTagValue } from "../../utils/various";
import TokensPage from "../../components/TokensPage";

const Components: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitleTagValue("Motion")}</title>
      </Head>

      <TokensPage tokenGroup={"motion"} />
    </>
  );
};

export default Components;
