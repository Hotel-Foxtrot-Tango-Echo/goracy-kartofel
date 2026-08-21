'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DB_ROOT = path.resolve(__dirname, '../submodules/repeters/db');
const OUTPUT = path.resolve(__dirname, '../all-repeaters.yaml');

function countryFromDir(dirName) {
  if (dirName === '!dziedzictwo-narodowe') return 'pl';
  return dirName.toLowerCase();
}

function main() {
  if (!fs.existsSync(DB_ROOT)) {
    console.error(`Brak katalogu: ${DB_ROOT}`);
    process.exit(1);
  }

  const countries = fs
    .readdirSync(DB_ROOT)
    .filter((d) => fs.statSync(path.join(DB_ROOT, d)).isDirectory())
    .sort();

  const result = [];
  let parsed = 0;
  let skipped = 0;

  for (const dir of countries) {
    const c = countryFromDir(dir);
    const countryDir = path.join(DB_ROOT, dir);
    const files = fs
      .readdirSync(countryDir)
      .filter((f) => f.toLowerCase().endsWith('.yaml'))
      .sort();

    for (const file of files) {
      const fullPath = path.join(countryDir, file);
      const name = path.basename(file, path.extname(file));
      try {
        const raw = fs.readFileSync(fullPath, 'utf8');
        const obj = yaml.load(raw);
        if (!obj || typeof obj !== 'object') {
          console.warn(`SKIP (nie-objekt): ${path.relative(DB_ROOT, fullPath)}`);
          skipped++;
          continue;
        }
        delete obj.page;
        result.push({ i: name, c, ...obj });
        parsed++;
      } catch (err) {
        console.warn(
          `SKIP (parse error) ${path.relative(DB_ROOT, fullPath)}: ${err.message}`,
        );
        skipped++;
      }
    }
  }

  const out = yaml.dump(result, {
    lineWidth: -1,
    noRefs: true,
    quotingType: '"',
  });
  fs.writeFileSync(OUTPUT, out, 'utf8');

  console.log(
    `-> Wrzucono ${parsed} przemienników do pliku ${path.relative(process.cwd(), OUTPUT)}`,
  );
  if (skipped > 0) console.log(`  skip: ${skipped}`);
}

main();
