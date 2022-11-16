const { execSync } = require('child_process');
const { stat, renameSync, readFile, unlink, writeFile } = require('fs');
const { resolve, join } = require('path');
const { readdir } = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

(async () => {
  for await (const f of getFiles('src')) {
    if (f.endsWith('.js')) {
      renameSync(f, f.slice(0, -3).concat('.jsx'));
    }
  }

  let packageManager = 'npm';
  stat('yarn.lock', (err, stats) => {
    if (!err) {
      packageManager = 'yarn';
    }
  });

  stat(join('public', 'index.html'), (err, stats) => {
    if (!err) {
      readFile(join('public', 'index.html'), (err, data) => {
        if (err) throw err;
        writeFile(
          'index.html',
          data
            .toString()
            .replaceAll('%PUBLIC_URL%', '')
            .replace(
              `<div id="root"></div>`,
              `<div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>`
            ),
          err => {
            if (err) throw err;
          }
        );
        unlink(join('public', 'index.html'), err => {
          if (err) throw err;
        });
      });
    }
  });

  writeFile(
    'vite.config.js',
    `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
  
export default ({ mode }) => {
    return defineConfig({
        plugins: [react()],
        define: {
            "process.env.NODE_ENV": \`"\${mode}"\`,
        }
    })
}`,
    err => {
      if (err) throw err;
    }
  );

  if (packageManager == 'npm') {
    execSync('npm i vite @vitejs/plugin-react --save-dev', {
      stdio: [0, 1, 2],
    });
  } else if (packageManager == 'yarn') {
    execSync('yarn add vite @vitejs/plugin-react -D', { stdio: [0, 1, 2] });
  }

  stat('.env', (err, stats) => {
    if (!err) {
      readFile('.env', (err, data) => {
        if (err) throw err;
        writeFile(
          '.env',
          data.toString().replaceAll('REACT_APP_', 'VITE_'),
          err => {
            if (err) throw err;
          }
        );
      });
    }
  });

  readFile('package.json', (err, data) => {
    if (err) throw err;
    let package = JSON.parse(data);
    package.scripts.start = 'vite';
    package.scripts.build = 'vite build --outDir build';

    writeFile('package.json', JSON.stringify(package, null, 2), err => {
      if (err) throw err;
    });
  });

  console.log(
    '\nConvert all process.env to import.meta.env as its how vite exposes environment variables. Refer to https://vitejs.dev/guide/env-and-mode.html'
  );

  const readline = require('readline');
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  prompt.question('\nPerform PWA migration to Vite? [Y/n] ', answer => {
    if (answer == 'Y') {
      if (packageManager == 'npm') {
        execSync('npm i vite-plugin-pwa -D', { stdio: [0, 1, 2] });
      } else if (packageManager == 'yarn') {
        execSync('yarn add vite-plugin-pwa -D', { stdio: [0, 1, 2] });
      }

      let pwa = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

export default ({ mode }) => {
    return defineConfig({
        plugins: [react(),VitePWA({ registerType: 'autoUpdate' })],
        define: {
            "process.env.NODE_ENV": \`"\${mode}"\`,
        }
    })
}`;
      writeFile('vite.config.js', pwa, err => {
        if (err) throw err;
      });
    }
    prompt.close();
  });
})();
