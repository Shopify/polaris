import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { tokens } from "@shopify/polaris-tokens";
import Longform from "../../components/Longform";
import Token from "../../components/Token";
import { getTitleTagValue } from "../../utils/various";
import Link from "next/link";

const {
  colorSchemes: { light: colors },
} = tokens;

const Components: NextPage = () => {
  const colorNames = Object.keys(colors);
  return (
    <>
      <Head>
        <title>{getTitleTagValue("Color tokens")}</title>
      </Head>

      <Longform>
        <h1>Color tokens</h1>
        <p></p>
        <p>
          Learn more about{" "}
          <Link href="/guidelines/design/colors">our color system</Link>.
        </p>
        {colorNames.map((colorName) => (
          <ColorPreview key={colorName} name={colorName} />
        ))}
      </Longform>
    </>
  );
};

function ColorPreview({ name }: { name: string }) {
  const isStateful =
    name.includes("hovered") ||
    name.includes("pressed") ||
    name.includes("depressed") ||
    (name.includes("disabled") && !name.startsWith("text"));

  const fullSize = 32;
  const smallSize = 32;
  const size = isStateful ? smallSize : fullSize;

  const { description, value } = colors[name];

  return (
    <Token
      name={name}
      description={description}
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
