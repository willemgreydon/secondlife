import fs from "fs";
import path from "path";

const componentsDir = path.join(process.cwd(), "src/components/site/sections");
const mappingFile = path.join(process.cwd(), "src/lib/cms/mapping.ts");

function getComponents() {
  return fs
    .readdirSync(componentsDir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(".tsx", ""));
}

function getMapped() {
  const contents = fs.readFileSync(mappingFile, "utf-8");
  const regex = /(\w+Section|Grid|Block|Stats|heroSection|imageBlock)/g;
  return [...contents.matchAll(regex)].map((m) => m[0]);
}

const components = getComponents();
const mapped = getMapped();

console.log("\n--- VALIDATION REPORT ---\n");

components.forEach((c) => {
  if (!mapped.some((m) => m.toLowerCase().includes(c.toLowerCase()))) {
    console.warn("⚠ Missing in mapping.ts →", c);
  }
});

mapped.forEach((m) => {
  if (!components.some((c) => m.toLowerCase().includes(c.toLowerCase()))) {
    console.warn("⚠ Mapping refers to missing component →", m);
  }
});

console.log("\nValidation complete.\n");
