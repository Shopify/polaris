import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Longform from "../../components/Longform";
import { getTitleTagValue } from "../../utils/various";

const Components: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitleTagValue("Tokens in Figma")}</title>
      </Head>

      <Longform>
        <h1>Tokens in Figma</h1>
        <p>
          We store design tokens as Figma styles, which are available to all
          Shopify designers.
        </p>
        <p>
          If you {`don't`} work at Shopify but still want to build with Polaris,
          you can access our styles by duplicating any of the Polaris for Admin
          files on{" "}
          <a href="https://www.figma.com/@shopify">
            {`Shopify's`} Figma community page
          </a>
          . Note that with this method, Shopify won’t be able to automatically
          push style updates to your local copy of the design file. Learn more
          about styles by{" "}
          <a href="https://help.figma.com/hc/en-us/articles/360039820134-Manage-and-share-styles">
            visiting the Figma help center
          </a>
          .
        </p>
      </Longform>
    </>
  );
};

export default Components;
