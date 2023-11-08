import style from './style.module.scss';
import {forwardRef} from 'react';
import decamelize from 'decamelize';
import {designTokenStyleProps} from '@shopify/polaris-tokens';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import type {Entries} from 'type-fest';
import {getResponsiveValue, getResponsiveProps} from '../../utils/various';
import {type CubeProps, stylePropAliases} from './generated-data';

// Extract a unique set of just the alias names
const allAliases = Array.from(new Set(Object.values(stylePropAliases).flat()));

const stylePropAliasesEntries = Object.entries(stylePropAliases) as Entries<
  Required<typeof stylePropAliases>
>;

function convertStylePropsToCSSProperties(styleProps: CubeProps) {
  const stylePropsWithExpandedAliases: CubeProps = {...styleProps};

  // Ensure constituent styles are given fallback values even when they're not
  // passed in as an explicit style prop.
  stylePropAliasesEntries.forEach(([styleProp, aliases]) => {
    for (
      let index = 0;
      // Stop looping if there are no more fallbacks
      index < aliases.length &&
      // or if a value is already set (either passed in, or from an earlier
      // fallback)
      typeof stylePropsWithExpandedAliases[styleProp] === 'undefined';
      index++
    ) {
      // TODO: How might we remove the 'as any' here (used to fix the
      // 'Expression produces a union type that is too complex to represent.'
      // TS error)?
      (stylePropsWithExpandedAliases[styleProp] as any) =
        styleProps[aliases[index]];
    }
  });

  // Then delete the aliases as they're no longer needed.
  for (let alias of allAliases) {
    delete stylePropsWithExpandedAliases[alias];
  }

  // camelCase to kebabCase of styleProps
  // intiailise responsive values from valid styleProps
  return (
    Object.entries(stylePropsWithExpandedAliases) as Entries<
      typeof stylePropsWithExpandedAliases
    >
  ).reduce((acc, [key, value]) => {
    // Skip undefined values (can happen when explicit 'undefined' is passed
    // in, or from expanding aliases above.
    if (typeof value === 'undefined') {
      return acc;
    }

    const decamelizedPropKey = decamelize(key, {separator: '-'});

    return {
      ...acc,
      ...(designTokenStyleProps.includes(key as any)
        ? // no token subgroup because it's defined as part of the value
          getResponsiveProps('box', decamelizedPropKey, null, value)
        : getResponsiveValue('box', decamelizedPropKey, value)),
    };
  }, {});
}

type PolymorphicCube = Polymorphic.ForwardRefComponent<any, CubeProps>;

export const Cube = forwardRef(function Cube(
  {as: Tag = 'div', children, ...styleProps},
  forwardedRef,
) {
  const styles = convertStylePropsToCSSProperties(styleProps);
  return (
    <Tag ref={forwardedRef} style={styles} className={style.Box}>
      {children}
    </Tag>
  );
}) as PolymorphicCube;
