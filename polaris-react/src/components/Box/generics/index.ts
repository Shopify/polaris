/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {Properties as CSSProperties} from 'csstype';
import type {Simplify} from 'type-fest';

/**
 * Force Typescript to flatten out a union type to its concrete values
 */
export type SimplifyUnion<T> = Unwrap<WrapInObject<T>>;
type WrapInObject<T> = T extends unknown ? {key: T} : never;
type Unwrap<T> = T extends {key: unknown} ? T['key'] : never;

// Adapted from https://stackoverflow.com/a/64034671
// & https://stackoverflow.com/a/58986589
// Wrapping the argument in [] prevents distributing unions since we're only
// interested in the actual value of the tuple (and a union is fine).
// Note: Will remove non-object values from the Tuple.
type MapTupleToKeys<T extends unknown[]> = [T] extends [[infer H, ...infer R]]
  ? [IsObject<H>] extends [true]
    ? [keyof H, ...MapTupleToKeys<R>]
    : MapTupleToKeys<R>
  : [];

// Wrapping the argument in [] prevents distributing unions since we're only
// interested in the actual value of the generic (and a union is not an object).
// 'never' extends 'object', but we don't want 'never', so have to explicitly
// filter it out here.
// prettier-ignore
type IsObject<T> = [T] extends [object]
  ? [T] extends [never]
    ? false
    : [unknown] extends [T]
      ? false
      : [T] extends [(...arg: any[]) => any]
        ? false
        : true
  : false;

type PropertyToAliasesShape<Properties extends object> = {
  [x: string]: keyof Properties;
};
type BreakpointsShape = {[x: string]: string};
type ModifiersShape = {[x: string]: string};
type PseudoElementsShape = {[x: string]: '::before' | '::after'};

type PropsWithAliases<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
> = IsObject<PropertyToAliases> extends true
  ? Simplify<
      Partial<Properties> & {
        [Key in keyof PropertyToAliases]+?: Properties[PropertyToAliases[Key]];
      }
    >
  : Partial<Properties>;

type MakeResponsiveProps<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  Props = PropsWithAliases<Properties, PropertyToAliases>,
> = IsObject<Breakpoints> extends true
  ? {
      [Key in keyof Props]+?:
        | Props[Key]
        | {
            [Breakpoint in keyof Breakpoints]+?: Props[Key];
          };
    }
  : Props;

type MakeResponsivePropsWithPseudoElements<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  PseudoElements extends PseudoElementsShape | unknown,
  ResponsiveProps = MakeResponsiveProps<
    Properties,
    PropertyToAliases,
    Breakpoints
  >,
> = IsObject<PseudoElements> extends true
  ? Simplify<
      ResponsiveProps & {
        [PseudoElement in keyof PseudoElements]+?: ResponsiveProps;
      }
    >
  : ResponsiveProps;

type MakeResponsiveModifiablePropsWithPseudoElements<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  Modifiers extends ModifiersShape | unknown,
  PseudoElements extends PseudoElementsShape | unknown,
  ResponsivePropsWithPseudoElements = MakeResponsivePropsWithPseudoElements<
    Properties,
    PropertyToAliases,
    Breakpoints,
    PseudoElements
  >,
> = IsObject<Modifiers> extends true
  ? Simplify<
      ResponsivePropsWithPseudoElements & {
        [Modifier in keyof Modifiers]+?: ResponsivePropsWithPseudoElements;
      }
    >
  : ResponsivePropsWithPseudoElements;

// We're opinionated on the possible structure of incoming prop objects, so
// we're able to list out all the possible combinations of paths.
// Some objects may be `never` (ie; not configured), but they'll get filtered
// out during the MapTupleToKeys<> call.
type MakePropPaths<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  Modifiers extends ModifiersShape | unknown,
  PseudoElements extends PseudoElementsShape | unknown,
  Props = PropsWithAliases<Properties, PropertyToAliases>,
> =
  | MapTupleToKeys<[Props]>
  | MapTupleToKeys<[Props, Breakpoints]>
  | MapTupleToKeys<[Modifiers, Props]>
  | MapTupleToKeys<[Modifiers, Props, Breakpoints]>
  | MapTupleToKeys<[PseudoElements, Props]>
  | MapTupleToKeys<[PseudoElements, Props, Breakpoints]>
  | MapTupleToKeys<[Modifiers, PseudoElements, Props]>
  | MapTupleToKeys<[Modifiers, PseudoElements, Props, Breakpoints]>;

type CreateOptions<
  Properties extends object,
  PropertyToAliases extends PropertyToAliasesShape<Properties>,
  Breakpoints extends BreakpointsShape | unknown,
  Modifiers extends ModifiersShape | unknown,
  PseudoElements extends PseudoElementsShape | unknown,
  Props = PropsWithAliases<Properties, PropertyToAliases>,
  PropPaths = SimplifyUnion<
    MakePropPaths<
      Properties,
      PropertyToAliases,
      Breakpoints,
      Modifiers,
      PseudoElements
    >
  >,
> = {
  aliases?: PropertyToAliases;
  breakpoints?: Breakpoints;
  modifiers?: Modifiers;
  pseudoElements?: PseudoElements;
  valueMapper?: <Path extends PropPaths>(
    value: Props[keyof Props],
    /**
     * The style prop this value relates to.
     */
    prop: keyof Props,
    /**
     * Path to get to this value. NOTE: `prop` may not be the last element in
     * the path. For example: `['_hover', 'color', 'sm']` has the breakpoint as
     * the last element
     */
    path: Path,
  ) => unknown;
};

function create<Properties extends object = CSSProperties>() {
  // Ugh, Typescript doesn't support partial/private type parameter inference.
  // We need to set `Properties` to a default value above, but in doing so are
  // forced to give a default value to all following generics. As soon as we do
  // that, those generics are no longer inferred, so the types all break.
  // The only fix is to have an interim function call where the outer one
  // sets the default value of the generic, then the inner infers all the
  // generics.
  // See https://stackoverflow.com/a/60378737
  // See https://github.com/microsoft/TypeScript/issues/26242
  return <
    PropertyToAliases extends PropertyToAliasesShape<Properties>,
    Breakpoints extends BreakpointsShape | unknown,
    Modifiers extends ModifiersShape | unknown,
    PseudoElements extends PseudoElementsShape | unknown,
  >(
    options: CreateOptions<
      Properties,
      PropertyToAliases,
      Breakpoints,
      Modifiers,
      PseudoElements
    >,
  ) => {
    type PropPaths = SimplifyUnion<
      MakePropPaths<
        Properties,
        PropertyToAliases,
        Breakpoints,
        Modifiers,
        PseudoElements
      >
    >;

    type ResponsiveModifiablePropsWithPseudoElements =
      MakeResponsiveModifiablePropsWithPseudoElements<
        Properties,
        PropertyToAliases,
        Breakpoints,
        Modifiers,
        PseudoElements
      >;

    const {
      /*
      aliases,
      breakpoints,
      modifiers,
      pseudoElements,
      */
      valueMapper = (value) => value,
    } = options;

    function itr(obj: ResponsiveModifiablePropsWithPseudoElements) {
      _itr(obj);
    }

    function _itr(obj: object, path?: PropPaths) {
      obj &&
        typeof obj === 'object' &&
        (Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
          const nestedPath = (path ?? []).concat(key);
          const value = obj[key];
          if (value && typeof value === 'object') {
            _itr(value, nestedPath as PropPaths);
          } else if (value) {
            valueMapper(value, key, nestedPath as PropPaths);
          }
        });
    }

    return itr;
  };
}

const runner = create()({
  aliases: {textColor: 'color'},
  modifiers: {_hover: '::hover', _active: '::active'},
  breakpoints: {xs: '@media /* ... */', sm: '@media /* ... */'},
  pseudoElements: {_before: '::before'},
  valueMapper: (
    value,
    // ^?
    prop,
    // ^?
    path,
    // ^?
  ) => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(path), `${prop}: ${JSON.stringify(value)}`);
  },
});

runner({
  // ^?
  display: 'flex',
  _hover: {display: 'block', color: 'red', _before: {color: {xs: 'blue'}}},
  _before: {display: 'flex'},
});
/*
["display"] display: "flex"
["_hover","display"] display: "block"
["_hover","color"] color: "red"
["_hover","_before","color","xs"] xs: "blue"
["_before","display"] display: "flex"
*/

runner({
  // ^?
  backgroundColor: 'flex',
  _hover: {
    backgroundColor: 'block',
    color: 'red',
    _before: {color: {xs: 'blue'}},
  },
  _before: {backgroundColor: 'flex'},
});
