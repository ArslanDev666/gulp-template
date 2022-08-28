import { deleteAsync } from 'del';
import gulp from 'gulp';

const { src, dest } = gulp;

async function clear() {
  await deleteAsync(process.env.BUILD_FOLDER);
}

function assets() {
  const { SOURCE_FOLDER, BUILD_FOLDER } = process.env;
  return src(SOURCE_FOLDER + `/.htaccess`).pipe(dest(BUILD_FOLDER));
}

export { clear, assets };
