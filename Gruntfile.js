var fs = require("fs");
var wrench = require("wrench");

function moveFilesToSampleProject() {
	wrench.copyDirSyncRecursive("source", "test_app/node_modules/lb_cms", {
		forceDelete: true
	});
}

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		shell: {
			sampleapp: {
				command: "node test_app/app.js"
			},
			test: {
				command: "mocha test_app/node_modules/lb_cms/test --reporter spec"
			}
		}
	});

	grunt.registerTask("default", function () {
		moveFilesToSampleProject();
	});

	grunt.registerTask("sampleapp", function () {
		moveFilesToSampleProject();

		grunt.task.run("shell");
	});

	grunt.registerTask("mocha", function () {
		moveFilesToSampleProject();

		grunt.task.run("shell:test");
	});

	grunt.loadNpmTasks("grunt-shell");
};