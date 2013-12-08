'use strict'

module.exports = ( grunt ) ->

	grunt.initConfig (
		closurecompiler:
			minify:
				files:
					'jconv.min.js': 'jconv.js'
			options:
				'compilation_level': 'SIMPLE_OPTIMIZATIONS'

		mochaTest:
			test:
				src: './test/unit.js'
	)

	grunt.loadNpmTasks 'grunt-closurecompiler'
	grunt.loadNpmTasks 'grunt-mocha-test'

	grunt.registerTask 'minify', ['closurecompiler:minify']
	grunt.registerTask 'test', ['mochaTest:test']

