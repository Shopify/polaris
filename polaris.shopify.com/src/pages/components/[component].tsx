import fs from "fs";
import glob from "glob";
import path from "path";
import type { GetStaticPaths, GetStaticProps } from "next";
import ComponentExamples from "../../components/ComponentExamples";
import type { ComponentExample } from "../../components/ComponentExamples";
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
  examples: ComponentExample[];
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
    <Layout width="narrow" navItems={navItems} title={name}>
      <PageMeta title={name} description={intro} />

      <Longform>
        <Markdown text={intro} skipH1 />
        {typedStatus && <StatusBanner status={typedStatus} />}
        <ComponentExamples examples={examples} />
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
    const readmeText = data.readme;
    const readmeTextParts = readmeText.split(/\n\n/);
    const intro = readmeTextParts.length > 2 ? readmeTextParts[2].trim() : "";
    const body =
      readmeTextParts.length > 3 ? readmeTextParts.slice(3).join("\n\n") : "";

    const readme = {
      intro,
      body,
    };

    const examples = (data?.frontMatter?.examples || []).map(
      (example: ComponentExample) => {
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
      intro,
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
