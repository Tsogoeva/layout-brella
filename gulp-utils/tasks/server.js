import plugins from '../config/plugins.js';
import { path } from '../config/path.js';

export default (done) => {
	plugins.browserSync.init({
		server: {
			baseDir: `${path.build.html}`
		},
		notify: false,
		port: 3000
	});
}