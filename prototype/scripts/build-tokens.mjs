// Génère styles/tokens.css à partir de ../design-system/tokens.json :
// variables CSS (couleurs, espacements, rayons, ombres, familles),
// @font-face des fichiers fournis et classes typographiques
// (.display-xl, .title-m, .body-s, .label, .numeral…) attendues par bundle.css.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dsDir = path.resolve(here, '../../design-system');
const outFile = path.resolve(here, '../styles/tokens.css');
const tokens = JSON.parse(readFileSync(path.join(dsDir, 'tokens.json'), 'utf8'));

const fontUrl = (file) => path.relative(path.dirname(outFile), path.join(dsDir, file)).split(path.sep).join('/');
const resolveAlias = (value) => value.replace(/^\{(.+)\}$/, 'var(--$1)');

const lines = [`/* Généré par scripts/build-tokens.mjs depuis design-system/tokens.json — ne pas modifier. */`, ''];

for (const f of tokens.type.fonts) {
  lines.push(
    `@font-face { font-family: "${f.family}"; src: url("${fontUrl(f.file)}") format("woff2"); font-weight: ${f.weight}; font-style: ${f.style}; font-display: swap; }`
  );
}

lines.push('', ':root {');
for (const t of tokens.color.tokens) lines.push(`  --${t.name}: ${resolveAlias(t.value)};`);
for (const group of ['spacing', 'radius', 'shadow']) {
  for (const t of tokens[group].tokens) lines.push(`  --${t.name}: ${t.value};`);
}
for (const [name, value] of Object.entries(tokens.type.families)) lines.push(`  --font-${name}: ${value};`);
lines.push('}', '');

const px = (v) => (typeof v === 'number' ? String(v) : v);
for (const group of tokens.type.groups) {
  for (const s of group.styles) {
    const decl = [
      `font-family: var(--font-${group.family})`,
      `font-size: ${s.fontSize}`,
      `line-height: ${px(s.lineHeight)}`,
      `font-weight: ${s.fontWeight}`,
    ];
    if (s.letterSpacing) decl.push(`letter-spacing: ${s.letterSpacing}`);
    if (s.fontStyle) decl.push(`font-style: ${s.fontStyle}`);
    lines.push(`.${s.name} { ${decl.join('; ')}; }`);
  }
}

mkdirSync(path.dirname(outFile), { recursive: true });
writeFileSync(outFile, lines.join('\n') + '\n');
console.log(`tokens.css généré (${path.relative(process.cwd(), outFile)})`);
