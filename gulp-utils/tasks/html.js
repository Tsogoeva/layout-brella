import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
import webpHtmlnoSvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';

import { path } from '../config/path.js';
import plugins from '../config/plugins.js';

export default () => gulp
	.src(path.src.html)
	.pipe(plugins.plumber(
		plugins.notify.onError({
			title: "HTML",
			message: "Error: <%= error.message %>"
		})
	))
	.pipe(fileinclude())
	.pipe(plugins.replace(/@img\//g, 'img/'))
	.pipe(webpHtmlnoSvg())
	.pipe(versionNumber({
		'value': '%DT%',
		'append': {
			'key': '_v',
			'cover': 0,
			'to': [
				'css',
				'js'
			]
		},
		'output': {
			'file': 'gulp-utils/version.json'
		}
	}))
	.pipe(gulp.dest(path.build.html))
	.pipe(plugins.browserSync.stream());
