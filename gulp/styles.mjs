import CleanCSS from 'gulp-clean-css';
import sass from 'gulp-dart-sass';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';

const { src, dest } = gulp;

function scss() {
  const { SOURCE_FOLDER, NODE_ENV, BUILD_FOLDER, SASS_EXTENSIONS } = process.env;

  return src(
    SOURCE_FOLDER + `/${SASS_EXTENSIONS}/*.${SASS_EXTENSIONS}`,
    SOURCE_FOLDER + `/${SASS_EXTENSIONS}/utils/fonts.${SASS_EXTENSIONS}`,
  )
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ sourceMap: true }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulpIf(NODE_ENV === 'production', CleanCSS({ level: 2 })))
    .pipe(dest(BUILD_FOLDER + '/css'));
}

export { scss };
