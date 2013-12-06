'use strict'

module.exports = ( grunt ) ->

	grunt.initConfig (
		closurecompiler:
			build:
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

	grunt.registerTask 'build', ['closurecompiler:build']
	grunt.registerTask 'test', ['mochaTest:test']

