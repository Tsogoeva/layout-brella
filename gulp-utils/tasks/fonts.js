import fs from 'fs';
import gulp from 'gulp';
import fonter from 'gulp-fonter-unx';
import ttf2woff2 from 'gulp-ttf2woff2';

import { path } from '../config/path.js';
import plugins from '../config/plugins.js';

export const ttfToWoff = () => gulp.src(`${path.src.fonts}*.ttf`) // Ищем файлы шрифтов .ttf
	// Уведомление ошибок
	.pipe(plugins.plumber(
		plugins.notify.onError({
			title: "FONTS",
			message: "Error: <%= error.message %>"
		})
	))
	// Конвертируем в .woff
	.pipe(fonter({
		formats: ['woff']
	}))
	// Выгружаем в папку с результатом
	.pipe(gulp.dest(`${path.build.fonts}`))
	// Ищем файлы шрифтов .ttf
	.pipe(gulp.src(`${path.src.fonts}*.ttf`))
	// Конвертируем в .woff2
	.pipe(ttf2woff2())
	// Выгружаем в папку с результатом
	.pipe(gulp.dest(`${path.build.fonts}`));


export const fontsStyle = () => {
	// Файл стилей подключения шрифтов
	let fontsFile = `${path.srcFolder}/scss/fonts.scss`;
	// Проверяем существуют ли файлы шрифтов
	fs.readdir(path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, создаем его
				fs.writeFile(fontsFile, '', cb);

				let newFileOnly;
				for (let i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

						switch (fontWeight.toLowerCase()) {
							case 'thin':
								fontWeight = 100;
								break;
							case 'extraligth':
								fontWeight = 200;
								break;
							case 'light':
								fontWeight = 300;
								break;
							case 'medium':
								fontWeight = 500;
								break;
							case 'semibold':
								fontWeight = 600;
								break;
							case 'bold':
								fontWeight = 700;
								break;
							case 'extrabold':
							case 'heavy':
								fontWeight = 800;
								break;
							case 'black':
								fontWeight = 900;
								break;
							default:
								fontWeight = 400;
								break;
						}

						fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
			}
		}
	});

	return gulp.src(path.srcFolder);
	function cb() { }
}
