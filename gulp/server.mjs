import BrowserSync from 'browser-sync';
import gulp from 'gulp';
import { fonts } from './fonts.mjs';
import { html } from './html.mjs';
import { images } from './image.mjs';
import { js } from './js.mjs';
import { scss } from './styles.mjs';

const sync = BrowserSync.create();
const { watch, series } = gulp;

function serve() {
  const { SOURCE_FOLDER, BUILD_FOLDER, SASS_EXTENSIONS, IMAGE_FOLDER, ASSETS_FOLDER, SCRIPTS_FOLDER } = process.env;

  sync.init({
    port: 3010,
    reloadOnRestart: true,
    server: {
      baseDir: BUILD_FOLDER,
      directory: true,
    },
  });

  watch(SOURCE_FOLDER + '/**/*.html', series(html)).on('change', sync.reload);
  watch(SOURCE_FOLDER + `/${SASS_EXTENSIONS}/**/*.${SASS_EXTENSIONS}`, series(scss)).on('change', sync.reload);
  watch(SOURCE_FOLDER + `/${SCRIPTS_FOLDER}/**/*.js`, series(js)).on('change', sync.reload);
  watch(SOURCE_FOLDER + `/${ASSETS_FOLDER}/${IMAGE_FOLDER}/**/*`, series(images)).on('change', sync.reload);
  watch(SOURCE_FOLDER + '/fonts/**/*', series(fonts)).on('change', sync.reload);
}

export { serve };
