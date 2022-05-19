import type { NextPage } from "next";
import Head from "next/head";
import Page from "../components/Page";
import { getTitleForTitleTag } from "../utils/various";

const Home: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>{getTitleForTitleTag()}</title>
      </Head>
    </Page>
  );
};

export default Home;
