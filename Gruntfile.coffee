'use strict'

module.exports = ( grunt ) ->

	grunt.initConfig (
		closurecompiler:
			minify:
				files:
					'jconv.min.js': 'jconv.js'
			options:
				'compilation_level': 'SIMPLE_OPTIMIZATIONS'
	)

	grunt.loadNpmTasks 'grunt-closurecompiler'
	grunt.registerTask 'minify', ['closurecompiler:minify']

