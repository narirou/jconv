var fs        = require( 'fs' ),
	Benchmark = require( 'benchmark' );

var jconv     = require( '../jconv.min' ),
	Iconv     = require( 'iconv' ).Iconv;

var buffers = {
	'SJIS' : fs.readFileSync( './input/kokoro-sjis.txt' ),
	'UTF8' : fs.readFileSync( './input/kokoro-utf8.txt' ),
	'JIS'  : fs.readFileSync( './input/kokoro-jis.txt' ),
	'EUCJP': fs.readFileSync( './input/kokoro-eucjp.txt' ),
};

var logs = {};
var logText = '';

function speedTest( from, to ) {
	var FROM    = from.toUpperCase(),
		TO      = to.toUpperCase(),
		from    = from.toLowerCase(),
		to      = to.toLowerCase();

	var fixFROM = ( FROM === 'JIS'  ) ? 'ISO-2022-JP-1' :
	              ( FROM === 'SJIS' ) ? 'CP932' : FROM;

	var fixTO   = ( TO === 'JIS'  ) ? 'ISO-2022-JP-1' :
	              ( TO === 'SJIS' ) ? 'CP932' : TO;

	var _jconv  = jconv;
	var _iconv  = new Iconv( fixFROM, fixTO + '//TRANSLIT//IGNORE' );

	var buffer  = buffers[ FROM ];
	var title   = '[ ' + FROM + ' -> ' + TO + ' ]';

	log( title );

	var suite = new Benchmark.Suite;
	suite
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
	fs.writeFileSync( './chart/speedLog.js', outputString );
	fs.writeFileSync( './chart/speedLog.txt', logText );
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
