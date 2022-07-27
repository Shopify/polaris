import yaml from "js-yaml";

export const parseMarkdown = (inputMarkdown) => {
  const readmeSections = inputMarkdown.split("---");
  const frontMatterSection = readmeSections[1];
  const readmeSection = readmeSections.slice(2).join("---");

  // Extract front matter
  const frontMatter = yaml.load(frontMatterSection);

  // Extract the content of the first paragraph

  const intro = readmeSection.split("\n\n").find((paragraph) => {
    const content = paragraph.trim().split("\n").join(" ");
    if (paragraph.startsWith("<!--")) {
      return false;
    }
    if (content.length > 0 && content[0] !== "#") {
      return content;
    }
    return false;
  });

  let markdown = readmeSection;

  // Add some custom HTML to <!-- dodont --> tags
  const dodontRegex = /<!-- (dodont) -->(.*?)<!-- end -->/gis;
  if (markdown.match(dodontRegex)) {
    markdown = markdown.replace(dodontRegex, (match) => {
      const matchWithoutComments = match
        .replace(/^<!-- dodont -->/, "")
        .replace(/<!-- end -->$/, "");

      let i = 0;

      const matchWithColumns = matchWithoutComments.replace(
        /#### ([^\n]+)/g,
        (match, captured) => {
          if (i === 1) {
            const type = match.trim().startsWith("#### Don") ? "dont" : "do";

            return `</div><div class="dodont-part" data-type="${type}">\n\n#### ${captured}`;
          }
          i++;
          return match;
        }
      );

      const type = matchWithoutComments.trim().startsWith("#### Don")
        ? "dont"
        : "do";

      return `<div class="dodont"><div class="dodont-part" data-type="${type}">${matchWithColumns}</div></div>`;
    });
  }

  const out = {
    frontMatter,
    intro,
    readme: markdown,
  };

  return out;
};
