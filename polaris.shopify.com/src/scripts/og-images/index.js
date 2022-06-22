const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");

registerFont("./src/scripts/og-images/Inter-VariableFont_slnt,wght.ttf", {
  family: "Inter",
});

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 630;
const CANVAS_MARGIN = 60;

const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
const ctx = canvas.getContext("2d");

async function createImage(url) {
  let charsOnLine = 0;
  const title = getTitleForUrl(url)
    .split(" ")
    .map((word) => {
      if (charsOnLine + word.length >= 12) {
        return `\n${word}`;
        charsOnLine = 0;
      }
      charsOnLine += word.length;
      return word;
    })
    .join(" ");

  // Draw the background
  ctx.fillStyle = "rgb(50,50,50)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Add component images
  if (url.startsWith("/components")) {
    const urlSegments = url.split("/");
    const slug = urlSegments[urlSegments.length - 1];
    const previewImagePath = `./public/component-previews/${slug}.png`;
    const previewExists = fs.existsSync(previewImagePath);

    if (previewExists) {
      const imageRect = {
        x: 600,
        y: 0,
        width: 1050,
        height: 600,
      };

      await loadImage(previewImagePath).then((image) => {
        ctx.drawImage(
          image,
          imageRect.x,
          imageRect.y,
          imageRect.width,
          imageRect.height
        );
      });

      // Draw black over the image to darken it
      ctx.fillStyle = "rgba(0,0,0,.8)";
      ctx.fillRect(imageRect.x, imageRect.y, imageRect.width, imageRect.height);
    }
  }

  // Draw the title
  ctx.fillStyle = "#fff";
  ctx.font = "80px Inter";
  ctx.fillText(title, CANVAS_MARGIN, CANVAS_MARGIN + 80);

  // Draw Shopify logo
  await loadImage("./src/scripts/og-images/shopify_glyph_white.png").then(
    (image) => {
      const logoDimensions = {
        width: 913,
        height: 1035,
      };

      const logoScale = 0.04;

      ctx.drawImage(
        image,
        CANVAS_MARGIN,
        CANVAS_HEIGHT - CANVAS_MARGIN - logoDimensions.height * logoScale,
        logoDimensions.width * logoScale,
        logoDimensions.height * logoScale
      );

      // Write "Polaris"
      ctx.fillStyle = "#fff";
      ctx.font = "26px Inter";
      ctx.fillText(
        "Polaris",
        CANVAS_MARGIN + logoDimensions.width * logoScale + 20,
        CANVAS_HEIGHT - CANVAS_MARGIN - 10
      );
    }
  );

  ctx.fillStyle = writeImage(canvas, url);
}

function writeImage(canvas, url) {
  const filePath = `./public/open-graph/${
    slugify(url.replace("/", "").replace(/\//g, "--")) || "home"
  }.jpg`;
  fs.writeFileSync(filePath, canvas.toBuffer());
  console.log(`Created image ${filePath}`);
}

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const slugify = (str) => {
  return (
    str
      // Camel to hyphen case
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // Replace spaces with hyphens
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()
  );
};

async function main() {
  const sitemap = fs.readFileSync("./public/sitemap.xml", "utf-8");
  let urls = sitemap
    .match(/loc>[^<]+/gi)
    .map((match) => match.replace("loc>https://polaris.shopify.com", ""))
    .filter((url) => {
      if (url.startsWith("/examples/")) {
        return false;
      }
      return true;
    });

  for (let url of urls) {
    await createImage(url);
  }
}

main();
