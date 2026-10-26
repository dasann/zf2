import { execFileSync, spawnSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync, lstatSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';

const qualityDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(qualityDir);
process.chdir(root);
const profile = JSON.parse(readFileSync(path.join(qualityDir, 'profile.json'), 'utf8'));
const args = process.argv.slice(2);
const baseIndex = args.indexOf('--base');
const base = baseIndex === -1 ? process.env.BASE_SHA : args[baseIndex + 1];
const explicitIndex = args.indexOf('--files');
const prepare = args.includes('--prepare');

function git(...gitArgs) {
  return execFileSync('git', gitArgs, { cwd: root, encoding: 'utf8' });
}

function excluded(file) {
  const segments = file.split('/');
  return (
    segments.some((segment) =>
      [
        'node_modules',
        'vendor',
        '.git',
        '.next',
        '.astro',
        '.nuxt',
        '.output',
        '.vinxi',
        '.svelte-kit',
        'dist',
        'build',
        'coverage',
      ].includes(segment),
    ) ||
    /(?:^|\/)(?:package-lock\.json|composer\.lock|pnpm-lock\.yaml|yarn\.lock|bun\.lockb?)$/.test(
      file,
    ) ||
    /(?:\.min\.(?:js|css)|\.gen\.(?:ts|tsx))$/.test(file) ||
    profile.generatedPrefixes.some((prefix) => file.startsWith(prefix))
  );
}

let files;
if (explicitIndex !== -1) {
  files = args.slice(explicitIndex + 1);
} else if (args.includes('--all')) {
  files = git('ls-files', '-z').split('\0').filter(Boolean);
} else {
  if (!base || !/^[0-9a-f]{40,64}$/i.test(base)) {
    throw new Error('Supply --base <commit SHA>, BASE_SHA, --files <paths> or --all.');
  }
  const ancestor = git('merge-base', base, 'HEAD').trim();
  files = git('diff', '--name-only', '--diff-filter=ACMR', '-z', ancestor, 'HEAD')
    .split('\0')
    .filter(Boolean);
}

files = [...new Set(files)].filter((file) => {
  if (path.isAbsolute(file) || file.split('/').includes('..')) {
    throw new Error(`Invalid repository-relative path: ${file}`);
  }
  return (
    !excluded(file) &&
    existsSync(file) &&
    lstatSync(file).isFile() &&
    !lstatSync(file).isSymbolicLink()
  );
});
const typedFiles = files.filter((file) => /\.(?:ts|tsx|mts|cts|astro)$/.test(file));
const needsApp = profile.typed && typedFiles.length > 0;
if (prepare) {
  if (!process.env.GITHUB_OUTPUT) {
    throw new Error('GITHUB_OUTPUT is required for --prepare.');
  }
  appendFileSync(process.env.GITHUB_OUTPUT, `needs-app=${needsApp}\n`);
  console.log(
    `Scope: ${files.length} changed files; application dependencies required: ${needsApp}`,
  );
  process.exit(0);
}

for (const required of [
  'AGENTS.md',
  'CLAUDE.md',
  'CODING_STANDARDS.md',
  'docs/PROJECT_PROFILE.md',
  'docs/REVIEW_CHECKLIST.md',
]) {
  if (!existsSync(required)) {
    throw new Error(`Required instructions missing: ${required}`);
  }
}
const agents = readFileSync('AGENTS.md', 'utf8');
const claude = readFileSync('CLAUDE.md', 'utf8');
if (!agents.includes('Code Review Rules') || !agents.includes('CODING_STANDARDS.md')) {
  throw new Error('AGENTS.md must contain Code Review Rules and reference CODING_STANDARDS.md.');
}
if (!/^@CODING_STANDARDS\.md\s*$/m.test(claude)) {
  throw new Error('CLAUDE.md must import @CODING_STANDARDS.md outside a code block.');
}

let failed = false;
let formatCount = 0;
for (const file of files) {
  const extension = path.extname(file);
  if (
    ![
      '.js',
      '.mjs',
      '.cjs',
      '.jsx',
      '.ts',
      '.mts',
      '.cts',
      '.tsx',
      '.json',
      '.jsonc',
      '.css',
      '.scss',
      '.html',
      '.md',
      '.yml',
      '.yaml',
      '.astro',
    ].includes(extension)
  ) {
    continue;
  }
  if (extension === '.astro' && !profile.astro) {
    throw new Error('Astro source requires the Astro quality profile.');
  }
  const configuration = await prettier.resolveConfig(file);
  const options = {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    endOfLine: 'lf',
    ...configuration,
    filepath: file,
  };
  if (extension === '.astro') {
    const astro = await import('prettier-plugin-astro');
    options.plugins = [...(options.plugins ?? []), astro];
    options.parser = 'astro';
  }
  if (!(await prettier.check(readFileSync(file, 'utf8'), options))) {
    console.error(`FORMAT: ${file}`);
    failed = true;
  }
  formatCount += 1;
}

const lintFiles = files.filter((file) => /\.(?:js|mjs|cjs|jsx|ts|mts|cts|tsx|astro)$/.test(file));
if (lintFiles.length) {
  const { ESLint } = await import('eslint');
  const eslint = new ESLint({
    cwd: root,
    overrideConfigFile: path.join(qualityDir, 'eslint.config.mjs'),
  });
  const results = await eslint.lintFiles(lintFiles);
  const formatter = await eslint.loadFormatter('stylish');
  const output = formatter.format(results);
  if (output) {
    console.log(output);
  }
  if (results.some((result) => result.errorCount > 0 || result.warningCount > 0)) {
    failed = true;
  }
}

const phpFiles = files.filter((file) => /\.(?:php|phtml|inc)$/.test(file));
if (phpFiles.length) {
  if (!profile.php) {
    throw new Error('PHP source requires a PHP quality profile.');
  }
  const result = spawnSync(
    process.env.PHPCS_BIN || 'phpcs',
    [
      '--standard=.quality/phpcs.xml',
      '--runtime-set',
      'ignore_warnings_on_exit',
      '1',
      ...phpFiles.map((file) => path.resolve(root, file)),
    ],
    { cwd: root, stdio: 'inherit' },
  );
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    failed = true;
  }
}

console.log(
  `Coding standards: instructions checked; ${formatCount} formatted files, ${lintFiles.length} linted JS/TS/Astro files, ${phpFiles.length} PHP files.`,
);
console.log(
  'Scope: changed complete files (or explicitly selected files). Existing application checks remain required; this is not a functional acceptance test.',
);
process.exitCode = failed ? 1 : 0;
