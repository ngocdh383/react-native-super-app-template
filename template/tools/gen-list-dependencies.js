const { dependencies } = require("../package.json");
const str = Object.entries(dependencies)
  .map((item) => {
    return `|${item[0]}|${item[1]}|false|`;
  })
  .join("\n");

console.log(str);
