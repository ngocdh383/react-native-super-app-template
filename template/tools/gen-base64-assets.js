const fs = require("fs");
const configs = require("./configs.json");
const chalk = require("chalk");

function snakeCase(string) {
  return string
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
}

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString("base64");
}

const assetsEntries = Object.entries(configs.assets);
for (const assetEntry of assetsEntries) {
  const [folder, assestDirPath] = assetEntry;

  const generatedDirPath = `${assestDirPath}/generated`;
  fs.rmdirSync(generatedDirPath, { recursive: true });

  const listIconFilename = fs
    .readdirSync(assestDirPath)
    .filter((value) => value[0] !== ".");
  const listIconName1x = listIconFilename.filter(
    (value) => !value.includes("@2x") && !value.includes("@3x")
  );
  const listIconName2x = listIconFilename.filter((value) =>
    value.includes("@2x")
  );
  const listIconName3x = listIconFilename.filter((value) =>
    value.includes("@3x")
  );

  const setOfFile = [];

  for (const x1 of listIconName1x) {
    const x1Token = x1.split(".");
    x1Token[x1Token.length - 1] = "@2x.png";
    const x2 = x1Token.join("");
    x1Token[x1Token.length - 1] = "@3x.png";
    const x3 = x1Token.join("");
    const index2x = listIconName2x.findIndex((value) => value === x2);
    const has2x = index2x !== -1;
    const index3x = listIconName3x.findIndex((value) => value === x3);
    const has3x = index3x !== -1;

    const obj = { 1: x1 };

    if (has2x) {
      obj[2] = x2;
      listIconName2x.splice(index2x, 1);
    }

    if (has3x) {
      obj[3] = x3;
      listIconName3x.splice(index3x, 1);
    }
    setOfFile.push(obj);
  }

  for (const x2 of listIconName2x) {
    const x1 = x2.replace("@2x", "");
    const x1Token = x1.split(".");
    x1Token[x1Token.length - 1] = "@3x.png";
    const x3 = x1Token.join("");
    const index3x = listIconName3x.findIndex((value) => value === x3);
    const has3x = index3x !== -1;

    const obj = { 2: x2 };

    if (has3x) {
      obj[3] = x3;
      listIconName3x.splice(index3x, 1);
    }
    setOfFile.push(obj);
  }

  for (const x3 of listIconName3x) {
    const obj = { 3: x3 };
    setOfFile.push(obj);
  }

  const export_files = [];
  const indexImports = [];
  const indexExports = [];

  for (const setFile of setOfFile) {
    const entries = Object.entries(setFile);
    const base64Obj = { 1: "", 2: "", 3: "" };
    for (const entry of entries) {
      const [size, filename] = entry;
      const fullPath = `${assestDirPath}/${filename}`;
      const base64 = base64_encode(fullPath);
      base64Obj[size] = `data:image/png;base64,${base64}`;
    }

    base64Obj[1] =
      base64Obj[1] !== ""
        ? base64Obj[1]
        : base64Obj[2] !== ""
        ? base64Obj[2]
        : base64Obj[3];
    base64Obj[2] =
      base64Obj[2] !== ""
        ? base64Obj[2]
        : base64Obj[3] !== ""
        ? base64Obj[3]
        : base64Obj[1];
    base64Obj[3] =
      base64Obj[3] !== ""
        ? base64Obj[3]
        : base64Obj[2] !== ""
        ? base64Obj[2]
        : base64Obj[1];

    const x1 = setFile[1]
      ? setFile[1]
      : setFile[2]
      ? setFile[2].replace("@2x", "")
      : setFile[3].replace("@3x", "");
    const name = `${snakeCase(x1.replace(".png", ""))}`;

    const fileContent = `import { getScale } from "react-native-commons-utils/functions";
const icon_${name} = {
  1: {uri: '${base64Obj[1]}'},
  2: {uri: '${base64Obj[2]}'},
  3: {uri: '${base64Obj[3]}'},
};
const ic_${name} = icon_${name}[getScale()];
export default ic_${name};
`;

    indexImports.push(`import ic_${name} from './ic_${name}';`);
    indexExports.push(`ic_${name}`);
    const genFilename = `ic_${name}.ts`;
    export_files.push({
      genFilename,
      fullPath: `${assestDirPath}/${x1}`,
      content: fileContent,
    });
  }

  fs.mkdirSync(generatedDirPath);
  console.log(`⏳ ${folder} folder is converting...`);
  for (const file of export_files) {
    fs.writeFileSync(`${generatedDirPath}/${file.genFilename}`, file.content);
    console.log(
      "✨",
      `${chalk.blue.underline(file.fullPath)} => ${chalk.green.underline(
        `${generatedDirPath}/${file.genFilename}`
      )}`
    );
  }

  const indexFileContent = `${indexImports.join("\n")}

export {
  ${indexExports.join(",\n  ")}
};
`;

  fs.writeFileSync(`${generatedDirPath}/index.ts`, indexFileContent);

  console.log("✅ finished.\n");
}
