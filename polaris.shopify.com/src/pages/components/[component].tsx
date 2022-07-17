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
import { Node } from "../../scripts/get-props";

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
  propsData: { [pos: string]: Node };
}

const Components = ({
  examples,
  intro,
  name,
  readme,
  status,
  propsData,
}: Props) => {
  return (
    <Layout width="narrow">
      <ul>
        {Object.values(propsData).map((node) => {
          if (!node.name?.endsWith("Props")) return null;
          return (
            <NodeComponent key={node.id} node={node} propsData={propsData} />
          );
        })}
      </ul>
    </Layout>
  );
};

const NodeComponent = ({
  node,
  propsData,
  level = 0,
}: {
  node: Node;
  propsData: { [pos: string]: Node };
  level?: number;
}) => {
  if (level > 10) {
    return null;
  }

  return (
    <li
      style={{ paddingLeft: 20, borderLeft: "1px solid #ccc" }}
      onClick={(evt) => {
        console.log(node);
        evt.stopPropagation();
      }}
    >
      <h1>
        {node.name || node.id}: {node.resolvedValue} — {node.syntaxKind}
      </h1>
      <ul>
        {node.children.map((child) => {
          const matchingNode = propsData[child];
          if (!matchingNode) {
            console.log("child not found", child);
            return null;
          }
          return (
            <NodeComponent
              key={child}
              node={matchingNode}
              propsData={propsData}
              level={level + 1}
            />
          );
        })}
      </ul>
    </li>
  );
};

export const getStaticProps: GetStaticProps<
  Props,
  { component: string }
> = async (context) => {
  const propsFilePath = path.resolve(process.cwd(), `src/data/props.json`);
  const fileContent = fs.readFileSync(propsFilePath, "utf8");
  let propsData: { [pos: string]: Node } = JSON.parse(fileContent);

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

    const props: Props = {
      ...data.frontMatter,
      examples,
      intro: data.intro,
      readme,
      propsData,
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
