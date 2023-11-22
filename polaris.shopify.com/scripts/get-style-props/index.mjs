import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';
import {createRequire} from 'node:module';
import _endent from 'endent';
import ts from 'typescript';
import {
  metaTokenGroups as tokenizedCSSStyleProps,
  metaThemeDefault,
  toPx,
} from '@shopify/polaris-tokens';

import {
  disallowedCSSProperties,
  disallowedCSSPropertyValues,
  stylePropConfig,
} from './data.mjs';

const endent = _endent.default;

// Get all breakpoints massaged into a more useful set of data
const breakpoints = Object.entries(metaThemeDefault.breakpoints).map(
  ([key, breakpoint]) => ({
    // We just want the actual size, no prefix
    key: key.replace('breakpoints-', ''),
    // convert rems to px
    value: toPx(breakpoint.value),
  }),
);

const cssLonghandProperties = getCSSTypeLonghandProperties();

// Extract a unique set of just the alias names
const allAliases = Array.from(
  new Set(
    Object.values(stylePropConfig)
      .map(({aliases}) => aliases ?? [])
      .flat(),
  ),
);

const inverseAliases = Object.entries(stylePropConfig).reduce(
  (acc, [prop, {aliases}]) => {
    for (let alias of aliases ?? []) {
      acc[alias] = acc[alias] ?? [];
      acc[alias].push(prop);
    }
    return acc;
  },
  {},
);

const cssPropsToTokenGroup = Object.entries(tokenizedCSSStyleProps).reduce(
  (acc, [tokenGroup, props]) => {
    for (let prop of props) {
      acc[prop] = tokenGroup;
    }
    return acc;
  },
  {},
);

verifyAliases();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const sassFile = await fs.open(
  path.resolve(__dirname, '../../src/components/Cube/style.module.scss'),
  'w+',
);

await writeCSSMediaVars(sassFile);

await sassFile.close();

const tsFile = await fs.open(
  path.resolve(__dirname, '../../src/components/Cube/generated-data.ts'),
  'w+',
);
await writeTSProperties(tsFile);
await tsFile.close();

// -----

function verifyAliases() {
  // To avoid ambiguity and ensure data integrity, we do not allow aliases to
  // have the same name as an allowed CSS property. For example, accidentally
  // aliasing `rowGap` to `columnGap` instead of `gap` will error (because
  // `columnGap` is an allowed CSS Property).
  const aliasCollisions = Object.keys(cssLonghandProperties).filter(
    (longhandProperty) =>
      !disallowedCSSProperties.includes(longhandProperty) &&
      allAliases.includes(longhandProperty),
  );

  // To simplify our types and avoid the dreaded TS Error "TS2590: Expression
  // produces a union type that is too complex to represent", we ensure all CSS
  // properties referencing an alias have the same type.
  // Without this check, we'd have to do an intersection of each of the CSS
  // Properties:
  // ```
  // borderColor: SupportedCSSStyleProps['borderInlineStartColor']
  //   & SupportedCSSStyleProps['borderInlineEndColor']
  //   & SupportedCSSStyleProps['borderBlockStartColor']
  //   & SupportedCSSStyleProps['borderBlockEndColor'];
  // ```
  // Usually this is fine as the types are simple. But for bigger types like
  // `Color`, there are _hundreds_ of unions which then get intersected and it
  // blows past TS's 10,000 limit when checking every possible combination.
  const typeMismatches = [];
  Object.entries(inverseAliases).forEach(([alias, props]) => {
    // Compare the types of every property to ensure there's at least some
    // overlap
    if (
      getArrayIntersection(...props.map((prop) => cssLonghandProperties[prop]))
        .length === 0
    ) {
      typeMismatches.push(alias);
    }
  });

  if (aliasCollisions.length || typeMismatches.length) {
    if (aliasCollisions.length) {
      console.error(
        endent`
          The following CSS properties collide with style prop aliases:

          ${aliasCollisions.join(', ')}

          Aliases which happen to have the same name as a CSS property must be added to \`disallowedCSSProperties[]\` to ensure correct typings.
        `,
      );
    }

    if (typeMismatches.length) {
      console.error(
        endent`
          Cannot use aliases as fallback; constituent CSS Properties do not have any overlap

          ${typeMismatches
            .map(
              (alias) => endent`
                Alias \`${alias}\` is a fallback for:
                  ${inverseAliases[alias]
                    .map(
                      (prop) =>
                        `${prop}: ${cssLonghandProperties[prop].join(' | ')};`,
                    )
                    .join('\n  ')}
              `,
            )
            .join('\n\n')}
        `,
      );
    }

    process.exit(-1);
  }
}

function getCSSTypeLonghandProperties() {
  const require = createRequire(import.meta.url);
  const cssTypeDefinitionFile = require.resolve('csstype/index.d.ts');

  const program = ts.createProgram([cssTypeDefinitionFile], {});
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(cssTypeDefinitionFile);
  const exports = checker.getExportsOfModule(
    checker.getSymbolAtLocation(sourceFile),
  );
  const defaultExportSymbol = exports.find(
    (e) => e.escapedName === 'StandardLonghandProperties',
  );

  let type = checker.getDeclaredTypeOfSymbol(defaultExportSymbol);

  const typeToString = (type) => {
    const typeString = checker.typeToString(
      type,
      undefined,
      ts.TypeFormatFlags.NoTruncation |
        ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType |
        ts.TypeFormatFlags.NoTypeReduction,
    );
    if (type.isUnionOrIntersection()) {
      return `(${typeString})`;
    }
    return typeString;
  };

  return type.getProperties().reduce((acc, {name, valueDeclaration}) => {
    const valueType = checker.getTypeAtLocation(valueDeclaration);
    // Pretty much everything from csstype is a union, so this is the hot path
    if (valueType.isUnion()) {
      acc[name] = valueType.types.map((unionType) => typeToString(unionType));
    } else {
      // Pretend it's a union of a single type when it's not a union
      acc[name] = [typeToString(valueType)];
    }
    return acc;
  }, {});
}

async function writeTSProperties(tsFile) {
  const generateTSPickList = (keys, indent) => {
    // We add additional single quotes here because the second argument for Pick
    // is a union of string literal types
    return keys.join(`\n${' '.repeat(indent)}| `);
  };

  const joinEnglish = (arr) => {
    if (arr.length === 1) {
      return arr[0];
    }
    const joined = arr.slice(0, -1).join(', ');
    if (arr.length < 2) {
      return joined;
    }

    return `${joined} and ${arr[arr.length - 1]}`;
  };

  const createMinimumCommonUnionForAlias = (styleProps) => {
    const types = styleProps.map((prop) => cssLonghandProperties[prop]);
    if (arraysAreEqualSets(...types)) {
      // If all the types are the same, just reference the first from the
      // list
      return `SupportedStyleProps['${styleProps[0]}']`;
    }

    // Otherwise, reduce it down to a minimum set by excluding all the
    // properties not shared
    const typeIntersection = getArrayIntersection(...types);
    if (typeIntersection.length === 0) {
      return `never`;
    }

    const symetricalDifference = getArrayDifference(
      types.flat(),
      typeIntersection,
    );

    const typesToRemoveFromFirst = getArrayIntersection(
      types[0],
      symetricalDifference,
    );

    return endent`
      Exclude<
          SupportedStyleProps['${styleProps[0]}'],
          ${generateTSPickList(typesToRemoveFromFirst, 0)}
        >
    `;
  };

  await tsFile.write(`/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
import type {StandardLonghandProperties, Globals} from 'csstype';
import type {TokenizedStyleProps} from '@shopify/polaris-tokens';
import type {OverrideProperties}  from 'type-fest';
import type {ResponsiveProp} from '../../utils/various';

/**
 * Pick only the keys in \`PickFrom\` which are also in \`IntersectWith\`.
 */
type PickIntersection<PickFrom, IntersectWith> = Pick<
  PickFrom,
  keyof IntersectWith & keyof PickFrom
>;

/**
 * The subset of all CSS that we support in Polaris (does not include aliases).
 */
type SupportedCSSStyleProps = Omit<
  // Why Longhand properties and not ALL properties?
  // Shorthand properties need to come before longhand properties so
  // the most specific (longhand) applies based on CSS order.
  // For example, \`flex-flow\` is a shorthand of \`<flex-direction> <flex-wrap>\`,
  // and so must come before both of those.
  //
  // Challenges with supporting shorthand properties:
  // a. Cannot use alphabetical sorting (\`flex-direction\` would end up before
  // \`flex-flow\` which is invalid).
  // b. Cannot use \`property.logicalProperyGroup\` from \`@webref/css\` as that's
  // not reliable (doesn't even exist for the \`flex\` family of properties).
  // c. Cannot rely on the order of properties in an @webref/css specification
  // containing both long and shorthand variants since later "Delta" specs might
  // introduce new shorthands (and so would come after the longhand when
  // iterating and therefore are invalid).
  // d. mdn data appears to have an incomplete list of shorthand properties.
  //
  // Possible solutions:
  // 1. Use data like { 'flex-flow': ['flex-direction', 'flex-wrap'] } to sort
  //    longhands after shorthands
  // 2. Rely on csstype to filter out all the shorthand properties completely.
  //
  // We're chosing solution #2 here; filtering out shorthand CSS Properties.
  // Note that in a later step where we create "aliases" to enable a builder to
  // pass a single value which acts as a fallback for the props specified as
  // fallbacks. Some of these aliases may have identical names to the shorthand
  // properties, but shouldn't be confused as being the same.
  StandardLonghandProperties,
  DisallowedStandardLonghandProperties
>;

/**
 * Some of our supported CSS properties must have a value from
 * \`@shopify/polaris-tokens\`, so we override those properties here
 *
 * @example
 * \`padding-inline-start\` can only accept the \`space-*\` tokens.
 */
type SupportedStyleProps = OverrideProperties<
  SupportedCSSStyleProps,
  // \`@shopify/polaris-tokens\` may type more CSS properties than we want to
  // support here, so ensure we're only picking the ones we explicityly support
  PickIntersection<TokenizedStyleProps, SupportedCSSStyleProps>
>;

type StyleProps = SupportedStyleProps & StylePropAliases;

/**
 * A combination of raw CSS style props, tokenized style props (derived from
 * \`@shopify/polaris-tokens\`), and helpful aliases for frequently used props.
 */
export type ResponsiveStyleProps = {
  [K in keyof StyleProps]?: ResponsiveProp<
    // Excluding globally disallowed values as the last thing we do ensures none
    // slip through the cracks in the above type definitions.
    Exclude<StyleProps[K], (typeof disallowedCSSPropertyValues)[number]>
  >;
};

/**
* Polaris specifies some aliases which are used as fallback values when an
* explicit style prop isn't set. Aliases may themselves fallback to other
* aliases. Some aliases may be tokenized values or CSS values, but never both.
*
 * @example
 * \`justify\` is an alias to \`justifyItems\` when \`justifyItems\` isn't set.
*
* <Box justify="center" />
* =>
* style={{ justifyItems: 'center' }}
*
* <Box justifyItems="left" justify="center" />
* =>
* style={{ justifyItems: 'left' }}
*
* @example
* \`paddingInline\` is an alias to \`paddingInlineStart\` and
* \`paddingInlineEnd\` when they aren't set.
*
* <Box paddingInline="space-400" />
* =>
* style={{
*   paddingInlineStart: '400',
*   paddingInlineEnd: '400',
* }}
*
* <Box paddingInline="space-400" paddingInlineEnd="space-600" />
* =>
* style={{
*   paddingInlineStart: '400',
*   paddingInlineEnd: '600',
* }}
*
* @example
* \`padding\` is an alias to \`paddingInline\` and \`paddingBlock\` which themselves
* are aliases to \`paddingInlineStart\`, \`paddingInlineEnd\` and
* \`paddingBlockStart\`, \`paddingBlockEnd\` respectively.
*
* <Box padding="space-400" />
* => style={{
*   paddingInlineStart: '400',
*   paddingInlineEnd: '400',
*   paddingBlockStart: '400',
*   paddingBlockEnd: '400',
* }}
*
* <Box paddingBlock="space-800" padding="space-400" paddingInlineEnd="space-600" />
* => style={{
*   paddingInlineStart: '400',
*   paddingInlineEnd: '600',
*   paddingBlockStart: '800',
*   paddingBlockEnd: '800',
* }}
*/
interface StylePropAliases {${Object.entries(inverseAliases)
    .map(
      ([alias, styleProps]) => `
  /**
   * Fallback for ${joinEnglish(styleProps.map((prop) => `\`${prop}\``))}.
   *
   * \`\`\`
   * ${styleProps
     .map(
       (prop) =>
         `${prop} = props.${prop} ?? ${stylePropConfig[prop].aliases
           .map((fallbackProp) => `props.${fallbackProp}`)
           .join(' ?? ')};`,
     )
     .join('\n   * ')}
   * \`\`\`
   */
  ${alias}?: ${createMinimumCommonUnionForAlias(styleProps)};`,
    )
    .join('\n')}
};

/**
 * CSS properties we don't support.
 *
 * Note: Some 'disallowed' properties happen to share a name with allowed
 * aliases (eg; \`paddingInline\` is an alias for \`paddingInlineStart\` and
 * \`paddingInlineEnd\`), so they appear in the list below, but are later
 * included in the final \`StyleProps\` type.
 */
type DisallowedStandardLonghandProperties = ${generateTSPickList(
    [...disallowedCSSProperties, ...allAliases]
      .filter((prop) => Object.hasOwn(cssLonghandProperties, prop))
      // We add additional single quotes here because the second argument for
      // Omit is a union of string literal types
      .map((prop) => `'${prop}'`),
    2,
  )};

/**
 * Props which act as an alias to one or more more specific props.
 *
 * For example; 'padding' is an alias to 'padding-inline-start',
 * 'padding-inline-end', etc, when those individual props aren't set.
 */
export const stylePropAliasFallbacks = {
  ${Object.entries(stylePropConfig)
    .filter(([, {aliases}]) => aliases?.length)
    .map(
      ([styleProp, {aliases}]) => `${styleProp}: ${JSON.stringify(aliases)},`,
    )
    .join('\n  ')}
} satisfies { [K in keyof SupportedCSSStyleProps]?: (keyof StyleProps)[] };

// Extract a unique set of just the alias names
export const stylePropAliasNames: (keyof StyleProps)[] = Array.from(
  new Set(Object.values(stylePropAliasFallbacks).flat())
);

export const stylePropDefaults = {
  ${Object.entries(stylePropConfig)
    .filter(([, {getDefault}]) => typeof getDefault !== 'undefined')
    .map(
      ([styleProp, {getDefault}]) => `${styleProp}: ${getDefault.toString()},`,
    )
    .join('\n  ')}
} satisfies {
  [K in keyof StyleProps]?:
    | StyleProps[K]
    | undefined
    | ((props: ResponsiveStyleProps) => StyleProps[K] | undefined)
};

/**
 * A list of values that if passed to any styleProp on our Box component should
 * warn the user, and bail early from the css property injection procedure. We
 * do this as there is no good way for us to explicitly disallow this string
 * literal in our types holistically for every style property.
 */
export const disallowedCSSPropertyValues = ${JSON.stringify(
    disallowedCSSPropertyValues,
    null,
    2,
  )} satisfies Globals[];

/**
 * Style props which only accept tokens need to be assigned to a token group.
 */
export const stylePropTokenGroupMap = {
  // Longhand CSS Style Props
  ${Object.entries(cssPropsToTokenGroup)
    .filter(
      ([prop]) =>
        Object.hasOwn(cssLonghandProperties, prop) &&
        !allAliases.includes(prop),
    )
    .map(([prop, tokenGroup]) => `${prop}: ${JSON.stringify(tokenGroup)}`)
    .join(',\n  ')},

  // Aliases
  ${Object.entries(inverseAliases)
    // Aliases map to longhand CSS properties eventually, but some might map to
    // other properties in the meantime, so we have to resolve all of them
    .filter(([, properties]) =>
      Object.hasOwn(cssPropsToTokenGroup, properties[0]),
    )
    // We only check the first property relying on this alias and assume the
    // rest are also tokenized thanks to earlier checks confirming all the
    // properties have the same type.
    .map(
      ([alias, properties]) =>
        `${alias}: ${JSON.stringify(cssPropsToTokenGroup[properties[0]])}`,
    )
    .join(',\n  ')},
} as const;
`);
}

// See: https://github.com/propjockey/css-media-vars/blob/master/css-media-vars.css
async function writeCSSMediaVars(file) {
  // Skip the 'xs' size as we've done it above outside of the media queries
  // (mobile first ftw!)
  const breakpointsWithoutXs = breakpoints.slice(1);
  await file.write(`/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
.Box {
  ${breakpointsWithoutXs
    // Set css-media-vars values to `initial`. If any of these are attempted to be
    // read in a custom CSS Property, it will have the value 'initial' which then
    // triggers the fallback of `var()` to be substituted.
    .map(({key}) => `--_p-media-${key}: initial;`)
    .join('\n  ')}
}
${breakpointsWithoutXs
  // At each breakpoint, set the css-media-vars value to ` ` (a space; a valid
  // value in CSS!). Now when this is attempted to be read, it will simply
  // insert a space which is ignored and the rest of the value is used.
  // Later, these will be used in a rule similar to:
  // --pc-box-color-sm: var(--_p-media-sm) red;
  // --pc-box-color-lg: var(--_p-media-lg) blue;
  // color: var(--pc-box-color-lg, var(--pc-box-color-sm, unset));
  .map(
    ({key, value}) => `
@media screen and (min-width: ${value}) {
  .Box {
    --_p-media-${key}: ;
  }
}`,
  )
  .join('\n')}`);
}

function getArrayIntersection(...arrs) {
  // Start with a union of all elements.
  const union = new Set(arrs.flat());

  // Then calculate the intersection of the sets.
  // Start with the full union and iteratively remove items which aren't in
  // individual sets.
  const intersection = new Set(union);
  for (const arr of arrs) {
    for (const elem of intersection) {
      if (!arr.includes(elem)) {
        intersection.delete(elem);
      }
    }
  }

  return Array.from(intersection);
}

function getArrayDifference(...arrs) {
  // Start with the first array
  const union = new Set(arrs[0]);

  // Then remove elements from every other array
  arrs.slice(1).forEach((arr) => {
    for (const elem of arr) {
      union.delete(elem);
    }
  });

  return Array.from(union);
}

function arraysAreEqualSets(...arrs) {
  const firstSet = new Set(arrs[0]);

  return arrs.slice(1).every((arr) => {
    const thisSet = new Set(arr);
    if (firstSet.size !== thisSet.size) {
      return false;
    }
    for (const elem of firstSet) {
      if (!thisSet.has(elem)) {
        return false;
      }
    }
    return true;
  });
}
