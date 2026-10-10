import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';

const OUT_DIR = 'bundle';

await build({
  entryPoints: ['dist/main.js'],
  outfile: `${OUT_DIR}/main.js`,
  bundle: true,
  keepNames: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  // Some dependencies still call require(); this makes it available in ESM.
  banner: {
    js: "import { createRequire as __bundleCreateRequire } from 'node:module'; const require = __bundleCreateRequire(import.meta.url);",
  },
  // Optional packages NestJS and pg only load if you use those features.
  external: [
    '@nestjs/microservices',
    '@nestjs/microservices/*',
    '@nestjs/websockets',
    '@nestjs/websockets/*',
    '@fastify/static',
    'class-validator',
    'class-transformer',
    'class-transformer/*',
    'pg-native',
  ],
});

await writeFile(`${OUT_DIR}/package.json`, JSON.stringify({ type: 'module' }));
console.log(`Bundled backend into ${OUT_DIR}/main.js`);
