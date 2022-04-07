import fs from "fs";
import yaml from "js-yaml";

const iconsDir = "./public/icons";

let icons = [];

const files = fs.readdirSync(iconsDir, "utf-8");

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  if (file.endsWith("yml")) {
    try {
      let meta = await yaml.load(
        fs.readFileSync(`${iconsDir}/${file}`, "utf8")
      );
      meta.fileName = file.replace(".yml", "");
      icons.push(meta);
    } catch (e) {
      console.log(e);
    }
  }
}

fs.writeFileSync("./src/data/icons.json", JSON.stringify(icons, null, 2));

console.log("Done!");
