const fs = require('fs');
const path = require('path');

const svgo = require('svgo');
const globby = require('globby');
const unified = require('unified');
const parse = require('rehype-parse');
const {select, selectAll} = require('hast-util-select');

const svgoConfig = require('../svgo.config');

const nameRegex = /(?<=)(Major|Minor)(?=\.svg)/;

const allIconFiles = globby
  .sync(path.resolve(__dirname, '../icons/*.svg'))
  .map((absoluteIconPath) => {
    // We don't care about the first item, only the groups matches
    const [, set] = nameRegex.exec(absoluteIconPath) || [];

    const iconSource = fs.readFileSync(absoluteIconPath, 'utf-8');
    const optimizedSource = svgo.optimize(iconSource, svgoConfig).data;

    const svg = new Map([
      ['Major', {viewbox: '0 0 20 20'}],
      ['Minor', {viewbox: '0 0 20 20'}],
    ]).get([set].filter(Boolean).join('_'));
    if (svg == null) {
      throw new Error(
        `SVG metadata not found for ${absoluteIconPath}. Make sure your icon contains "Major" or "Minor" in its name.`,
      );
    }
    return {
      iconPath: path.relative(path.join(__dirname, '..'), absoluteIconPath),
      iconSource,
      optimizedSource,
      iconAst: unified()
        .use(parse, {fragment: true, space: 'svg'})
        .parse(iconSource),
      expectedViewbox: svg.viewbox,
      expectedFillColors: svg.colors,
    };
  });

allIconFiles.forEach(
  ({
    iconPath,
    iconSource,
    optimizedSource,
    iconAst,
    expectedViewbox,
    expectedFillColors,
  }) => {
    describe(`SVG Contents: packages/${iconPath}`, () => {
      it(`is optimized`, () => {
        expect(iconSource).toStrictEqual(optimizedSource);
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

      it('only has <path>s that only use the [d, fill-rule, fill-opacity] attributes', () => {
        const allowedAttributes = ['d', 'fillRule', 'fillOpacity'];

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

      it('only has <polygon>s that only use the [points] attributes', () => {
        const allowedAttributes = ['points'];

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

      it('only has <circle>s that only use the [cx, cy, r, fill-rule] attributes', () => {
        const allowedAttributes = ['cx', 'cy', 'r', 'fillRule'];

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

      it('does not contain any percentages', () => {
        expect(iconSource).not.toContain('%');
      });

      it('only has nodes that use numbers to represent values in the [fill-opacity] attributes', () => {
        const nodesWithDisallowedValues = selectAll(
          '[fillOpacity], [opacity]',
          iconAst,
        ).filter(({properties: {opacity, fillOpacity}}) =>
          [opacity, fillOpacity]
            .filter(Boolean)
            .some((property) => typeof property !== 'number'),
        );

        expect(
          nodeSources(nodesWithDisallowedValues, iconSource),
        ).toStrictEqual([]);
      });
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
