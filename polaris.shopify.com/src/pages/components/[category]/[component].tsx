import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Longform from "../../../components/Longform";
import Markdown from "../../../components/Markdown";
import components from "../../../data/components.json";
import { getTitleTagValue, slugify } from "../../../utils/various";
import fs from "fs";
import path from "path";
import MaxPageWidthDiv from "../../../components/MaxPageWidthDiv";

interface Props {
  name: string;
  readme: string;
}

const Components: NextPage<Props> = ({ name, readme }) => {
  return (
    <>
      <Head>
        <title>{getTitleTagValue(name)}</title>
      </Head>

      <MaxPageWidthDiv style={{ maxWidth: "40rem", marginTop: "4rem" }}>
        <Longform>
          <Markdown text={readme} />
        </Longform>
      </MaxPageWidthDiv>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  { component: string }
> = async (context) => {
  const componentParam = context.params?.component;

  let readmes = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src/data/components.readme.json"),
      "utf-8"
    )
  );

  if (componentParam) {
    const slug = slugify(componentParam);
    const componentMeta = components.find(
      ({ frontMatter }) => slugify(frontMatter.name) === slug
    );

    if (componentMeta) {
      const {
        frontMatter: { name },
      } = componentMeta;
      const componentReadme = readmes[name];
      if (componentReadme) {
        const props: Props = {
          name,
          readme: componentReadme,
        };

        return { props };
      }
    }
  }
  return { notFound: true };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = components.map(({ frontMatter: { name, category } }) => {
    return {
      params: { category: slugify(category), component: slugify(name) },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export default Components;
