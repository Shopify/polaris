import styles from "./WebsitePreviewTool.module.scss";

interface Props {}

const breakpoints: { width: number; height: number }[] = [
  {
    width: 360,
    height: 700,
  },
  {
    width: 1120,
    height: 700,
  },
  {
    width: 1500,
    height: 900,
  },
];

const pagesToTest: { url: string; title: string; checklist: string[] }[] = [
  {
    url: "/",
    title: "Home",
    checklist: [],
  },
  {
    url: "/foundations",
    title: "Foundations index",
    checklist: [],
  },
  {
    url: "/foundations/design/typography",
    title: "Foundations article",
    checklist: [
      "Typography looks good",
      "Code examples look good",
      "Dos and don't look good",
      "Table of contents highlights items as you scroll",
      "Clicking table of content links works",
    ],
  },
  {
    url: "/components",
    title: "Components overview",
    checklist: [],
  },
  {
    url: "/components/app-provider",
    title: "Component",
    checklist: [
      "Examples render",
      "Source code renders",
      "Props render",
      "Code examples in the article look good",
    ],
  },
  {
    url: "/tokens/colors",
    title: "Tokens",
    checklist: [],
  },
  {
    url: "/some-page-that-doesnt-exist",
    title: "404 page",
    checklist: [],
  },
];

function WebsitePreviewTool({}: Props) {
  return (
    <div className={styles.WebsitePreviewTool}>
      {pagesToTest.map(({ url, title }) => {
        return (
          <div className={styles.Page} key={url}>
            <h2>{title}</h2>
            <div className={styles.Previews}>
              {breakpoints.map(({ width, height }) => (
                <iframe key={width} width={width} height={height} src={url} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WebsitePreviewTool;
