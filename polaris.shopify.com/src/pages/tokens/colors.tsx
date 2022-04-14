import type { NextPage } from "next";
import Head from "next/head";
import React, { Fragment } from "react";
import Page from "../../components/Page";
import colors from "../../../../polaris-react/src/tokens/token-groups/color.light.json";
import Longform from "../../components/Longform";
import { navItems } from "../../data/tokensNav";
import Token from "../../components/Token";
import Nav from "../../components/Nav";

const Components: NextPage = () => {
  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>Color tokens</title>
      </Head>

      <Longform>
        <h1>Color tokens</h1>

        <h2>Surface colors</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        <h4>Neutral</h4>
        <ColorPreview name="surface-neutral" />
        <ColorPreview name="surface-neutral-subdued" />
        <ColorPreview name="border" />
        <ColorPreview name="border-subdued" />
        <ColorPreview name="icon" />

        <h4>Success</h4>
        <ColorPreview name="surface-highlight" />
        <ColorPreview name="surface-highlight-subdued" />
        <ColorPreview name="border-highlight" />
        <ColorPreview name="border-highlight-subdued" />
        <ColorPreview name="icon-highlight" />

        <h4>Success</h4>
        <ColorPreview name="surface-warning" />
        <ColorPreview name="surface-warning-subdued" />
        <ColorPreview name="border-warning" />
        <ColorPreview name="border-warning-subdued" />
        <ColorPreview name="icon-warning" />

        <h4>Success</h4>
        <ColorPreview name="surface-critical" />
        <ColorPreview name="surface-critical-subdued" />
        <ColorPreview name="border-critical" />
        <ColorPreview name="border-critical-subdued" />
        <ColorPreview name="icon-critical" />
      </Longform>
    </Page>
  );
};

function ColorPreview({ name }: { name: keyof typeof colors }) {
  const isStateful =
    name.includes("hovered") ||
    name.includes("pressed") ||
    name.includes("depressed") ||
    (name.includes("disabled") && !name.startsWith("text"));

  const fullSize = 32;
  const smallSize = 16;
  const size = isStateful ? smallSize : fullSize;

  const value = colors[name];

  return (
    <Token
      name={name}
      description=""
      value={value}
      renderPreview={() => (
        <div
          style={{
            minWidth: fullSize,
            maxWidth: fullSize,
            height: size,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <div
            style={{
              minWidth: size,
              maxWidth: size,
              height: size,
              borderRadius: 100,
              background: value,
            }}
          ></div>
        </div>
      )}
    />
  );
}

export default Components;
