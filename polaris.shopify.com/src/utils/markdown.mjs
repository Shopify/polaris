import yaml from 'js-yaml';

export const parseMarkdown = (inputMarkdown) => {
  const readmeSections = inputMarkdown.split('---');
  const frontMatterSection = readmeSections[1];
  const readmeSection = readmeSections.slice(2).join('---');

  // Extract front matter
  const frontMatter = yaml.load(frontMatterSection);

  // Extract the content of the first paragraph

  const description = readmeSection.split('\n\n').find((paragraph) => {
    const content = paragraph.trim().split('\n').join(' ');
    if (paragraph.startsWith('<!--')) {
      return false;
    }
    if (content.length > 0 && content[0] !== '#') {
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
        .replace(/^<!-- dodont -->/, '')
        .replace(/<!-- end -->$/, '');

      let i = 0;

      const matchWithColumns = matchWithoutComments.replace(
        /#### ([^\n]+)/g,
        (match, captured) => {
          if (i === 1) {
            const type = match.trim().startsWith('#### Don') ? 'dont' : 'do';

            return `</div><div class="dodont-part" data-type="${type}">\n\n#### ${captured}`;
          }
          i++;
          return match;
        },
      );

      const type = matchWithoutComments.trim().startsWith('#### Don')
        ? 'dont'
        : 'do';

      return `<div class="dodont"><div class="dodont-part" data-type="${type}">${matchWithColumns}</div></div>`;
    });
  }

  // Add some custom HTML to <!-- tip --> tags
  const tipRegex = /<!-- (tip) -->(.*?)<!-- end -->/gis;
  if (markdown.match(tipRegex)) {
    markdown = markdown.replace(tipRegex, (match) => {
      const matchWithoutComments = match
        .replace(/^<!-- tip -->/, '')
        .replace(/<!-- end -->$/, '');

      return `<div class="tip-banner"><div class="tip-banner__header"><div><span class="Polaris-Icon Polaris-Icon--colorHighlight Polaris-Icon--applyColor"><span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden"></span><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-9 3a1 1 0 1 0 2 0v-2a1 1 0 1 0-2 0v2zm0-6a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"></path></svg></span></div> <h4>Tip</h4></div>${matchWithoutComments}</div>`;
    });
  }

  const out = {
    frontMatter,
    description,
    readme: markdown,
  };

  return out;
};
