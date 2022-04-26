import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { tokens } from "@shopify/polaris-tokens";
import Page from "../../components/Page";
import Longform from "../../components/Longform";
import Token from "../../components/Token";
import { navItems } from "../../data/tokensNav";
import Nav from "../../components/Nav";
import { getTitleForTitleTag } from "../../utils/various";

const { depth } = tokens;

const Components: NextPage = () => {
  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>{getTitleForTitleTag("Depth tokens")}</title>
      </Head>

      <Longform>
        <h1>Depth tokens</h1>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        {Object.entries(depth).map(([name]) => {
          return <DepthPreview key={name} name={name} />;
        })}
      </Longform>
    </Page>
  );
};

function DepthPreview({ name }: { name: string }) {
  const { value } = depth[name];

  return (
    <Token
      name={name}
      description=""
      value={value}
      bigGap
      renderPreview={() => (
        <div style={{ padding: `10px 0` }}>
          <div style={{ boxShadow: value, width: 50, height: 50 }}></div>
        </div>
      )}
    />
  );
}

export default Components;
