import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Page from "../../components/Page";
import Longform from "../../components/Longform";
import { navItems } from "../../data/tokensNav";
import Nav from "../../components/Nav";

const Components: NextPage = () => {
  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>Tokens in code</title>
      </Head>

      <Longform>
        <h1>Tokens in code</h1>
        <p>
          When developing with Polaris, tokens are automatically injected into
          your web app so you can reference them in your CSS.
        </p>
      </Longform>
    </Page>
  );
};

export default Components;
