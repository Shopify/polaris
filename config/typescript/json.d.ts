declare module '*package.json' {
  export const name: string;
  export const version: string;
}

declare module '*.json' {
  const value: any;
  export default value;
}
