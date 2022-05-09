import type { NextPage } from "next";
import Head from "next/head";
import Page from "../components/Page";
import { getTitleForTitleTag } from "../utils/various";

import {MotionExplorer} from '../components/MotionExplorer'

const MotionExplorerPage: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>{getTitleForTitleTag('Motion Explorer')}</title>
      </Head>
			<MotionExplorer />
    </Page>
  );
};

export default MotionExplorerPage;
