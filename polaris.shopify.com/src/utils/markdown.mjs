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
    if (content.length > 0 && content[0] !== "#") {
      return content;
    }
    return false;
  });

  // Replace image paths
  let markdown = readmeSection.replace(
    /\/public_images/g,
    "/images-from-old-styleguide"
  );

  // Add some custom HTML to <!-- usagelist --> and <!-- usageblock --> tags
  const usageListRegex = /<!-- (usagelist|usageblock) -->(.*?)<!-- end -->/gis;
  if (markdown.match(usageListRegex)) {
    markdown = markdown.replaceAll(usageListRegex, (match) => {
      const matchWithoutComments = match
        .replace(/^<!-- usagelist -->/, "")
        .replace(/^<!-- usageblock -->/, "")
        .replace(/<!-- end -->$/, "");

      let i = 0;
      const matchWithColumns = matchWithoutComments.replaceAll(
        /#### ([^\n]+)/g,
        (match, captured) => {
          if (i === 1) {
            const type = match.startsWith("#### Don") ? "dont" : "do";

            return `</div><div class="usage-list-part" data-type="${type}">\n\n#### ${captured}`;
          }
          i++;
          return match;
        }
      );

      const type = match.trim().startsWith("#### Don") ? "dont" : "do";

      return `<div class="usage-list"><div class="usage-list-part" data-type="${type}">${matchWithColumns}</div></div>`;
    });
  }

  const out = {
    frontMatter,
    intro,
    readme: markdown,
  };

  return out;
};
