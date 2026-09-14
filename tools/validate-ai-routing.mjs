import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const exists = (p) => fs.existsSync(path.join(root, p));
const errors = [];

const index = readJson('ai-index.json');
const manifest = readJson('ai-manifest.json');
const current = readJson('ai-current.json');

const isExternalTarget = (value) => value === 'fg79sw4nvw-dot/untold-game';

for (const [route, targets] of Object.entries(index.routes ?? {})) {
  if (!Array.isArray(targets) || targets.length === 0) {
    errors.push(`ai-index route has no targets: ${route}`);
    continue;
  }
  for (const target of targets) {
    if (!isExternalTarget(target) && !exists(target)) {
      errors.push(`ai-index missing target: ${route} -> ${target}`);
    }
  }
}

for (const [file, headings] of Object.entries(index.sectionHints ?? {})) {
  if (!exists(file)) {
    errors.push(`ai-index sectionHints file missing: ${file}`);
    continue;
  }
  const lines = fs.readFileSync(path.join(root, file), 'utf8').split(/\r?\n/);
  const actualHeadings = new Set(
    lines
      .filter((line) => line.startsWith('#'))
      .map((line) => line.replace(/^#+\s*/, '').trim())
  );
  for (const heading of headings) {
    if (!actualHeadings.has(heading)) {
      errors.push(`ai-index heading missing: ${file} -> ${heading}`);
    }
  }
}

for (const route of manifest.routing ?? []) {
  for (const target of [...(route.primary ?? []), ...(route.secondary ?? [])]) {
    if (!isExternalTarget(target) && !exists(target)) {
      errors.push(`ai-manifest missing target: ${route.topic} -> ${target}`);
    }
  }
  if (route.context && !exists(route.context)) {
    errors.push(`ai-manifest missing context file: ${route.topic} -> ${route.context}`);
  }
}

for (const [name, target] of Object.entries(current.sources ?? {})) {
  if (!exists(target)) errors.push(`ai-current missing source: ${name} -> ${target}`);
}
if (current.currentMilestone?.source && !exists(current.currentMilestone.source)) {
  errors.push(`ai-current milestone source missing: ${current.currentMilestone.source}`);
}

for (const required of ['AGENTS.md', 'ai-index.json', 'ai-current.json', 'ai-manifest.json', 'pages/chatgpt-guide.md']) {
  if (!exists(required)) errors.push(`required AI routing file missing: ${required}`);
}

if (errors.length) {
  console.error('AI routing validation failed:\n' + errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}

console.log('AI routing validation passed.');
