// Single source of truth: the design-system tokens file. The site never
// hard-codes a hex value — every color, size, space, and radius is read from
// here at build time and emitted as a CSS custom property. Importing the JSON
// (rather than reading it by path) lets Vite inline it, so the loader keeps
// working after the build bundles and relocates this module.
import raw from '../../design-system/tokens.json';

// Token groups we expose as CSS variables, mapped to a variable prefix.
const groups = [
  ['color', 'color'],
  ['typography', 'type'],
  ['spacing', 'space'],
  ['radius', 'radius'],
  ['shadow', 'shadow'],
  ['layout', 'layout'],
];

// Recursively collect { value } leaves into `--prefix-path` entries.
// Keys named "comment"/"$schema"/"name"/"description" are ignored.
const SKIP = new Set(['comment', '$schema', 'name', 'description']);

function walk(node, path, out) {
  if (node && typeof node === 'object' && 'value' in node && typeof node.value === 'string') {
    out.push([path.join('-'), node.value]);
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, child] of Object.entries(node)) {
      if (SKIP.has(key)) continue;
      walk(child, [...path, key], out);
    }
  }
}

// Collect the base (dark) tokens from every top-level group.
const entries = [];
for (const [group, prefix] of groups) {
  if (raw[group]) walk(raw[group], [prefix], entries);
}

// Collect the light-theme overrides (raw.light mirrors a subset of the groups,
// reusing the same variable prefixes so only the flipped values are restated).
const lightEntries = [];
if (raw.light) {
  for (const [group, prefix] of groups) {
    if (raw.light[group]) walk(raw.light[group], [prefix], lightEntries);
  }
}

/** Flat map of cssVarName -> value, e.g. "color-accent-base" -> "#36D399". */
export const tokenMap = Object.fromEntries(entries);

function block(selector, list, ...extraDecls) {
  const lines = list.map(([name, value]) => `  --${name}: ${value};`);
  for (const decl of extraDecls) lines.push(`  ${decl};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
}

/**
 * CSS defining every token as a custom property. The base set lives in :root
 * (the dark theme); the light overrides apply under :root[data-theme='light'].
 * color-scheme is set per theme so native UI (scrollbars, form controls) follows.
 */
export function tokensCss() {
  const dark = block(':root', entries, 'color-scheme: dark');
  const light = block(":root[data-theme='light']", lightEntries, 'color-scheme: light');
  return `${dark}\n${light}`;
}

/** Convenience accessor used in component markup (e.g. token('color-accent-base')). */
export function token(name) {
  return tokenMap[name];
}
