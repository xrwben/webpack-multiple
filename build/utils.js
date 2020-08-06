const path = require("path");
const glob = require("glob");

// 获取入口文件
exports.getEntryFiles = function getEntryFiles (dir) {
	let entryFiles = {};
	let files = glob.sync(dir + "/**/*.js");
	files.forEach(file => {
		let ext = path.extname(file);
		let key = file.split("/src/js/")[1].split(ext)[0];
		// console.log(ext, file.split("/src/js/")[1].split(ext)[0], file)
		entryFiles[key] = file;
	})
	return entryFiles;
}
// getEntryFiles(path.resolve(__dirname, "../src/js/"))
