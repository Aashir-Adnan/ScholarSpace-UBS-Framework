const fs = require('fs');
const path = require('path');

const directories = [];

function requireAllJSFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      requireAllJSFiles(fullPath);
    } else if (path.extname(file) === '.js' && file !== 'Sample_requests.js') {
      directories.push(fullPath);
      require(fullPath);
    }
  });
}

module.exports = { requireAllJSFiles };
