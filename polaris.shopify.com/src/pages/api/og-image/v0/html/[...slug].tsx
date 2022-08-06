import type { NextApiResponse, NextApiRequest } from "next";
import { VERSION } from "../png/[...slug]";

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const generateHTML = async (apiSlug: string) => {
  const slug = apiSlug.replace(`${VERSION}/html/`, "").replace(".png", "");
  const currentSlug = slug.split("/").at(-1);
  const title = capitalizeFirstLetter(currentSlug || "").replace("-", " ");

  let htmlImg = "<img class='icon' src='/images/default-og.svg'>";

  if (slug.startsWith("components/")) {
    htmlImg = `<img src="/images/${slug}.png" class="component-image" />`;
  }

  return `
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: inter;
    width: 1200px;
    height: 630px;
    padding: 60px;
    background: black;
    color: white;
    perspective: 1800px;
    transform-style: preserve-3d;
  }

  h1 {
    font-size: 80px;
    font-weight: 500;
    letter-spacing: -0.01rem;
    max-width: 520px;
  }

  .default-graphic h1 {
    max-width: 700px;
  }

  .component-image {
    position: absolute;
    left: 100px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    filter: contrast(1.1) invert(1) saturate(0) hue-rotate(180deg);
    mix-blend-mode: lighten;
    opacity: .33;
    height: auto;
    transform: rotateY(-60deg) translateY(-50%) scale(.9);
  }

  .icon {
    filter: brightness(1000%);
    position: absolute;
    left: 600px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    opacity: .2;
  }

  .icon svg {
    width: 721px;
    height: 721px;
  }

  .default-graphic .icon {
    top: 60px;
    left: auto;
    right: 60px;
    width: 300px;
    transform: none;
  }

  .default-graphic .icon svg {
    width: 300px;
    height: 300px;
  }

  .logo {
    position: absolute;
    bottom: 55px;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: .5;
    font-size: 24px;
    font-weight: 500;
  }

  .logo svg {
    min-width: 30px;
    max-width: 30px;
    height: auto;
  }
</style>

<body>
  <h1>${title}</h1>
  ${htmlImg}
  <div class="logo">
    <img src="/images/shopify-logo-mono.svg"> Polaris
  </div>
</body>`;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.url) throw new Error(`og-image API requires a URL`);
    const slug = req.url.replace("/api/og-image/", "");
    const html = await generateHTML(slug);

    res.send(html);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default handler;
