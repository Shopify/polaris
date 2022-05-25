import type { NextPage } from "next";
import Head from "next/head";
import { getTitleTagValue } from "../utils/various";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitleTagValue()}</title>
      </Head>
    </>
  );
};

export default Home;
