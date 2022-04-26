import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { tokens } from "@shopify/polaris-tokens";
import Page from "../../components/Page";
import Longform from "../../components/Longform";
import Token from "../../components/Token";
import { navItems } from "../../data/tokensNav";
import { CSSProperties } from "react";
import Nav from "../../components/Nav";
import { getTitleForTitleTag } from "../../utils/various";

const { shape } = tokens;

const Components: NextPage = () => {
  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>{getTitleForTitleTag("Shape tokens")}</title>
      </Head>

      <Longform>
        <h1>Shape tokens</h1>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        <h2>Border radius</h2>
        {Object.entries(shape)
          .filter(([name]) => name.includes("radius"))
          .map(([name, { value }]) => {
            return (
              <Token
                key={name}
                name={name}
                description=""
                value={value}
                bigGap
                renderPreview={() => (
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: value,
                      background: "currentColor",
                    }}
                  ></div>
                )}
              ></Token>
            );
          })}

        <h2>Border types</h2>
        {Object.entries(shape)
          .filter(([name]) => !name.includes("radius"))
          .map(([name, { value }]) => {
            let styles: CSSProperties = {};

            if (name.includes("width")) {
              styles = {
                width: 100,
                height: value,
                background: "#333",
              };
            } else {
              styles = {
                width: 100,
                borderBottom: value,
              };
            }

            return (
              <Token
                key={name}
                name={name}
                description=""
                value={value}
                bigGap
                renderPreview={() => <div style={styles}></div>}
              />
            );
          })}
      </Longform>
    </Page>
  );
};

export default Components;
