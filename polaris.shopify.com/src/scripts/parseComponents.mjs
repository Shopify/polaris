import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { marked } from "marked";
import { fileURLToPath } from "url";
import hljs from "highlight.js/lib/common";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(
  __dirname,
  "../../../polaris-react/src/components"
);

const README_SECTION_DIVIDER = "---";

let components = {};

const files = fs.readdirSync(componentsDir, "utf-8");

export function parseMarkdown(inputMarkdown) {
  const readmeSections = inputMarkdown.split(README_SECTION_DIVIDER);
  const frontMatter = readmeSections[1];
  let readmeText = readmeSections.slice(2).join(README_SECTION_DIVIDER);

  const meta = yaml.load(frontMatter);

  // Add highlighting to code blocks
  let markdown = readmeText.replaceAll(/```([^`]+)```/g, (s) => {
    const code = hljs.highlight(s.replace(/```/g, "").replace("jsx", ""), {
      language: "javascript",
    }).value;
    return `<code><pre>${code}</pre></code>`;
  });

  // Replace image paths
  markdown = markdown.replace(
    /\/public_images/g,
    "/images-from-old-styleguide"
  );

  // Covert to HTML
  let html = marked(markdown);

  // Add some custom HTML to <!-- usagelist --> tags
  if (html.match("<!-- usagelist -->")) {
    html = html
      .split("<!-- usagelist -->")
      .map((usagePart) => {
        if (usagePart.match("<!-- end -->")) {
          const subParts = usagePart.split("<!-- end -->");
          let listContent = subParts[0];
          listContent =
            '<div class="usage-list-part">' +
            listContent.replace(
              '<h4 id="dont',
              '</div><div class="usage-list-part"><h4 id="dont'
            ) +
            "</div>";
          const otherContent = subParts.slice(1);
          const newHTML = `<div class="usage-list">${listContent}</div>${otherContent}`;
          return newHTML;
        } else {
          return usagePart;
        }
      })
      .join("");
  }

  const out = {
    ...meta,
    readme: html,
  };

  return out;
}

for (let i = 0; i < files.length; i++) {
  const fileName = files[i];
  const filePath = path.join(componentsDir, fileName);
  const isDir = fs.lstatSync(filePath).isDirectory();

  if (isDir) {
    const readmePath = path.join(filePath, "README.md");
    if (fs.existsSync(readmePath)) {
      const readmeFileContent = fs.readFileSync(readmePath, "utf-8");
      const parsed = parseMarkdown(readmeFileContent);

      components[fileName] = parsed;
    }
  }
}

const outFilePath = path.join(__dirname, "../data/components.json");
fs.writeFileSync(outFilePath, JSON.stringify(components, null, 2));

console.log("Done!");
