import gulp from 'gulp';

const { src, dest } = gulp;

function fonts() {
  const { SOURCE_FOLDER, BUILD_FOLDER, FONTS_EXTENSIONS, ASSETS_FOLDER } = process.env;

  return src(SOURCE_FOLDER + `/${ASSETS_FOLDER}/fonts/**/*.{${FONTS_EXTENSIONS}}`).pipe(
    dest(BUILD_FOLDER + `/${ASSETS_FOLDER}/fonts`)
  );
}

export { fonts };
