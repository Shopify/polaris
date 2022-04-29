import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import rimraf from "rimraf";

const iconsDir = "../../polaris-icons/icons";
const publicDir = "./public/icons";

let icons = [];

const files = fs.readdirSync(iconsDir, "utf-8");

try {
  rimraf.sync(publicDir);
} catch (error) {}
fs.mkdirSync(publicDir);

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  if (file.endsWith("yml")) {
    try {
      let meta = await yaml.load(
        fs.readFileSync(`${iconsDir}/${file}`, "utf8")
      );
      meta.fileName = file.replace(".yml", "");

      fs.copyFile(
        path.join(iconsDir, file.replace(".yml", ".svg")),
        path.join(publicDir, `${meta.fileName}.svg`),
        (err) => {
          if (err) throw err;
        }
      );

      icons.push(meta);
    } catch (e) {
      console.log(e);
    }
  }
}

fs.writeFileSync("./src/data/icons.json", JSON.stringify(icons, null, 2));

console.log("Done!");
