export function appendTextToFile(filePath: string, text: string) {
  const fs = require('fs');
  fs.appendFileSync(filePath, text);
}
