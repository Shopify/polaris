import fs from "fs";
import glob from "glob";
import path from "path";
import { marked } from "marked";
import type { GetStaticPaths, GetStaticProps } from "next";
import Examples from "../../components/Examples";
import type { Example } from "../../components/Examples";
import Longform from "../../components/Longform";
import Markdown from "../../components/Markdown";
import type { NavItem } from "../../components/Nav";
import Layout from "../../components/Layout";
import { parseMarkdown } from "../../utils/markdown.mjs";
import { getComponentNav } from "../../utils/various";
import PageMeta from "../../components/PageMeta";
import { PropsForComponent, Status } from "../../types";
import StatusBanner from "../../components/StatusBanner";
import PropsTable from "../../components/PropsTable";

interface MarkdownData {
  frontMatter: any;
  intro: string;
  readme: string;
}

interface Props {
  examples: [Example];
  status?: Status;
  name: string;
  intro: string;
  readme: {
    body: string;
    header: string;
  };
  propsForComponent: PropsForComponent | null;
}

const Components = ({
  examples,
  intro,
  name,
  readme,
  status,
  propsForComponent,
}: Props) => {
  const navItems: NavItem[] = getComponentNav();
  const typedStatus: Status | undefined = status
    ? {
        value: status.value.toLowerCase() as Status["value"],
        message: status.message,
      }
    : undefined;

  return (
    <Layout width="narrow" navItems={navItems}>
      <PageMeta title={name} description={intro} />

      <Longform>
        <h1>{name}</h1>
        <Markdown text={readme.header} skipH1 />
        {typedStatus && <StatusBanner status={typedStatus} />}
        <Examples examples={examples} />
        {propsForComponent && <PropsTable props={propsForComponent} />}
        <Markdown text={readme.body} skipH1 />
      </Longform>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  { component: string }
> = async (context) => {
  const propsFilePath = path.resolve(process.cwd(), `src/data/props.json`);
  const fileContent = fs.readFileSync(propsFilePath, "utf8");
  let propsData: PropsForComponent[] = JSON.parse(fileContent);

  const componentSlug = context.params?.component;
  const mdFilePath = path.resolve(
    process.cwd(),
    `content/components/${componentSlug}.md`
  );

  if (fs.existsSync(mdFilePath)) {
    const componentMarkdown = fs.readFileSync(mdFilePath, "utf-8");
    const data: MarkdownData = parseMarkdown(componentMarkdown);
    const readmeText = marked(data.readme).split("\n");
    // Note: Assumes that the first two lines are the title and description
    const readmeHeader = readmeText.splice(0, 2).join("\n");
    const readmeBody = readmeText.join("\n");
    const readme = {
      header: readmeHeader,
      body: readmeBody,
    };

    const examples = (data?.frontMatter?.examples || []).map(
      (example: Example) => {
        const examplePath = path.resolve(
          process.cwd(),
          `src/pages/examples/${example.fileName}`
        );
        let code = "";

        if (fs.existsSync(examplePath)) {
          code = fs.readFileSync(examplePath, "utf-8");
          code = code
            .split("\n")
            .filter((line) => !line.includes("withPolarisExample"))
            .join("\n");
        }

        return { ...example, code };
      }
    );

    const propsForComponent =
      propsData.find(
        (PropsTable) =>
          PropsTable.interfaceName.toLowerCase() ===
          `${data.frontMatter.name.replace(/\s/g, "").toLowerCase()}props`
      ) || null;

    const props: Props = {
      ...data.frontMatter,
      examples,
      intro: data.intro,
      readme,
      propsForComponent,
    };

    return { props };
  } else {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const componentBasePath = path.resolve(process.cwd(), "content/components");
  const paths = glob
    .sync(path.join(componentBasePath, "*.md"))
    .map((fileName: string) => {
      return fileName
        .replace(`${process.cwd()}/content`, "")
        .replace(".md", "");
    });

  return {
    paths,
    fallback: false,
  };
};

export default Components;
