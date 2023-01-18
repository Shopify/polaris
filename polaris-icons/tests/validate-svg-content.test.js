const fs = require('fs');
const path = require('path');

const globby = require('globby');
const unified = require('unified');
const parse = require('rehype-parse');
const {select, selectAll} = require('hast-util-select');

const nameRegex = /(?<=)(Major|Minor)(?=\.svg)/;

const configPerSet = new Map([
  ['Major', {viewbox: '0 0 20 20', colors: ['#5C5F62', '#5c5f62']}],
  ['Minor', {viewbox: '0 0 20 20', colors: ['#5C5F62', '#5c5f62']}],
]);

const allIconFiles = globby
  .sync(path.resolve(__dirname, '../icons/*.svg'))
  .map((absoluteIconPath) => {
    // We don't care about the first item, only the groups matches
    const [, set] = nameRegex.exec(absoluteIconPath) || [];

    const iconSource = fs.readFileSync(absoluteIconPath, 'utf-8');

    const svg = configPerSet.get([set].filter(Boolean).join('_'));
    if (svg == null) {
      throw new Error(
        `SVG config not found for ${absoluteIconPath}. Make sure your icon contains "Major" or "Minor" in its name.`,
      );
    }
    return {
      iconPath: path.relative(path.join(__dirname, '..'), absoluteIconPath),
      iconSource,
      iconAst: unified()
        .use(parse, {fragment: true, space: 'svg'})
        .parse(iconSource),
      expectedViewbox: svg.viewbox,
      expectedFillColors: svg.colors,
    };
  });

allIconFiles.forEach(
  ({iconPath, iconSource, iconAst, expectedViewbox, expectedFillColors}) => {
    describe(`SVG Contents: packages/${iconPath}`, () => {
      it(`only has the expected root attributes`, () => {
        const properties = Object.keys(
          select(':root', iconAst).properties,
        ).sort();
        expect(properties).toStrictEqual(['viewBox', 'xmlns'].sort());
      });

      it(`has an xml namespace`, () => {
        const xmlns = select(':root', iconAst).properties.xmlns;
        expect(xmlns).toBe('http://www.w3.org/2000/svg');
      });

      it(`has a viewbox of "${expectedViewbox}"`, () => {
        const viewBox = select(':root', iconAst).properties.viewBox;
        expect(viewBox).toStrictEqual(expectedViewbox);
      });

      it('has no groups (<g>) or masks (<mask>)', () => {
        const groupNodes = selectAll('g, mask', iconAst);

        expect(nodeSources(groupNodes, iconSource)).toStrictEqual([]);
      });

      it('tags are self-closing whenever possible', () => {
        const allNodes = selectAll('*', iconAst);
        const allNodeStrings = nodeSources(allNodes, iconSource);

        allNodes.forEach((node, i) => {
          if (node.children.length === 0) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(allNodeStrings[i]).not.toContain(`</${node.tagName}>`);
          }
        });
      });

      it('only has <path>s, <polygon>s and <circle>s with an explict fill color', () => {
        const nodesWithUndefinedFill = selectAll(
          'path:not([fill]), circle:not([fill]), polygon:not([fill])',
          iconAst,
        );

        expect(nodeSources(nodesWithUndefinedFill, iconSource)).toStrictEqual(
          [],
        );
      });

      it('only has <path>s that only use the [d, fill, fill-rule, fill-opacity] attributes', () => {
        const allowedAttributes = ['d', 'fill', 'fillRule', 'fillOpacity'];

        const nodesWithDisallowedAttributes = selectAll('path', iconAst).filter(
          (node) => {
            const propIsAllowed = (prop) => !allowedAttributes.includes(prop);
            return Object.keys(node.properties).some(propIsAllowed);
          },
        );

        expect(
          nodeSources(nodesWithDisallowedAttributes, iconSource),
        ).toStrictEqual([]);
      });

      it('only has <polygon>s that only use the [fill, points] attributes', () => {
        const allowedAttributes = ['fill', 'points'];

        const nodesWithDisallowedAttributes = selectAll(
          'polygon',
          iconAst,
        ).filter((node) => {
          const propIsAllowed = (prop) => !allowedAttributes.includes(prop);
          return Object.keys(node.properties).some(propIsAllowed);
        });

        expect(
          nodeSources(nodesWithDisallowedAttributes, iconSource),
        ).toStrictEqual([]);
      });

      it('only has <circle>s that only use the [cx, cy, r, fill, fill-rule] attributes', () => {
        const allowedAttributes = ['cx', 'cy', 'r', 'fill', 'fillRule'];

        const nodesWithDisallowedAttributes = selectAll(
          'circle',
          iconAst,
        ).filter((node) => {
          const propIsAllowed = (prop) => !allowedAttributes.includes(prop);
          return Object.keys(node.properties).some(propIsAllowed);
        });

        expect(
          nodeSources(nodesWithDisallowedAttributes, iconSource),
        ).toStrictEqual([]);
      });

      if (expectedFillColors) {
        const expectedFillsString = expectedFillColors.join(',');

        it(`has no nodes that use fill colors other than [${expectedFillsString}]`, () => {
          const nodesWithInvalidFill = selectAll('[fill]', iconAst).filter(
            (node) => {
              return !expectedFillColors.includes(node.properties.fill);
            },
          );

          expect(nodeSources(nodesWithInvalidFill, iconSource)).toStrictEqual(
            [],
          );
        });
      }
    });
  },
);

function nodeSources(nodes, iconSource) {
  return nodes.map((node) =>
    iconSource.substr(
      node.position.start.offset,
      node.position.end.offset - node.position.start.offset,
    ),
  );
}
