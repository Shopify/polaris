import type { GetStaticProps } from "next";

import ComponentsPage from "../../components/ComponentsPage";

// const Components = () => <ComponentsPage components={} />;
const Components = ({ components }) => <p>{JSON.stringify(components)}</p>;

export const getStaticProps: GetStaticProps = async () => {
  return {
    components,
  };
};

export default Components;
