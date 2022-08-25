/**
 * An interface containing a bunch of complex props
 */
interface InterfaceProps {
  /**
   * A boolean member
   *
   * @default true
   */
  isBoolean: boolean;
  /**
   * A string member
   *
   * @default Hello
   */
  stringMember: string;
  /**
   * A number member
   *
   * @default 123
   */
  numberMember: number;
  /**
   * A method member
   */
  isMethod?: (a: string, b: SomeInterface, c: Animal) => any;
  /**
   * An enum member
   */
  enumMember: Animal;
  /**
   * An optional member
   */
  optionalMember?: string;
  /**
   * A deprecated member
   *
   * @deprecated This member is deprecated...
   */
  deprecatedMember: string;
  /**
   * A member that references another interface
   */
  referencedInterface: SomeInterface;
  /**
   * A union member
   */
  unionMember: string | number;
  /**
   * An intersection member
   */
  intersectionMember: {a: string} & {b: string};
  /**
   * An array member
   */
  arrayMember: [1, 'hello', () => void];
  /**
   * Index signature
   */
  [key: string]: any;
}
