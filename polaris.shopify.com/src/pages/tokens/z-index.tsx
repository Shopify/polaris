import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Page from "../../components/Page";
import zIndex from "../../../../polaris-react/src/tokens/token-groups/z-index.json";
import Longform from "../../components/Longform";
import Token from "../../components/Token";
import { navItems } from "../../data/tokensNav";
import Nav from "../../components/Nav";
import { getTitleForTitleTag } from "../../utils/various";

const Components: NextPage = () => {
  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>{getTitleForTitleTag("Z-index tokens")}</title>
      </Head>

      <Longform>
        <h1>Z-index tokens</h1>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        {Object.entries(zIndex).map(([name]) => {
          const typedName = name as keyof typeof zIndex;
          return <ZIndexPreview key={name} name={typedName} />;
        })}
      </Longform>
    </Page>
  );
};

function ZIndexPreview({ name }: { name: keyof typeof zIndex }) {
  const value = zIndex[name];
  const size = 50;

  return (
    <Token
      name={name}
      description=""
      value={value}
      bigGap
      renderPreview={() => (
        <div
          style={{
            transform: "scale(0.75) scaleY(0.5)",
          }}
        >
          <div
            style={{
              width: size,
              height: size,
              transform: "rotate(45deg)",
              background: "currentColor",
            }}
          ></div>
        </div>
      )}
    ></Token>
  );
}

export default Components;
