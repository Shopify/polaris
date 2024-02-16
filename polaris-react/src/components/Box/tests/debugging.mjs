import {Session} from 'node:inspector/promises';
import fs from 'node:fs';
const session = new Session();
session.connect();

const convertStylePropsToCSSProperties = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // decamelize.js
  var require_decamelize = __commonJS({
    "decamelize.js"(exports, module) {
      "use strict";
      module.exports = function(str, sep) {
        if (typeof str !== "string") {
          throw new TypeError("Expected a string");
        }
        sep = typeof sep === "undefined" ? "_" : sep;
        return str.replace(/([a-z\d])([A-Z])/g, "$1" + sep + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + sep + "$2").toLowerCase();
      };
    }
  });

  // tiny-invariant.js
  var isProduction = true;
  var prefix = "Invariant failed";
  function invariant(condition, message) {
    if (condition) {
      return;
    }
    if (isProduction) {
      throw new Error(prefix);
    }
    var provided = typeof message === "function" ? message() : message;
    var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
    throw new Error(value);
  }

  // get-style-props.ts
  var import_decamelize = __toESM(require_decamelize());

  // generated-data.ts
  var stylePropAliasFallbacks = {
    rowGap: ["gap"],
    columnGap: ["gap"],
    paddingInlineStart: ["paddingLeft", "paddingInline", "padding"],
    paddingInlineEnd: ["paddingRight", "paddingInline", "padding"],
    paddingBlockStart: ["paddingTop", "paddingBlock", "padding"],
    paddingBlockEnd: ["paddingBottom", "paddingBlock", "padding"],
    marginInlineStart: ["marginLeft", "marginInline", "margin"],
    marginInlineEnd: ["marginRight", "marginInline", "margin"],
    marginBlockStart: ["marginTop", "marginBlock", "margin"],
    marginBlockEnd: ["marginBottom", "marginBlock", "margin"],
    inlineSize: ["width", "size"],
    blockSize: ["height", "size"],
    minInlineSize: ["minWidth", "minSize"],
    minBlockSize: ["minHeight", "minSize"],
    maxInlineSize: ["maxWidth", "maxSize"],
    maxBlockSize: ["maxHeight", "maxSize"],
    containIntrinsicInlineSize: ["containIntrinsicWidth", "containIntrinsicSize"],
    containIntrinsicBlockSize: ["containIntrinsicHeight", "containIntrinsicSize"],
    overflowX: ["overflowInline", "overflow"],
    overflowY: ["overflowBlock", "overflow"],
    overscrollBehaviorInline: ["overscrollBehaviorX", "overscrollBehavior"],
    overscrollBehaviorBlock: ["overscrollBehaviorY", "overscrollBehavior"],
    backgroundColor: ["background"],
    backgroundPositionX: ["backgroundPosition"],
    backgroundPositionY: ["backgroundPosition"],
    borderStartStartRadius: ["borderTopLeftRadius", "borderRadius"],
    borderStartEndRadius: ["borderTopRightRadius", "borderRadius"],
    borderEndStartRadius: ["borderBottomLeftRadius", "borderRadius"],
    borderEndEndRadius: ["borderBottomRightRadius", "borderRadius"],
    borderInlineStartColor: ["borderLeftColor", "borderInlineColor", "borderColor"],
    borderInlineEndColor: ["borderRightColor", "borderInlineColor", "borderColor"],
    borderBlockStartColor: ["borderTopColor", "borderBlockColor", "borderColor"],
    borderBlockEndColor: ["borderBottomColor", "borderBlockColor", "borderColor"],
    borderInlineStartStyle: ["borderLeftStyle", "borderInlineStyle", "borderStyle"],
    borderInlineEndStyle: ["borderRightStyle", "borderInlineStyle", "borderStyle"],
    borderBlockStartStyle: ["borderTopStyle", "borderBlockStyle", "borderStyle"],
    borderBlockEndStyle: ["borderBottomStyle", "borderBlockStyle", "borderStyle"],
    borderInlineStartWidth: ["borderLeftWidth", "borderInlineWidth", "borderWidth"],
    borderInlineEndWidth: ["borderRightWidth", "borderInlineWidth", "borderWidth"],
    borderBlockStartWidth: ["borderTopWidth", "borderBlockWidth", "borderWidth"],
    borderBlockEndWidth: ["borderBottomWidth", "borderBlockWidth", "borderWidth"],
    insetInlineStart: ["left", "insetInline", "inset"],
    insetInlineEnd: ["right", "insetInline", "inset"],
    insetBlockStart: ["top", "insetBlock", "inset"],
    insetBlockEnd: ["bottom", "insetBlock", "inset"],
    scrollPaddingInlineStart: ["scrollPaddingLeft", "scrollPaddingInline", "scrollPadding"],
    scrollPaddingInlineEnd: ["scrollPaddingRight", "scrollPaddingInline", "scrollPadding"],
    scrollPaddingBlockStart: ["scrollPaddingTop", "scrollPaddingBlock", "scrollPadding"],
    scrollPaddingBlockEnd: ["scrollPaddingBottom", "scrollPaddingBlock", "scrollPadding"],
    scrollMarginInlineStart: ["scrollMarginLeft", "scrollMarginInline", "scrollMargin"],
    scrollMarginInlineEnd: ["scrollMarginRight", "scrollMarginInline", "scrollMargin"],
    scrollMarginBlockStart: ["scrollMarginTop", "scrollMarginBlock", "scrollMargin"],
    scrollMarginBlockEnd: ["scrollMarginBottom", "scrollMarginBlock", "scrollMargin"],
    justifyItems: ["justify"],
    alignItems: ["align"],
    boxShadow: ["shadow"]
  };
  var stylePropAliasNames = Array.from(
    new Set(Object.values(stylePropAliasFallbacks).flat())
  );
  var disallowedCSSPropertyValues = [
    "-moz-initial"
  ];
  var cssCustomPropertyNamespace = "_";
  var modifiers = {
    "_active": ":active",
    "_focus": ":focus",
    "_hover": ":hover",
    "_visited": ":visited",
    "_link": ":link"
  };
  var breakpoints = {
    "xs": "&",
    "sm": "@media screen and (min-width: 30.625rem)",
    "md": "@media screen and (min-width: 48rem)",
    "lg": "@media screen and (min-width: 65rem)",
    "xl": "@media screen and (min-width: 90rem)"
  };
  var defaultBreakpointKey = Object.entries(breakpoints).find(([, value]) => value === "&")[0];
  var pseudoElements = {
    "_before": "::before",
    "_after": "::after"
  };

  // get-style-props.ts
  var OPT_IN_MODIFIER_SET = {
    _active: ":active",
    _focus: ":focus",
    _hover: ":hover",
    _visited: ":visited",
    _link: ":link"
  };
  var OPT_IN_PSEUDO_ELEMENT_SET = {
    _after: "::after",
    _backdrop: "::backdrop",
    _before: "::before",
    _cue: "::cue",
    _firstLetter: "::first-letter",
    _firstLine: "::first-line",
    _fileSelectorButton: "::file-selector-button",
    _marker: "::marker",
    _placeholder: "::placeholder",
    _selection: "::selection"
  };
  var DEFAULT_BASE_BREAKPOINT = {
    base: "&"
  };
  var elements = Object.keys(pseudoElements);
  elements.push(0 /* RootElement */);
  var cascadeOrderNumber = 0;
  var cascadeOrder = {};
  for (let cascadeKeys = Object.keys(breakpoints).concat(
    Object.keys(modifiers)
  ), i = 0; i < cascadeKeys.length; i++) {
    cascadeOrder[cascadeKeys[i]] = cascadeOrderNumber++;
  }
  var inverseAliases = Object.keys(
    stylePropAliasFallbacks
  ).reduce((memo, property) => {
    const aliases = stylePropAliasFallbacks[property];
    aliases.forEach((alias, index) => {
      const targets = memo[alias] ??= [];
      const target = index === 0 ? property : aliases[index - 1];
      if (!targets.includes(target)) {
        targets.push(target);
      }
    });
    return memo;
  }, {});
  function identity(arg) {
    return arg;
  }
  function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  function mutateObjectValues(obj, map) {
    for (let keys = Object.keys(obj), i = 0; i < keys.length; i++) {
      const key = keys[i];
      obj[key] = map(obj[key], key);
    }
    return obj;
  }
  function insertIntoProperties(properties, whichElement, declaration, condition, valueToInsert) {
    const element = properties[whichElement] ??= {};
    const conditionalDeclarations = element[declaration] ??= [];
    conditionalDeclarations[cascadeOrder[condition]] = {
      // Given {color: {xs: 'green', sm: 'red', lg: 'blue'}}
      // and defaultBreakpointKey = 'xs'
      // When `prop` is 'sm' or 'lg', we set it as the 'condition'.
      // When `prop` is 'xs', there's no 'condition'.
      //
      // Given {color: 'red'}
      // Then there is no condition.
      condition: condition === defaultBreakpointKey ? void 0 : condition,
      value: valueToInsert
    };
  }
  function convertCSSPropertiesToStyleSheet(styles, prettyIndent = true ? void 0 : 2, indentLevel = 1) {
    return Object.keys(styles).map((selector) => {
      return `${selector}{${Object.keys(styles).reduce((acc, cssProperty) => {
        if (typeof cssProperty === "object") {
          acc.push(convertCSSPropertiesToStyleSheet(cssProperty, prettyIndent, indentLevel + 1));
        } else {
          acc.push(
            `${// Leave Custom Properties alone but all other CSS Properties need
            // to be converted to valid CSS
            cssProperty.startsWith("--") ? cssProperty : (0, import_decamelize.default)(cssProperty, { separator: "-" })}: ${styles[cssProperty]};`
          );
        }
        return acc;
      }, []).join(
        // Double indent since it's inside the selector
        typeof prettyIndent !== "undefined" ? `
${" ".repeat((indentLevel + 1) * prettyIndent)}` : ""
      )}}`;
    }).join(
      typeof prettyIndent !== "undefined" ? `
${" ".repeat(indentLevel * prettyIndent)}` : ""
    );
  }
  function propertyIterator(whichProperties, nestedElement, condition, values) {
    if (values) {
      const declarations = Object.keys(values);
      for (let i = 0; i < declarations.length; i++) {
        const declaration = declarations[i];
        values[declaration] != null && insertIntoProperties(
          whichProperties,
          nestedElement,
          declaration,
          condition,
          values[declaration]
        );
      }
    }
  }
  function spaceHackStringifier(elements2) {
    return elements2 ? mutateObjectValues(
      elements2,
      (values) => (
        // Iterating a sparse array with .reduce is faster than a for() loop
        values == null ? "" : values.reduce(
          (output, { value, condition }) => condition ? `var(--${cssCustomPropertyNamespace}${condition}-on,${value})${output ? ` var(--${cssCustomPropertyNamespace}${condition}-off,${output})` : ""}` : `${value}`,
          ""
        )
      )
    ) : void 0;
  }
  function processOptions({ valueMapper, pseudoElements: pseudoElements2, modifiers: modifiers2, breakpoints: breakpoints2, ...rest }) {
    if (!valueMapper) {
      valueMapper = identity;
    }
    if (pseudoElements2 === true) {
      pseudoElements2 = OPT_IN_PSEUDO_ELEMENT_SET;
    } else if (!pseudoElements2) {
      pseudoElements2 = {};
    }
    if (modifiers2 === true) {
      modifiers2 = OPT_IN_MODIFIER_SET;
    } else if (!modifiers2) {
      modifiers2 = {};
    }
    if (breakpoints2) {
      const breakpointKeys = Object.keys(breakpoints2);
      const baseKeyIndex = breakpointKeys.findIndex((key) => breakpoints2[key].trim() === "&");
      if (baseKeyIndex === -1) {
        breakpoints2 = {
          // Object key order is important, and this one must come first
          // TODO: This assumes mobile-first. Support desktop-first?
          ...DEFAULT_BASE_BREAKPOINT,
          ...breakpoints2
        };
      } else if (baseKeyIndex !== 0) {
        breakpoints2 = {
          // TODO: Why do I need this type assertion?
          [breakpointKeys[baseKeyIndex]]: "&",
          ...breakpoints2
        };
        if (false) {
          console.warn(`Breakpoints must be ordered mobile-first. The "base" breakpoint (${breakpointKeys[baseKeyIndex]}) has been moved to the first position. You should fix this.`);
        }
      }
    } else {
      breakpoints2 = DEFAULT_BASE_BREAKPOINT;
    }
    return { pseudoElements: pseudoElements2, modifiers: modifiers2, breakpoints: breakpoints2, ...rest };
  }
  function create(options = {}) {
    const className = ".Box";
    let globalDefaults;
    const stylesWithSelectors = {};
    const {
      defaults,
      breakpoints: breakpoints2,
      modifiers: modifiers2,
      pseudoElements: pseudoElements2,
      valueMapper: globalValueMapper
    } = processOptions(options);
    if (defaults) {
      const { style, ...pseudoStyles } = convert(defaults);
      if (style) {
        stylesWithSelectors[className] = style;
      }
      const pseudoDefaultKeys = Object.keys(
        pseudoStyles
      );
      for (let i = 0; i < pseudoDefaultKeys.length; i++) {
        const pseudoKey = pseudoDefaultKeys[i];
        const pseudoValue = pseudoStyles[pseudoKey]?.style;
        if (pseudoValue) {
          const pseudoSelector = pseudoElements2[pseudoKey].replace(
            "&",
            className
          );
          stylesWithSelectors[pseudoSelector] = pseudoValue;
        }
      }
    }
    stylesWithSelectors[className] ??= {};
    Object.entries({ ...modifiers2, ...breakpoints2 }).filter(
      // A bare '&' has a special meaning; it's an alias for the 'base' styles
      // when no media query applies.
      ([, selector]) => selector.trim() !== "&"
    ).forEach(([name, selector]) => {
      const nonMatchingState = {
        [`--${cssCustomPropertyNamespace}${name}-on`]: " ",
        [`--${cssCustomPropertyNamespace}${name}-off`]: "initial"
      };
      const matchingState = {
        [`--${cssCustomPropertyNamespace}${name}-on`]: "initial",
        [`--${cssCustomPropertyNamespace}${name}-off`]: " "
      };
      let expandedSelector = selector.trim();
      stylesWithSelectors[className] = {
        ...stylesWithSelectors[className],
        ...nonMatchingState
      };
      if (expandedSelector.startsWith("@")) {
        stylesWithSelectors[expandedSelector] = {
          ...stylesWithSelectors[expandedSelector],
          [className]: {
            ...stylesWithSelectors[expandedSelector][className],
            ...matchingState
          }
        };
      } else {
        expandedSelector = selector.includes("&") ? selector.replace("&", ".Box") : `${className}${selector}`;
        stylesWithSelectors[expandedSelector] = {
          ...stylesWithSelectors[expandedSelector],
          ...matchingState
        };
      }
    });
    const stylesheet = convertCSSPropertiesToStyleSheet(stylesWithSelectors);
    globalDefaults = defaults;
    return {
      stylesheet,
      convert
    };
    function convert(styleProps, {
      defaults: runtimeDefaults,
      valueMapper = globalValueMapper
    } = {}) {
      const styles = [styleProps];
      let lastIsWeakMerged = false;
      if (runtimeDefaults) {
        styles.push(runtimeDefaults);
      }
      if (globalDefaults) {
        styles.push(globalDefaults);
        lastIsWeakMerged = true;
      }
      const [converted] = convertRecursive(
        styles,
        lastIsWeakMerged,
        valueMapper,
        void 0,
        [],
        0 /* RootElement */
      );
      const rootStyles = converted[0 /* RootElement */] ?? {};
      delete converted[0 /* RootElement */];
      const result = mutateObjectValues(
        converted,
        (pseudoElementStyleProps) => pseudoElementStyleProps ? {
          style: pseudoElementStyleProps
        } : void 0
      );
      result.style = rootStyles;
      return result;
    }
    function convertRecursive(stylePropsObjs, lastIsWeakMerged, valueMapper, parent, parentPropPath, whichElement) {
      const parentIsResponsiveDeclaration = parent === 2 /* DeclarationParent */;
      const parentIsPseudoElement = parent === 3 /* PseudoElementParent */;
      const mergedProperties = {};
      const weakProperties = {};
      const lastStyleObjIndex = stylePropsObjs.length - 1;
      for (let whichStyleObj = 0; whichStyleObj < stylePropsObjs.length; whichStyleObj++) {
        const styleObj = stylePropsObjs[whichStyleObj];
        const styleProps = Object.keys(styleObj);
        stylePropLoop:
          for (let i = 0; i < styleProps.length; i++) {
            const maybeAliasedProp = styleProps[i];
            const value = styleObj[maybeAliasedProp];
            if (value == null) {
              continue;
            }
            const aliases = inverseAliases[maybeAliasedProp];
            if (aliases) {
              for (let alias = 0; alias < aliases.length; alias++) {
                const target = aliases[alias];
                if (styleObj[target] == null) {
                  styleObj[target] = value;
                  styleProps.push(target);
                }
              }
              continue;
            }
            for (let prevStyleObj = 0; prevStyleObj < whichStyleObj; prevStyleObj++) {
              if (stylePropsObjs[prevStyleObj][maybeAliasedProp] != null) {
                continue stylePropLoop;
              }
            }
            const prop = maybeAliasedProp;
            const propIsBreakpoint = hasOwn(breakpoints2, prop);
            const propIsModifier = !propIsBreakpoint && hasOwn(modifiers2, prop);
            const propIsPseudoElement = !propIsBreakpoint && !propIsModifier && hasOwn(pseudoElements2, prop);
            const propIsDeclaration = !propIsBreakpoint && !propIsModifier && !propIsPseudoElement;
            const valueIsObject = typeof value === "object";
            const propPath = [...parentPropPath, prop];
            if (value === "unset" && (!lastIsWeakMerged || stylePropsObjs[lastStyleObjIndex][prop] == null)) {
              continue;
            }
            if (!parentIsResponsiveDeclaration && propIsBreakpoint) {
              continue;
            }
            if (parentIsResponsiveDeclaration && !propIsBreakpoint) {
              continue;
            }
            if (parentIsResponsiveDeclaration && propIsBreakpoint && valueIsObject) {
              continue;
            }
            if (parentIsPseudoElement && propIsModifier) {
              continue;
            }
            if (!valueIsObject && propIsModifier) {
              continue;
            }
            if (!valueIsObject && propIsPseudoElement) {
              continue;
            }
            const properties = lastIsWeakMerged && whichStyleObj === lastStyleObjIndex ? weakProperties : mergedProperties;
            if (parentIsResponsiveDeclaration) {
              const declaration = parentPropPath.at(
                -1
              );
              const mappedValue = lastIsWeakMerged && whichStyleObj === lastStyleObjIndex ? value : valueMapper(value, declaration, propPath);
              invariant(
                !disallowedCSSPropertyValues.includes(
                  mappedValue
                ),
                `${propPath?.length ? `[${propPath.join(".")}] ` : ""}${mappedValue} is a disallowed value. Please use a different value.`
              );
              insertIntoProperties(
                properties,
                whichElement,
                declaration,
                // TODO Not sure why TS isn't narrowing prop down correctly here. it could
                // only possibly be one of the responsive object keys at this point.
                prop,
                mappedValue
              );
            } else {
              let lastIsWeakMergedForRecursion = lastIsWeakMerged;
              const stylePropObjsForRecursion = [];
              for (let otherStyleObj = whichStyleObj; otherStyleObj < stylePropsObjs.length; otherStyleObj++) {
                const otherObjsValue = stylePropsObjs[otherStyleObj][prop];
                if (otherObjsValue != null) {
                  stylePropObjsForRecursion.push(
                    // Normalize declarations to responsive object format
                    // eg; `{color: 'red'}` becomes `{color: {xs: 'red'}}`
                    // TODO: How do I tell TS this is correct?
                    propIsDeclaration && typeof otherObjsValue !== "object" ? { [defaultBreakpointKey]: otherObjsValue } : otherObjsValue
                  );
                } else if (otherStyleObj === lastStyleObjIndex) {
                  lastIsWeakMergedForRecursion = false;
                }
              }
              const [nestedMergedProperties, nestedWeakProperties] = convertRecursive(
                stylePropObjsForRecursion,
                lastIsWeakMergedForRecursion,
                valueMapper,
                /* eslint-disable no-nested-ternary -- It's terse & readable */
                propIsModifier ? 1 /* ModifierParent */ : propIsBreakpoint ? 2 /* DeclarationParent */ : propIsPseudoElement ? 3 /* PseudoElementParent */ : 2 /* DeclarationParent */,
                /* eslint-enable no-nested-ternary */
                propPath,
                // Switch to the relevant pseudo element if encountered
                // TODO: How to narrow the type of `prop` here?
                propIsPseudoElement ? prop : whichElement
              );
              const condition = propIsModifier ? prop : defaultBreakpointKey;
              for (let i2 = 0; i2 < elements.length; i2++) {
                const element = elements[i2];
                if (lastIsWeakMergedForRecursion) {
                  propertyIterator(
                    // May be merged properties or weak properties
                    properties,
                    element,
                    condition,
                    nestedWeakProperties[element]
                  );
                }
                propertyIterator(
                  mergedProperties,
                  element,
                  condition,
                  nestedMergedProperties[element]
                );
              }
            }
          }
      }
      if (lastIsWeakMerged) {
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const declarations = weakProperties[element];
          if (declarations) {
            const declarationKeys = Object.keys(
              declarations
            );
            for (let x = 0; x < declarationKeys.length; x++) {
              const key = declarationKeys[x];
              const declarationConditions = declarations[key];
              const runtimeDeclaration = mergedProperties[element]?.[key];
              if (runtimeDeclaration) {
                if (declarationConditions) {
                  declarationConditions.forEach((condition, cascadeIndex) => {
                    runtimeDeclaration[cascadeIndex] ??= condition;
                  });
                }
                delete declarations[key];
              }
            }
          }
        }
      }
      return [
        mutateObjectValues(mergedProperties, spaceHackStringifier),
        mutateObjectValues(weakProperties, spaceHackStringifier)
      ];
    }
  }

  // entry.ts
  return create;
})();

const styleProps = {
  backgroundColor: {md: 'bg-fill-info', lg: 'green'},
  color: 'red',
};

if (false) {
  await session.post('Profiler.enable');
  await session.post('Profiler.start');
  await session.post('Profiler.startPreciseCoverage', {
    callCount: true,
    detailed: true,
  });

  // for (let w = 0; w < 100; w++) {
  // entry.ts
  convertStylePropsToCSSProperties(styleProps);
  // }
  const result = await session.post('Profiler.takePreciseCoverage');

  const {profile} = await session.post('Profiler.stop');

  // Write profile to disk, upload, etc.
  fs.writeFileSync(
    './coverage/tmp/coverage-35111-1707033974459-0.json',
    JSON.stringify(result),
  );
  fs.writeFileSync(
    './profile.cpuprofile',
    JSON.stringify(result),
  );
} else {
  const iterations = 100000;
  const start = performance.now();
  for (let w = 0; w < iterations; w++) {
    convertStylePropsToCSSProperties(styleProps);
  }
  const end = performance.now();
  console.log(`${iterations} took ${end - start}ms`);
}
