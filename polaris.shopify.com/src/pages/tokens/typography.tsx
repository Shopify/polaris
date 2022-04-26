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

const { typography } = tokens;

const Components: NextPage = () => {
  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>{getTitleForTitleTag("Typography tokens")}</title>
      </Head>

      <Longform>
        <h1>Typography tokens</h1>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        <h2>Font families</h2>
        {Object.entries(typography)
          .filter(([name]) => name.includes("family"))
          .map(([name]) => {
            return <TypePreview key={name} type="family" name={name} />;
          })}

        <h2>Font sizes</h2>
        {Object.entries(typography)
          .filter(([name]) => name.includes("size"))
          .map(([name]) => {
            return <TypePreview key={name} type="size" name={name} />;
          })}

        <h2>Line heights</h2>
        {Object.entries(typography)
          .filter(([name]) => name.includes("line"))
          .map(([name]) => {
            return <TypePreview key={name} type="line" name={name} />;
          })}

        <h2>Font weights</h2>
        {Object.entries(typography)
          .filter(([name]) => name.includes("weight"))
          .map(([name]) => {
            return <TypePreview key={name} type="weight" name={name} />;
          })}
      </Longform>
    </Page>
  );
};

function TypePreview({
  name,
  type,
}: {
  name: string;
  type: "family" | "size" | "line" | "weight";
}) {
  const { value } = typography[name];

  switch (type) {
    case "family":
      return (
        <Token
          name={name}
          description=""
          value={value}
          renderPreview={() => (
            <div
              style={{
                width: 180,
                padding: `10px 10px 10px 0`,
                overflow: "hidden",
                fontFamily: value,
                fontSize: "1.25em",
                display: "flex",
                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <p style={{ margin: 0 }}>Your order has been shipped</p>
            </div>
          )}
        ></Token>
      );

    case "size":
      return (
        <Token
          name={name}
          description=""
          value={value}
          renderPreview={() => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: value,
                minWidth: "5rem",
                minHeight: 40,
              }}
            >
              <p style={{ margin: 0 }}>Aa</p>
            </div>
          )}
        ></Token>
      );

    case "line":
      return (
        <Token
          name={name}
          description=""
          value={value}
          renderPreview={() => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: value,
                minWidth: "5rem",
                minHeight: 48,
              }}
            >
              <div
                style={{
                  height: value,
                  flex: 1,
                  borderTop: "1px solid #ddd",
                  borderBottom: "1px solid #ddd",
                  background: "#fafafa",
                }}
              ></div>
            </div>
          )}
        ></Token>
      );

    case "weight":
      return (
        <Token
          name={name}
          description=""
          value={value}
          renderPreview={() => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: parseInt(value),
                fontSize: "2rem",
                minWidth: "5rem",
                minHeight: 40,
              }}
            >
              <p style={{ margin: 0 }}>Bb</p>
            </div>
          )}
        ></Token>
      );
  }

  return null;
}

export default Components;
