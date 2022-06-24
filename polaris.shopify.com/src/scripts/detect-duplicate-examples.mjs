import yaml from "js-yaml";
import fs from "fs";

const examplesDir = "./content/components";
const examples = fs.readdirSync(examplesDir);
let duplicateCount = 0;

examples.forEach((example) => {
  const exampleContent = fs.readFileSync(`${examplesDir}/${example}`, "utf-8");
  const readmeSections = exampleContent.split("---");
  const frontMatterSection = readmeSections[1];
  const frontMatter = yaml.load(frontMatterSection);

  if (frontMatter.examples) {
    const exampleKeys = {};

    frontMatter.examples.forEach((e) => {
      exampleKeys[e.fileName] = true;
    });

    if (Object.keys(exampleKeys).length !== frontMatter.examples.length) {
      console.log(`⚠️  ${frontMatter.name} has duplicate examples`);
      duplicateCount++;
    }
  }
});

if (duplicateCount === 0) {
  console.log("✅ No duplicates found");
}
