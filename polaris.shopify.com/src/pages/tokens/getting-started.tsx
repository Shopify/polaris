import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Page from "../../components/Page";
import Longform from "../../components/Longform";
import { navItems } from "../../data/tokensNav";
import Nav from "../../components/Nav";
import YoutubeVideo from "../../components/YoutubeVideo";
import Image from "../../components/Image";
import { getTitleForTitleTag } from "../../utils/various";

const Components: NextPage = () => {
  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>{getTitleForTitleTag("Getting started with tokens")}</title>
      </Head>

      <Longform>
        <h1>Getting started</h1>
        <p>
          Design tokens allow us to ship design decisions with consistency and
          scale.
        </p>

        <YoutubeVideo id="NvDY37tOn_o" />

        <h2>What are tokens</h2>
        <p>
          Design tokens represent design decisions such as color, spacing, and
          typography. Each token has a unique name that references a specific
          value.
        </p>

        <p>The benefits of using tokens over hard-coded values include:</p>

        <ul>
          <li>
            Shopify standardizes common design decisions, allowing you to focus
            on unique design challenges
          </li>
          <li>
            Consistent naming between design and development improves
            collaboration
          </li>
          <li>
            Shopify can make big design changes across the admin simply by
            adjusting the tokens
          </li>
        </ul>

        <p>
          {`For example, imagine there are several elements in a design that
            need a primary action color. Instead of trying to find a hard-coded
            value, designers can use the Figma style "Action Primary/Hovered".
            That token matches a specific value for the primary action color.
            Developers can reference the same color in code by using the CSS
            custom property with the same name.`}
        </p>

        <Image
          src="/images/tokens/token-source-of-truth.png"
          alt="Illustration showing Figma and CSS referencing same token value"
          layout="responsive"
          width={1080}
          height={527}
        />

        <p>
          If primary action color changes, or improvements need to be shipped,
          we can make those updates to the token itself. Those changes then get
          pushed to every element that references that token, instead of you
          having to manually update several individual hard-coded values.
        </p>
      </Longform>
    </Page>
  );
};

export default Components;
