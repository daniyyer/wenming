const glob = require("glob");
let pages = {};
const path = require("path");

glob.sync("./src/layouts/*/pages/*/index.ejs").forEach(function (filePath) {
  let layout = filePath.match(/layouts\/(.+)\/pages\/(.+)\/index.ejs/);
  // console.log(layout);
  layout = layout[1];
  if (!(layout in pages)) {
    pages[layout] = { list: [] };
    const nameStrLayoutPath = path.join("../src/layouts/", layout, "/name.js");
    let layoutName;
    try {
      layoutName = require(nameStrLayoutPath);
      pages[layout].name = layoutName;
    } catch (ex) {
      layoutName = layout;
    }
  }

  let filename = filePath.match(/\/pages\/(.+)\/index.ejs/);
  filename = filename[1];
  const nameStrFilePath = path.resolve(path.dirname(filePath), "name.js");

  let name;
  try {
    name = require(nameStrFilePath);
    // do stuff
  } catch (ex) {
    name = filename;
  }
  let page = { name: name, key: filename, url: "../" + layout + "/" + filename + ".html" };
  pages[layout].list.push(page);
});
const fs = require("fs");
const json = JSON.stringify(pages);
fs.writeFile("pagelist/pagelist.json", json, "utf8", function () {}); // write it back
module.exports = pages;
