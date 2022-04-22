import type { NextPage } from "next";
import Head from "next/head";

import Page from "../components/Page";
import IconGallery from "../components/IconGallery";
import { getTitleForTitleTag } from "../utils/various";

const Components: NextPage = () => {
  return (
    <Page noLayout>
      <Head>
        <title>{getTitleForTitleTag("Icons")}</title>
      </Head>

      <IconGallery />
    </Page>
  );
};

export default Components;
