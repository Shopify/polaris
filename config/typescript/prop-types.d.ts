// https://github.com/Microsoft/TypeScript/issues/24599
declare module 'prop-types' {
  const content: any;
  export = content;
}
