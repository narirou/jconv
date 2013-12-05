'use strict'

module.exports = ( grunt ) ->

	grunt.initConfig (
		closurecompiler:
			build:
				files:
					'jconv.min.js': 'jconv.js'
			options:
				'compilation_level': 'SIMPLE_OPTIMIZATIONS'
	)

	grunt.loadNpmTasks 'grunt-closurecompiler'

	grunt.registerTask 'default', ['closurecompiler:build']
