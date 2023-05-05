import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { path } from '../config/path.js';
import plugins from '../config/plugins.js';

export default () => gulp.src(path.src.svgicons, {})
	.pipe(plugins.plumber(
		plugins.notify.onError({
			title: "SVG",
			message: "Error: <%= error.message %>"
		})
	))
	.pipe(svgSprite({
		mode: {
			stack: {
				sprite: '../icons/icons.svg',
				// Создавать страницу с перечнем иконок
				example: true
			}
		}
	}))
	.pipe(gulp.dest(path.build.images));
