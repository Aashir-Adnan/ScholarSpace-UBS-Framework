// scripts/generateCrudJson.js
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "../src/root/pages/CRUDS/Tables");

function walk(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (let file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      walk(fullPath);
    } else if (file.isFile() && file.name === "CRUD_serverCommunication.js") {
      try {
        const content = fs.readFileSync(fullPath, "utf8");

        // Look for `export default { ... }` or `module.exports = { ... }`
        const match =
          content.match(/export\s+default\s+({[\s\S]*});?/) ||
          content.match(/module\.exports\s*=\s*({[\s\S]*});?/);

        if (!match) {
          console.warn(`⚠️  No exportable object found in ${fullPath}`);
          continue;
        }

        let objText = match[1];

        // Replace functions with "[Function]" placeholder
        objText = objText.replace(
          /(\w+)\s*:\s*\([^)]*\)\s*=>\s*{[^}]*}/g,
          `"$1": "[Function]"`
        );

        // Convert object-like JS into valid JSON
        const safeJson = objText
          .replace(/(\w+)\s*:/g, '"$1":') // quote keys
          .replace(/'/g, '"'); // normalize quotes

        const jsonObj = JSON.parse(safeJson);

        // Write JSON next to the JS file
        const outPath = path.join(dir, "CRUD_serverCommunication.json");
        fs.writeFileSync(outPath, JSON.stringify(jsonObj, null, 2), "utf8");

        console.log(`✅ Generated: ${outPath}`);
      } catch (err) {
        console.error(`❌ Failed to process ${fullPath}:`, err.message);
      }
    }
  }
}

walk(rootDir);
