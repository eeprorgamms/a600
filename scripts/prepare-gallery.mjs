import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const source = new URL('assets-src/gallery/', root);
const destination = new URL('public/gallery/', root);
await mkdir(destination, { recursive: true });

for (let index = 1; index <= 4; index++) {
  const input = new URL('a500-source-' + index + '.png', source);
  const output = new URL('a500-' + index + '.webp', destination);
  await stat(input);
  const info = await sharp(fileURLToPath(input), { failOn: 'error' })
    .rotate()
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 68, effort: 5 })
    .toFile(fileURLToPath(output));
  if (info.width < 500 || info.height < 350) throw new Error('Unexpectedly small photo: ' + index);
  console.log('Gallery ' + index + ': ' + info.width + 'x' + info.height + ', ' + info.size + ' bytes');
}
