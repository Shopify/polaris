import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "prismjs/themes/prism-tomorrow.css";
import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import fs from "fs";
import Longform from "../../components/Longform";
import Page from "../../components/Page";

interface MarkdownBlock {
  type: "markdown";
  content: string;
}

interface TSXBlock {
  type: "tsx";
  import: string;
}

type Block = MarkdownBlock | TSXBlock;

interface Props {
  blocks: Block[];
}

function loadDynamically(path: string) {
  return dynamic(() => import(`../../posts/${path}.tsx`));
}

export default function Example({ blocks }: Props) {
  return (
    <Page>
      <Longform>
        {blocks.map((block) => {
          if (block.type === "tsx") {
            const Component = loadDynamically(block.import);
            return <Component />;
          } else if (block.type === "markdown") {
            return <ReactMarkdown>{block.content}</ReactMarkdown>;
          }
        })}
      </Longform>
    </Page>
  );
}

const postsDir = path.join(process.cwd(), "src", "posts");

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  let blocks: Block[] = [];

  const files = fs.readdirSync(path.join(postsDir, slug), "utf-8");
  files.forEach((fileName) => {
    if (fileName !== "index.tsx" && !fileName.startsWith(".")) {
      const fileContent = fs.readFileSync(
        path.join(postsDir, slug, fileName),
        "utf8"
      );
      if (fileName.endsWith(".md")) {
        blocks.push({
          type: "markdown",
          content: fileContent,
        });
      } else if (fileName.endsWith(".tsx") && fileName !== "index.tsx") {
        blocks.push({
          type: "tsx",
          import: `${slug}/${fileName.replace(/\.tsx$/, "")}`,
        });
      }
    }
  });

  const props: Props = { blocks };

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = fs.readdirSync(postsDir, "utf-8");

  let paths: { params: { slug: string } }[] = [];

  posts
    .filter((file) => !file.startsWith("."))
    .forEach((post) => {
      paths.push({
        params: {
          slug: post,
        },
      });
    });

  return { paths, fallback: false };
};
