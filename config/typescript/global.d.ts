interface Config {
  url: string;
}
interface JSDOM {
  reconfigure(config: Config): void;
}
declare const jsdom: JSDOM;
