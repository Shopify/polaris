import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Longform from "../../components/Longform";
import YoutubeVideo from "../../components/YoutubeVideo";
import Image from "../../components/Image";
import { getTitleTagValue } from "../../utils/various";
import MaxPageWidthDiv from "../../components/MaxPageWidthDiv";
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
