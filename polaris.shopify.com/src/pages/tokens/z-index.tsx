import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { tokens } from "@shopify/polaris-tokens";
import Longform from "../../components/Longform";
import Token from "../../components/Token";
import { getTitleTagValue } from "../../utils/various";

const { zIndex } = tokens;

const Components: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitleTagValue("Z-index tokens")}</title>
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
          return <ZIndexPreview key={name} name={name} />;
        })}
      </Longform>
    </>
  );
};

function ZIndexPreview({ name }: { name: string }) {
  const { value } = zIndex[name];
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
