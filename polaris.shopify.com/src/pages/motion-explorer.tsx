import type { NextPage } from "next";
import Head from "next/head";
import Page from "../components/Page";
import { getTitleForTitleTag } from "../utils/various";
import Nav from "../components/Nav";
import { NavItem } from "../components/Nav/Nav";
import Longform from "../components/Longform";

import {MotionExplorer} from '../components/MotionExplorer'

export const navItems: NavItem[] = [
  {
    title: "Design guidelines",
    children: [
      {
        title: "...",
        url: "/a",
      },
      {
        title: "Typography",
        url: "/b",
      },
      {
        title: "Motion",
        url: "/c",
      },
      {
        title: "Illustration",
        url: "/d",
      },
      {
        title: "....",
        url: "/e",
      },
    ],
  }];

const MotionExplorerPage: NextPage = () => {
  return (
    <Page renderNav={() => <Nav navItems={navItems} />}>
      <Head>
        <title>{getTitleForTitleTag('Motion Explorer')}</title>
      </Head>
      <Longform>
        <h1>Some motion section</h1>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
			  <MotionExplorer />
      </Longform>
    </Page>
  );
};

export default MotionExplorerPage;
