import gulp from 'gulp';
import include from 'gulp-file-include';
import gulpHtmlBemValidator from 'gulp-html-bem-validator';
import cacheBust from 'gulp-cache-bust';
import plumber from 'gulp-plumber';

const { src, dest } = gulp;

function html() {
  const { SOURCE_FOLDER, BUILD_FOLDER } = process.env;

  return src(SOURCE_FOLDER + '/**.html')
    .pipe(plumber())
    .pipe(include())
    .pipe(gulpHtmlBemValidator())
    .pipe(cacheBust({ type: 'timestamp' }))
    .pipe(dest(BUILD_FOLDER));
}

export { html };
