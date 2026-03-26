// Hook helper: converts PNG/JPG in public/ to WebP using sharp.
// Reads Claude Code PostToolUse JSON from stdin.
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');

let data = '';
process.stdin.on('data', d => (data += d));
process.stdin.on('end', async () => {
  try {
    const input = JSON.parse(data);
    const fp = (input.tool_input && input.tool_input.file_path) || '';
    if (!fp) return;
    if (!/\.(png|jpe?g)$/i.test(fp)) return;
    if (!/[/\\]public[/\\]/i.test(fp)) return;

    const sharp = require(path.join(projectRoot, 'node_modules', 'sharp'));
    const webpPath = fp.replace(/\.(png|jpe?g)$/i, '.webp');
    await sharp(fp).webp({ quality: 82, effort: 6 }).toFile(webpPath);
    process.stderr.write('Converted to WebP: ' + webpPath + '\n');
  } catch (err) {
    process.stderr.write('WebP conversion error: ' + err.message + '\n');
  }
});
