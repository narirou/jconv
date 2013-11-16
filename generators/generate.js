/* -------------------------------------------------------

	Generate
	Unicode Mapping Table

	SJIS  <-> UNICODE
	JIS   <-> UNICODE
	EUCJP <-> UNICODE

------------------------------------------------------- */

'use strict';

var fs         = require( 'fs' ),
	async      = require( 'async' ),
	LineReader = require( './linereader' ).LineReader;

var files = {
	'SJIS': [
		'./sources/CP932.TXT',
		'./sources/CP932-ADD.TXT'
	],
	'JIS': [
		'./sources/JISMS.TXT',
		'./sources/JIS0208.TXT',
		'./sources/JIS0208-ADD.TXT',
	],
	'JISEXT': [
		'./sources/JIS0212.TXT',
		'./sources/JIS0212-ADD.TXT'
	]
};

var outputPath = '../tables/';

var COMMENT = /^#/,
	FORMAT  = /^(U\+|0x|\d\-)([0-9A-Fa-f]+)/;

function generate( key ) {
	var sources       = files[ key ],
		table         = {},
		tableInverted = {},
		ws            = fs.createWriteStream( outputPath + key + '.js' ),
		wsInverted    = fs.createWriteStream( outputPath + key + 'Inverted.js' );

	async.eachSeries( sources, function( source, next ) {
		var rs     = fs.createReadStream( source ),
			reader = new LineReader( rs );

		reader.on( 'line', function( line ) {
			if( ! line || COMMENT.test( line ) ) {
				return;
			}

			var data = line.split( '\t' );
			if( ! data ) {
				return;
			}

			var code;
			var unicode;

			switch( key ) {
				case 'SJIS':
					code    = to16bitNumeric( data[ 0 ] );
					unicode = to16bitNumeric( data[ 1 ] );
					if( code < 0x80 || 0xA0 <= code && code <= 0xDF ) {
						return;
					}
				break;

				case 'JIS':
					if( /JIS0208\.TXT/i.test( source ) ) {
						code    = to16bitNumeric( data[ 1 ] );
						unicode = to16bitNumeric( data[ 2 ] );
					}
					else {
						code    = to16bitNumeric( data[ 0 ] );
						unicode = to16bitNumeric( data[ 1 ] );
					}
				break;

				default:
					code    = to16bitNumeric( data[ 0 ] );
					unicode = to16bitNumeric( data[ 1 ] );
				break;
			}

			if( unicode !== null && table[ code ] === undefined ) {
				table[ code ] = unicode;
			}
			if( code !== null && tableInverted[ unicode ] === undefined ) {
				tableInverted[ unicode ] = code;
			}
		});

		reader.on( 'end', function() {
			next();
		});

	}, function( error ) {

		ws.write( toTableString( table ) );
		wsInverted.write( toTableString( tableInverted ) );

		console.log( key + ' table created.' );
	});
}

function to16bitNumeric( str ) {
	var formated = FORMAT.exec( str );
	if( formated ) {
		return parseInt( '0x' + formated[2], 16 );
	}
	else {
		return null;
	}
}

function toTableString( obj ) {
	return 'module.exports=' + JSON.stringify( obj ).replace( /"/g, '' );
}

// Run
for( var key in files ) {
	generate( key );
}
