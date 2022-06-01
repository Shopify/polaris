import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/HomePage";
import { getTitleTagValue } from "../utils/various";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{getTitleTagValue()}</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
