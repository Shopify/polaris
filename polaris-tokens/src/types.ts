import type {Metadata} from './metadata';

export type Entry<T> = [keyof T, T[keyof T]];
export type Entries<T> = Entry<T>[];

export interface MetadataProperties {
  description?: string;
  value: string;
}

export interface MetadataGroup {
  [token: string]: MetadataProperties;
}

export interface MetadataBase {
  [tokenGroup: string]: MetadataGroup;
}

export interface TokenGroup {
  [token: string]: string;
}

export type ExtractValues<T extends MetadataGroup> = {
  [K in keyof T]: T[K]['value'];
};

export type Tokens = {
  [TokenGroup in keyof Metadata]: ExtractValues<Metadata[TokenGroup]>;
};

// The following utility types are copied directly from `type-fest`:
// https://github.com/sindresorhus/type-fest

/**
 * Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).
 * @category Type
 */
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

/**
 * Gets keys from a type. Similar to `keyof` but this one also works for union types.
 * The reason a simple `keyof Union` does not work is because `keyof` always returns the accessible keys of a type.
 * In the case of a union, that will only be the common keys.
 * @link https://stackoverflow.com/a/49402091
 */
export type KeysOfUnion<T> = T extends T ? keyof T : never;

/**
 * Create a type that does not allow extra properties, meaning it only allows properties that are explicitly declared.
 *
 * Usage examples can be found in the [type-fest source](https://github.com/sindresorhus/type-fest/blob/dfaba0eb253a2d291d45924905643b013b6409aa/source/exact.d.ts#L28-L51)
 */
export type Exact<
  ParameterType,
  InputType extends ParameterType,
> = ParameterType extends Primitive
  ? ParameterType
  : {
      [Key in keyof ParameterType]: Exact<ParameterType[Key], InputType[Key]>;
    } & {
      [Key in Exclude<keyof InputType, KeysOfUnion<ParameterType>>]: never;
    };
