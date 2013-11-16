/* -------------------------------------------------------

	Generate
	Windows Dependent Characters ( JIS ) vs
	Unicode Mapping Table Source

	JIS <-> UNICODE

------------------------------------------------------- */

'use strict';

var fs         = require( 'fs' ),
	LineReader = require( './linereader' ).LineReader;

var input   = './sources/CP932.TXT',
	output  = './sources/JISMS.TXT',
	extFile = './sources/IBM.TXT';

var COMMENT = /^#/,
	FORMAT  = /^(U\+|0x|0X|\d\-)([0-9A-Fa-f]+)/;

var extCodeTable = {};

// IBM extensions convert to the otheres.
function createExtCodeTable() {
	var ext = fs.readFileSync( extFile );
	var lines = ext.toString().split( '\n' );

	lines.forEach( function( line ) {
		if( ! line || COMMENT.test( line ) ) {
			return;
		}

		var data = line.split( '\t' );
		if( ! data ) {
			return;
		}

		var before = to16bitString( to16bitNumeric( data[2] ) );
		var after  = to16bitString( to16bitNumeric( data[0] ) );
		var comment = data[3].toUpperCase()　+　'\n';

		extCodeTable[ before ] = after;
		extCodeTable[ before + '-comment' ] = comment;
	});
}

function generateJISMS( key ) {
	var outputString  = '',
		ws            = fs.createWriteStream( output ),
		rs            = fs.createReadStream( input ),
		reader        = new LineReader( rs );

	reader.on( 'line', function( line ) {
		if( ! line || COMMENT.test( line ) ) {
			return;
		}

		var data = line.split( '\t' );
		if( ! data ) {
			return;
		}

		var code = to16bitNumeric( data[0] );
		var unicode = to16bitNumeric( data[1] );

		// NEC EXTENSION
		// NEC's Slect IBM EXTENSION
		if( 0x8740 <= code && code <= 0x879C ||
			0xED40 <= code && code <= 0xEEFC ) {

			var comment = data[2];

			code = SJIStoJIS( code );
			outputString += [ to16bitString( code ), to16bitString( unicode ), comment ].join( '\t' );
		}

		// IBM EXTENSION
		// This group is not exists in ISO-2022-JP Mapping Table.
		// So convert to the other if possible.
		else if( 0xFA40 <= code && code <= 0xFC4B ) {

			var ext = extCodeTable[ data[0] ];
			var comment = extCodeTable[ data[0] + '-comment' ];

			if( ext ) {
				code = to16bitNumeric( ext );
				code = SJIStoJIS( code );
				outputString += [ to16bitString( code ), to16bitString( unicode ), comment ].join( '\t' );
			}
		}
	});

	reader.on( 'end', function() {
		ws.write( outputString );
		console.log( 'JISMS source created.' );
	});
}

function to16bitString( num ) {
	if( typeof num !== 'number' ) {
		return;
	}
	if( num === null ) {
		return '';
	}
	else {
		return '0x' + num.toString( 16 ).toUpperCase();
	}
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

// SJIS CharCode To JIS CharCode
function SJIStoJIS( sjis ) {
	var b1 = sjis >> 8;
	var b2 = sjis & 0xFF;

	if( 0xA1 <= b1 && b1 <= 0xDF ) {
		return b1 - 0x80;
	}
	else if( b1 >= 0x80 ) {
		b1 <<= 1;

		if( b2 < 0x9F ) {
			if( b1 < 0x13F ) {
				b1 -= 0xE1;
			}
			else {
				b1 -= 0x61;
			}
			if( b2 > 0x7E ) {
				b2 -= 0x20;
			}
			else {
				b2 -= 0x1F;
			}
		}
		else {
			if( b1 < 0x13F ) {
				b1 -= 0xE0;
			}
			else {
				b1 -= 0x60;
			}
			b2 -= 0x7E;
		}

		b1 = b1 & 0xFF;

		return ( b1 << 8 ) + b2;
	}
	else {
		return b1;
	}
}

// Run
createExtCodeTable();

generateJISMS();


