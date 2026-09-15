import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const exists = (p) => fs.existsSync(path.join(root, p));
const errors = [];

const index = readJson('ai-index.json');
const manifest = readJson('ai-manifest.json');
const current = readJson('ai-current.json');
const publicPages = readJson('pages.json');

const isExternalTarget = (value) => value === 'fg79sw4nvw-dot/untold-game';
const normalizeHeading = (line) => line
  .replace(/^#+\s*/, '')
  .trim()
  .replace(/^\d+\.\s*/, '');

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
      .map(normalizeHeading)
  );
  for (const heading of headings) {
    if (!actualHeadings.has(normalizeHeading(heading))) {
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

const pageSlugs = new Set();
for (const page of publicPages.pages ?? []) {
  if (!page?.slug || !page?.path) {
    errors.push('pages.json contains a page without slug/path');
    continue;
  }
  if (pageSlugs.has(page.slug)) errors.push(`pages.json duplicate slug: ${page.slug}`);
  pageSlugs.add(page.slug);
  if (!exists(page.path)) errors.push(`pages.json missing page target: ${page.slug} -> ${page.path}`);
  for (const image of page.images ?? []) {
    if (!exists(image)) errors.push(`pages.json missing image target: ${page.slug} -> ${image}`);
  }
}

// Resume safety checks: current development spans several canonical pages.
// These assertions prevent later router cleanup from accidentally reducing
// "resume / what next" navigation back to an incomplete early-flow view.
const requiredCurrentSources = {
  openingSequence: 'pages/development/eld-opening-sequence.md',
  day2HomeTutorial: 'pages/development/day2-home-tutorial.md',
  firstQuest: 'pages/cards/055-book-eating-rat.md',
  protagonistHome: 'pages/world/protagonist-home.md',
};
for (const [name, expected] of Object.entries(requiredCurrentSources)) {
  if (current.sources?.[name] !== expected) {
    errors.push(`ai-current resume source mismatch: ${name} -> expected ${expected}`);
  }
}

const requiredEarlyFlowTargets = [
  'pages/development/eld-opening-sequence.md',
  'pages/development/day2-home-tutorial.md',
  'pages/cards/055-book-eating-rat.md',
  'pages/world/protagonist-home.md',
];
const earlyFlowTargets = new Set(index.routes?.['opening-early-eld'] ?? []);
for (const target of requiredEarlyFlowTargets) {
  if (!earlyFlowTargets.has(target)) {
    errors.push(`ai-index opening-early-eld missing resume target: ${target}`);
  }
}

const requiredIntroTargets = new Set(index.routes?.['required-introduction-day1-day2'] ?? []);
for (const target of requiredEarlyFlowTargets) {
  if (!requiredIntroTargets.has(target)) {
    errors.push(`ai-index required-introduction-day1-day2 missing target: ${target}`);
  }
}

if (!Array.isArray(index.routes?.['current-milestone-next-step'])) {
  errors.push('ai-index missing current-milestone-next-step route');
}

const productionWorkflow = 'pages/development/production-workflow.md';
if (current.sources?.productionWorkflow !== productionWorkflow) {
  errors.push(`ai-current productionWorkflow mismatch: expected ${productionWorkflow}`);
}
const productionTargets = new Set(index.routes?.['production-delivery-workflow'] ?? []);
for (const target of [productionWorkflow, 'pages/development/implementation-status.md', 'fg79sw4nvw-dot/untold-game']) {
  if (!productionTargets.has(target)) {
    errors.push(`ai-index production-delivery-workflow missing target: ${target}`);
  }
}
if (!pageSlugs.has('production-workflow')) {
  errors.push('pages.json missing public production-workflow page');
}

for (const required of ['AGENTS.md', 'ai-index.json', 'ai-current.json', 'ai-manifest.json', 'pages/chatgpt-guide.md', productionWorkflow]) {
  if (!exists(required)) errors.push(`required AI routing file missing: ${required}`);
}

if (errors.length) {
  console.error('AI routing validation failed:\n' + errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}

console.log('AI routing validation passed.');
