import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Page from "../../components/Page";
import spacing from "../../../../polaris-react/src/tokens/token-groups/spacing.json";
import Longform from "../../components/Longform";
import Token from "../../components/Token";
import { navItems } from "./nav";

const Components: NextPage = () => {
  return (
    <Page navItems={navItems}>
      <Head>
        <title>Tokens</title>
      </Head>

      <Longform>
        <h1>Spacing tokens</h1>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        {Object.entries(spacing).map(([name]) => {
          const typedName = name as keyof typeof spacing;
          return <SpacingPreview name={typedName} />;
        })}
      </Longform>
    </Page>
  );
};

function SpacingPreview({ name }: { name: keyof typeof spacing }) {
  const value = spacing[name];

  return (
    <Token
      name={name}
      description=""
      value={value}
      bigGap
      renderPreview={() => (
        <div
          style={{
            height: value,
            width: 50,
            background: "#bfd3ed",
          }}
        ></div>
      )}
    ></Token>
  );
}

export default Components;
