import gulp from 'gulp';
import uglify from 'gulp-uglify';
import webpackStream from 'webpack-stream';
import getConfig from '../webpack.config.mjs';

const { src, dest } = gulp;

const config = getConfig();

function js() {
  const { SOURCE_FOLDER, BUILD_FOLDER, SCRIPTS_FOLDER } = process.env;

  return src(SOURCE_FOLDER + `/${SCRIPTS_FOLDER}/*.js`)
    .pipe(webpackStream(config))
    .pipe(uglify())
    .pipe(dest(BUILD_FOLDER + '/js'));
}

export { js };
