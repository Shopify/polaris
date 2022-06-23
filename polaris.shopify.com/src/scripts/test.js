const fs = require("fs");

const interBase64 = fs.readFileSync(
  "./src/scripts/og-images/inter-base64.txt",
  "utf-8"
);

function getTitleForUrl(url) {
  let title = "Polaris";

  if (url !== "/") {
    const urlSegments = url.split("/");
    const slug = urlSegments[urlSegments.length - 1];
    title = capitalizeFirstLetter(slug.replace(/-/g, " "));

    if (url.startsWith("/tokens/")) {
      title = `${title} tokens`;
    }
  }

  return title;
}

const inline = (css) => css.replace(/\n/g, "");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const url = "/foundations";

const code = `
<style>
  * {
    margin: 0;
    padding: 0;
  }

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  body {
    font-family: inter;
    width: 1200px;
  }
</style>

<body>
  <div style="${inline(`
    height: 630px;
    background: black;
    color: white;
  )`)}">
    <h1>${getTitleForUrl(url)}</h1>
  </div>
</body>
`;

let buffer = Buffer.from(code);
let base64 = buffer.toString("base64");
const encodedUrl = `data:text/html;charset=utf-8;base64,${base64}`;

console.log(encodedUrl);
