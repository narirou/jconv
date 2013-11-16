var fs    = require( 'fs' ),
	jconv = require( '../' );

function convertTest( from, to ) {
	var FROM = from.toUpperCase(),
		TO   = to.toUpperCase(),
		from = from.toLowerCase(),
		to   = to.toLowerCase();

	console.log( '[ ' + FROM + ' -> ' + TO + ' ]' );

	var buffer = fs.readFileSync( './input/' + from + '.txt' );

	var converted = jconv.convert( buffer, TO, FROM );

	fs.writeFileSync( './output/' + from + '-' + to + '.txt', converted );

	console.log( converted.toString() );
}

convertTest( 'UTF8', 'SJIS' );
convertTest( 'UTF8', 'JIS' );
convertTest( 'UTF8', 'EUCJP' );

convertTest( 'SJIS', 'UTF8' );
convertTest( 'SJIS', 'JIS' );
convertTest( 'SJIS', 'EUCJP' );

convertTest( 'JIS', 'UTF8' );
convertTest( 'JIS', 'SJIS' );
convertTest( 'JIS', 'EUCJP' );

convertTest( 'EUCJP', 'UTF8' );
convertTest( 'EUCJP', 'SJIS' );
convertTest( 'EUCJP', 'JIS' );
