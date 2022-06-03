import type { ReactElement } from "react";
import Layout from "../../components/Layout";

const navItems = [
  {
    title: "Development",
    url: "/contributing/development",
    children: [
      {
        title: "Code of Conduct",
        url: "/contributing/code-of-conduct",
      },
      {
        title: "Pull Requests",
        url: "/contributing/prs",
      },
    ],
  },
  {
    title: "Design",
    url: "/contributing/design",
    children: [
      {
        title: "Creating a new Pattern",
        url: "/contributing/new-patterns",
      },
      {
        title: "Updating UIKit",
        url: "/contributing/uikit",
      },
    ],
  },
];

const ContributingPage = () => {
  return (
    <Layout title="Contributing" navItems={navItems} showTOC={false}>
      {/* PAGE CONTENT HERE */}
    </Layout>
  );
};

export default ContributingPage;
