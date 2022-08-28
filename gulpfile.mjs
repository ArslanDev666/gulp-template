import dotEnv from 'dotenv';
import gulp from 'gulp';
import { html } from './gulp/html.mjs';
import { clear, assets } from './gulp/utils.mjs';
import { images } from './gulp/image.mjs';
import { scss } from './gulp/styles.mjs';
import { fonts } from './gulp/fonts.mjs';
import { serve } from './gulp/server.mjs';
import { js } from './gulp/js.mjs';
import lighthouseTask from './gulp/lighthouse.mjs';

const { series } = gulp;

dotEnv.config();

export const watch = series(clear, html, js, scss, images, fonts, assets, serve);
export const build = series(clear, html, js, scss, images, fonts, assets, lighthouseTask);
