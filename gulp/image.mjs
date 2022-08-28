import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminSvgo from 'imagemin-svgo';
import plumber from 'gulp-plumber';

const { src, dest } = gulp;

function images() {
  const { SOURCE_FOLDER, BUILD_FOLDER, IMAGE_FOLDER, ASSETS_FOLDER, IMAGE_EXTENSIONS } = process.env;

  const sourceImageFolder = SOURCE_FOLDER + `/${ASSETS_FOLDER}` + `/${IMAGE_FOLDER}`;
  const buildImageFolder = BUILD_FOLDER + `/${ASSETS_FOLDER}` + `/${IMAGE_FOLDER}`;

  return src(sourceImageFolder + `/**/*.{${IMAGE_EXTENSIONS}}`)
    .pipe(plumber())
    .pipe(dest(buildImageFolder + '/full-size'))
    .pipe(imagemin([imageminSvgo({ plugins: ['removeDimensions'] })], { verbose: true }))
    .pipe(dest(buildImageFolder));
}

export { images };
