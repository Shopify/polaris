export type AlphabetUppercase =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type AlphabetLowercase =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

/**
Gets keys from a type. Similar to `keyof` but this one also works for union types.
The reason a simple `keyof Union` does not work is because `keyof` always returns the accessible keys of a type. In the case of a union, that will only be the common keys.
@link https://stackoverflow.com/a/49402091
*/
export type KeysOfUnion<T> = T extends T ? keyof T : never;

/**
Extract the element of an array that also works for array union.
Returns `never` if T is not an array.
It creates a type-safe way to access the element type of `unknown` type.
*/
type ArrayElement<T> = T extends readonly unknown[] ? T[0] : never;

/**
Extract the object field type if T is an object and K is a key of T, return `never` otherwise.
It creates a type-safe way to access the member type of `unknown` type.
*/
type ObjectValue<T, K> = K extends keyof T ? T[K] : never;

/**
Create a type from `ParameterType` and `InputType` and change keys exclusive to `InputType` to `never`.
- Generate a list of keys that exists in `InputType` but not in `ParameterType`.
- Mark these excess keys as `never`.
*/
type ExactObject<ParameterType, InputType> = {
  [Key in keyof ParameterType]: Exact<
    ParameterType[Key],
    ObjectValue<InputType, Key>
  >;
} & {
  [K in Exclude<keyof InputType, KeysOfUnion<ParameterType>>]: never;
};

/**
Create a type that does not allow extra properties, meaning it only allows properties that are explicitly declared.
This is useful for function type-guarding to reject arguments with excess properties. Due to the nature of TypeScript, it does not complain if excess properties are provided unless the provided value is an object literal.
*Please upvote [this issue](https://github.com/microsoft/TypeScript/issues/12936) if you want to have this type as a built-in in TypeScript.*
@example
```
type OnlyAcceptName = {name: string};
function onlyAcceptName(args: OnlyAcceptName) {}
// TypeScript complains about excess properties when an object literal is provided.
onlyAcceptName({name: 'name', id: 1});
//=> `id` is excess
// TypeScript does not complain about excess properties when the provided value is a variable (not an object literal).
const invalidInput = {name: 'name', id: 1};
onlyAcceptName(invalidInput); // No errors
```
Having `Exact` allows TypeScript to reject excess properties.
@example
```
import {Exact} from 'type-fest';
type OnlyAcceptName = {name: string};
function onlyAcceptNameImproved<T extends Exact<OnlyAcceptName, T>>(args: T) {}
const invalidInput = {name: 'name', id: 1};
onlyAcceptNameImproved(invalidInput); // Compilation error
```
[Read more](https://stackoverflow.com/questions/49580725/is-it-possible-to-restrict-typescript-object-to-contain-only-properties-defined)
@category Utilities
*/
export type Exact<ParameterType, InputType> =
  // Convert union of array to array of union: A[] & B[] => (A & B)[]
  ParameterType extends unknown[]
    ? Exact<ArrayElement<ParameterType>, ArrayElement<InputType>>[]
    : ParameterType extends readonly unknown[]
    ? readonly Exact<ArrayElement<ParameterType>, ArrayElement<InputType>>[]
    : ParameterType extends object
    ? ExactObject<ParameterType, InputType>
    : ParameterType;
