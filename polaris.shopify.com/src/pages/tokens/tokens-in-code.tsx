import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Longform from "../../components/Longform";
import { getTitleTagValue } from "../../utils/various";

const Components: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitleTagValue("Tokens in code")}</title>
      </Head>

      <Longform>
        <h1>Tokens in code</h1>
        <p>
          When developing with Polaris, tokens are automatically injected into
          your web app so you can reference them in your CSS.
        </p>
      </Longform>
    </>
  );
};

export default Components;
