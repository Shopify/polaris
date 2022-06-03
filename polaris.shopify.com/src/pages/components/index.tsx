import type { ReactElement, ReactNode } from 'react'

import type { NextPage } from "next";
import ComponentsPage from "../../components/ComponentsPage";
import LeftNavLayout from '../../components/LeftNavLayout'
import {
  getComponentNav,
} from "../../utils/various";
import { NavItem } from "../../components/Nav/Nav";

interface Props {}

const navItems: NavItem[] = getComponentNav();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Components: NextPageWithLayout = () => <ComponentsPage />;


Components.getLayout = function getLayout(page: ReactElement) {
  return (
    <LeftNavLayout navItems={navItems}>
      {page}
    </LeftNavLayout>
  )
}

export default Components;
