import { promises as fs, writeFileSync } from 'fs';
import BrowserSync from 'browser-sync';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import path from 'path';

const server = BrowserSync.create();

const _lighthouse = {
  reportPath: process.env.BUILD_FOLDER + '/reports',
  PORT: 8080,
  chromeLauncherPort: 9222,
  config: {
    extends: 'lighthouse:default',
  },
  flags: {
    chromeFlags: ['--show-paint-rects'],
    output: 'html',
  },
};

async function getNameHTMLFiles() {
  const files = await fs.readdir(process.env.BUILD_FOLDER);

  return files.filter((item) => item.endsWith('.html'));
}

async function launchChromeAndRunLighthouse(url) {
  const chrome = await launch({
    chromeFlags: ['--headless', '--disable-extensions'],
    ignoreDefaultFlags: true,
    userDataDir: '',
  });

  _lighthouse.chromeLauncherPort = chrome.port;

  const runnerResult = await lighthouse(
    url,
    {
      ..._lighthouse.flags,
      port: _lighthouse.chromeLauncherPort,
    },
    _lighthouse.config,
  );

  const result = runnerResult.report;

  await chrome.kill();

  return result;
}

async function runLighthouse(file) {
  const fileName = path.parse(file).name;
  const result = await launchChromeAndRunLighthouse(`http://localhost:${_lighthouse.PORT}/${file}`);

  writeFileSync(`${_lighthouse.reportPath}/${fileName}-report.html`, result);
}

export default async function lighthouseTask(cb) {
  await fs.mkdir(_lighthouse.reportPath);

  server.init({
    server: process.env.BUILD_FOLDER,
    port: _lighthouse.PORT,
    notify: false,
    open: false,
    cors: true,
    logSnippet: false,
    logLevel: 'silent',
  });

  const files = await getNameHTMLFiles();

  try {
    for (const file of files) {
      await runLighthouse(file);
    }

    cb();
    process.exit(0);
  } catch (e) {
    cb(e.message);
    process.exit(1);
  }
}
