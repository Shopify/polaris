import ReactDom from "react-dom";
import ReactMarkdown from "react-markdown";

const doDontFormat = (content) => {
  let newContent = content;
  // Add some custom HTML to <!-- dodont --> tags
  const dodontRegex = /<!-- dodont -->(.*?)<!-- end -->/gis;
  if (newContent.match(dodontRegex)) {
    newContent = newContent.replaceAll(dodontRegex, (match) => {
      const matchWithoutComments = match
        .replace(/^<!-- dodont -->/, "")
        .replace(/<!-- end -->$/, "");

      let i = 0;

      const matchWithColumns = matchWithoutComments.replaceAll(
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

  return newContent;
};

export const parseMarkdown = async (content) => {
  const transformedContent = doDontFormat(content);

  return ReactDom.render(
    <ReactMarkdown>{transformedContent}</ReactMarkdown>,
    document.body
  );
};
