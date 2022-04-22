import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Page from "../../components/Page";
import ComponentsNav from "../../components/ComponentsNav";
import { getTitleForTitleTag } from "../../utils/various";

interface Props {}

const Components: NextPage<Props> = () => {
  return (
    <Page noLayout>
      <Head>
        <title>{getTitleForTitleTag("Components")}</title>
      </Head>

      <ComponentsNav category="all" />
    </Page>
  );
};

export default Components;
