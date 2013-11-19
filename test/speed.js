var fs        = require( 'fs' ),
	Benchmark = require( 'benchmark' ),
	jconv     = require( __dirname + '/../jconv.min' ),
	Iconv     = require( 'iconv' ).Iconv;

var inputPath  = __dirname + '/input/KOKORO/',
	chartPath  = __dirname + '/chart/';

var buffers = {
	'SJIS' : fs.readFileSync( inputPath + '/sjis.txt' ),
	'UTF8' : fs.readFileSync( inputPath + '/utf8.txt' ),
	'JIS'  : fs.readFileSync( inputPath + '/jis.txt' ),
	'EUCJP': fs.readFileSync( inputPath + '/eucjp.txt' ),
};

var logs = {};

var logText = '';

function speedTest( from, to ) {
	var FROM    = from.toUpperCase(),
		TO      = to.toUpperCase(),
		from    = from.toLowerCase(),
		to      = to.toLowerCase(),
		fixFROM = ( FROM === 'JIS'  ) ? 'ISO-2022-JP-1' :
	              ( FROM === 'SJIS' ) ? 'CP932' : FROM,
	    fixTO   = ( TO === 'JIS'  ) ? 'ISO-2022-JP-1' :
	              ( TO === 'SJIS' ) ? 'CP932' : TO;

	var _jconv  = jconv;
	var _iconv  = new Iconv( fixFROM, fixTO + '//TRANSLIT//IGNORE' );
	var buffer  = buffers[ FROM ];
	var title   = '[ ' + FROM + ' -> ' + TO + ' ]';

	log( title );

	new Benchmark.Suite
		.add( 'jconv', function() {
			_jconv.convert( buffer, FROM, TO );
		})
		.add( 'iconv', function() {
			_iconv.convert( buffer );
		})
		.on( 'cycle', function( event ) {
			log( String( event.target ) );
		})
		.on( 'complete', function() {
			var text = 'Fastest is ' + this.filter( 'fastest' ).pluck( 'name' );
			var results = this.filter( 'successful' );
			var logData = {};

			for( var i = 0, len = results.length; i < len; i++ ) {
				var result = results[ i ];
				logData[ result.name ] = result.hz;
			}
			logs[ title ] = logData;

			log( text );
		})
		.run({
			async: false
		});
}

function log( text ) {
	logText += text + '\n';
	console.log( text );
}

function writeLog() {
	var outputString = 'var speedLog = \'' + JSON.stringify( logs ) + '\';';
	fs.writeFileSync( chartPath + 'speedLog.js', outputString );
	fs.writeFileSync( chartPath + 'speedLog.txt', logText );
}

speedTest( 'UTF8', 'SJIS' );
speedTest( 'UTF8', 'JIS' );
speedTest( 'UTF8', 'EUCJP' );

speedTest( 'SJIS', 'UTF8' );
speedTest( 'SJIS', 'JIS' );
speedTest( 'SJIS', 'EUCJP' );

speedTest( 'JIS', 'UTF8' );
speedTest( 'JIS', 'SJIS' );
speedTest( 'JIS', 'EUCJP' );

speedTest( 'EUCJP', 'UTF8' );
speedTest( 'EUCJP', 'SJIS' );
speedTest( 'EUCJP', 'JIS' );

writeLog();
