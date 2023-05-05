import gulp from "gulp";

import { path } from './gulp-utils/config/path.js';

// Импорт задач
import copy from './gulp-utils/tasks/copy.js';
import reset from './gulp-utils/tasks/reset.js';
import html from './gulp-utils/tasks/html.js';
import scss from './gulp-utils/tasks/scss.js';
import js from './gulp-utils/tasks/js.js';
import image from './gulp-utils/tasks/image.js';
import svgSprite from './gulp-utils/tasks/svgSprite.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp-utils/tasks/fonts.js';
import server from './gulp-utils/tasks/server.js';

// Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, image);
}

export { svgSprite };

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, image));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// Выполнение сценария по умолчанию
gulp.task('default', dev);
