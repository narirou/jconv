/*! -------------------------------------------------------

	Function Performance Checker

	Copyright (c) 2013 narirou

 ------------------------------------------------------- */

'use strict';

var stopwatch = function( arg1, arg2 ) {
	if( ! arguments.length ) {
		stopwatch.run();
	}
	else {
		var type = typeof arg1;
		if( type === 'number' ) {
			stopwatch.run( arg1 );
		}
		else if( type === 'object' || type === 'function' ) {
			stopwatch.add( arg1, arg2 );
		}
		else {
			throw new Error( 'Invalid Arguments.' );
		}
	}

	return stopwatch;
};

stopwatch.exps = {};

stopwatch.results = {};

stopwatch.textLog = '';

stopwatch.add = function ( arg1, arg2 ) {
	var defaultName = function() {
		return 'func-' + ( Object.keys( stopwatch.exps ).length + 1 );
	};
	var ensureName = function( name ) {
		name = name || defaultName();
		return ( typeof name === 'string' ) ? name : defaultName();
	};
	var ensureFunc = function( func ) {
		return ( typeof func === 'function' ) ? func : undefined;
	};
	var name,
		func,
		type = typeof arg1;

	if( type === 'object' ) {
		name = ensureName( arg1.name );
		func = ensureFunc( arg1.func );

		stopwatch.exps[ name ] = func;
	}
	else if( type === 'function' ){
		name = defaultName();
		func = arg1;

		stopwatch.exps[ name ] = func;
	}
	else if( type === 'string' && typeof arg2 === 'function' ) {
		name = ensureName( arg1 );
		func = arg2;

		stopwatch.exps[ name ] = func;
	}

	return stopwatch;
};

stopwatch.run = function ( loop ) {
	var exps = stopwatch.exps;
	if( ! exps ) return;

	loop = loop || 1;

	for( var key in exps ) {
		var func  = exps[ key ],
			start = 0,
			end   = 0,
			i     = 0;

		if( ! func ) {
			stopwatch.results[ key ] = 0;
			continue;
		}

		start = new Date();
		for( ; i < loop; i++ ) {
			func();
		}
		end   = new Date();

		stopwatch.results[ key ] = end.getTime() - start.getTime();
	}

	for( var key in stopwatch.results ) {
		stopwatch.textLog += key + ' : \t' + stopwatch.results[ key ] + ' ms.\n';
	}

	return stopwatch;
};

stopwatch.show = function() {
	if( ! stopwatch.textLog ) return;

	console.log( stopwatch.textLog );

	return stopwatch;
};

stopwatch.reset = function() {
	stopwatch.exps = {};
	stopwatch.results = {};
	stopwatch.textLog = '';

	return stopwatch;
};

module.exports = stopwatch;
