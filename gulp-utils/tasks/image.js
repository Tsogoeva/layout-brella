import gulp from 'gulp';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

import { path } from '../config/path.js';
import plugins from '../config/plugins.js';

export default () => gulp.src(path.src.images)
	.pipe(plugins.plumber(
		plugins.notify.onError({
			title: "IMAGES",
			message: "Error: <%= error.message %>"
		})
	))
	.pipe(plugins.newer(path.build.images))
	.pipe(webp())
	.pipe(gulp.dest(path.build.images))
	.pipe(gulp.src(path.src.images))
	.pipe(plugins.newer(path.build.images))
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{ removeViewBox: false }],
		interlaced: true,
		optimizationLevel: 3 //0 to 7
	}))
	.pipe(gulp.dest(path.build.images))
	.pipe(gulp.src(path.src.svg))
	.pipe(gulp.dest(path.build.images))
	.pipe(plugins.browserSync.stream());