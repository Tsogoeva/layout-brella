import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //Сжатие css файла
import webpCss from 'gulp-webpcss'; // Вывод Webp изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа-запросов

import { path } from '../config/path.js';
import plugins from '../config/plugins.js';

const sass = gulpSass(dartSass);

export default () => gulp.src(path.src.scss, { sourcemaps: true })
	.pipe(plugins.plumber(
		plugins.notify.onError({
			title: "SCSS",
			message: "Error: <%= error.message %>"
		})
	))
	.pipe(plugins.replace(/@img\//g, '../img/'))
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(groupCssMediaQueries())
	.pipe(webpCss({
		webpClass: ".webp",
		noWebpClass: ".no-webp"
	}))
	.pipe(autoPrefixer({
		grid: true,
		overrideBrowserslist: ["last 3 versions"],
		cascade: true
	}))
	.pipe(gulp.dest(path.build.css)) // Выгружает не сжатый CSS
	.pipe(cleanCss())
	.pipe(rename({
		extname: ".min.css"
	}))
	.pipe(gulp.dest(path.build.css)) // ? { sourcemaps: true }
	.pipe(plugins.browserSync.stream());
