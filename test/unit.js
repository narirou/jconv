'use strict';

var fs       = require( 'fs' ),
	should   = require( 'should' ),
	jconv    = require( __dirname + '/../' ),
	jconvMin = require( __dirname + '/../jconv.min' );

function getBuffer( type, name ) {
	var filePath = __dirname + '/input/' + type + '/' + name + '.TXT';
	return fs.readFileSync( filePath );
}

function check( type, from, to ) {
	var toBuf = getBuffer( type, to );
	var fromBuf = getBuffer( type, from );

	// jconv
	it( '#' + from + '->' + to, function() {
		var convertedBuf = jconv.convert( fromBuf, from, to );

		should( convertedBuf ).eql( toBuf );
	});

	// jconv.min
	it( '#' + from + '->' + to + '( jconv.min )', function() {
		var convertedBuf = jconvMin.convert( fromBuf, from, to );

		should( convertedBuf ).eql( toBuf );
	});
}

// jconv.encodingExists
describe( 'jconv.encodingExists', function() {
	it( '# exists', function() {
		var result = jconv.encodingExists( 'UTF8' );

		should( result ).eql( true );
	});

	it( '# not exists', function() {
		var result = jconv.encodingExists( 'BIG5' );

		should( result ).eql( false );
	});

	it( '# not exists', function() {
		var result = jconv.encodingExists( '' );

		should( result ).eql( false );
	});
});

// jconv.decode, jconv.encode
describe( 'jconv.decode, jconv.encode', function() {
	it( '# should work properly', function() {
		var inputString = '君よ知るや南の国';
		var jisBuffer = jconv.encode( inputString, 'JIS' );
		var utfString = jconv.decode( jisBuffer, 'JIS' );

		should( utfString ).eql( inputString );
	});
});

// KANJI
// あ	亜	弌
describe( 'jconv.convert KANJI', function() {
	check( 'KANJI', 'UTF8', 'SJIS' );
	check( 'KANJI', 'UTF8', 'JIS' );
	check( 'KANJI', 'UTF8', 'EUCJP' );

	check( 'KANJI', 'SJIS', 'UTF8' );
	check( 'KANJI', 'SJIS', 'JIS' );
	check( 'KANJI', 'SJIS', 'EUCJP' );

	check( 'KANJI', 'JIS', 'UTF8' );
	check( 'KANJI', 'JIS', 'SJIS' );
	check( 'KANJI', 'JIS', 'EUCJP' );

	check( 'KANJI', 'EUCJP', 'UTF8' );
	check( 'KANJI', 'EUCJP', 'SJIS' );
	check( 'KANJI', 'EUCJP', 'JIS' );
});

// ASCII
// abcd	ABCD	0123
describe( 'jconv.convert ASCII', function() {
	check( 'ASCII', 'UTF8', 'SJIS' );
	check( 'ASCII', 'UTF8', 'JIS' );
	check( 'ASCII', 'UTF8', 'EUCJP' );

	check( 'ASCII', 'SJIS', 'UTF8' );
	check( 'ASCII', 'SJIS', 'JIS' );
	check( 'ASCII', 'SJIS', 'EUCJP' );

	check( 'ASCII', 'JIS', 'UTF8' );
	check( 'ASCII', 'JIS', 'SJIS' );
	check( 'ASCII', 'JIS', 'EUCJP' );

	check( 'ASCII', 'EUCJP', 'UTF8' );
	check( 'ASCII', 'EUCJP', 'SJIS' );
	check( 'ASCII', 'EUCJP', 'JIS' );
});

// HALFWIDTH_KATAKANA
// ｱｲｳｴｵ
describe( 'jconv.convert HALFWIDTH_KATAKANA', function() {
	check( 'HALFWIDTH_KATAKANA', 'UTF8', 'SJIS' );
	check( 'HALFWIDTH_KATAKANA', 'UTF8', 'JIS' );
	check( 'HALFWIDTH_KATAKANA', 'UTF8', 'EUCJP' );

	check( 'HALFWIDTH_KATAKANA', 'SJIS', 'UTF8' );
	check( 'HALFWIDTH_KATAKANA', 'SJIS', 'JIS' );
	check( 'HALFWIDTH_KATAKANA', 'SJIS', 'EUCJP' );

	check( 'HALFWIDTH_KATAKANA', 'JIS', 'UTF8' );
	check( 'HALFWIDTH_KATAKANA', 'JIS', 'SJIS' );
	check( 'HALFWIDTH_KATAKANA', 'JIS', 'EUCJP' );

	check( 'HALFWIDTH_KATAKANA', 'EUCJP', 'UTF8' );
	check( 'HALFWIDTH_KATAKANA', 'EUCJP', 'SJIS' );
	check( 'HALFWIDTH_KATAKANA', 'EUCJP', 'JIS' );
});

// Windows Dependent
// 纊	ⅰ	㈱	①
describe( 'jconv.convert WindowsDependent', function() {
	check( 'WindowsDependent', 'UTF8', 'SJIS' );
	check( 'WindowsDependent', 'UTF8', 'JIS' );
	check( 'WindowsDependent', 'UTF8', 'EUCJP' );

	check( 'WindowsDependent', 'SJIS', 'UTF8' );
	check( 'WindowsDependent', 'SJIS', 'JIS' );
	check( 'WindowsDependent', 'SJIS', 'EUCJP' );

	check( 'WindowsDependent', 'JIS', 'UTF8' );
	check( 'WindowsDependent', 'JIS', 'SJIS' );
	check( 'WindowsDependent', 'JIS', 'EUCJP' );

	check( 'WindowsDependent', 'EUCJP', 'UTF8' );
	check( 'WindowsDependent', 'EUCJP', 'SJIS' );
	check( 'WindowsDependent', 'EUCJP', 'JIS' );
});

// WAVE DASH
// ～
describe( 'jconv.convert WAVEDASH', function() {
	check( 'WAVEDASH', 'UTF8', 'SJIS' );
	check( 'WAVEDASH', 'UTF8', 'JIS' );
	check( 'WAVEDASH', 'UTF8', 'EUCJP' );

	check( 'WAVEDASH', 'SJIS', 'UTF8' );
	check( 'WAVEDASH', 'SJIS', 'JIS' );
	check( 'WAVEDASH', 'SJIS', 'EUCJP' );

	check( 'WAVEDASH', 'JIS', 'UTF8' );
	check( 'WAVEDASH', 'JIS', 'SJIS' );
	check( 'WAVEDASH', 'JIS', 'EUCJP' );

	check( 'WAVEDASH', 'EUCJP', 'UTF8' );
	check( 'WAVEDASH', 'EUCJP', 'SJIS' );
	check( 'WAVEDASH', 'EUCJP', 'JIS' );
});

// SIGN
// ￠	￡	￢	￤	＇	＂
describe( 'jconv.convert SIGN', function() {
	check( 'SIGN', 'UTF8', 'SJIS' );
	check( 'SIGN', 'UTF8', 'JIS' );
	check( 'SIGN', 'UTF8', 'EUCJP' );

	check( 'SIGN', 'SJIS', 'UTF8' );
	check( 'SIGN', 'SJIS', 'JIS' );
	check( 'SIGN', 'SJIS', 'EUCJP' );

	check( 'SIGN', 'JIS', 'UTF8' );
	check( 'SIGN', 'JIS', 'SJIS' );
	check( 'SIGN', 'JIS', 'EUCJP' );

	check( 'SIGN', 'EUCJP', 'UTF8' );
	check( 'SIGN', 'EUCJP', 'SJIS' );
	check( 'SIGN', 'EUCJP', 'JIS' );
});

// SIGN-YEN
// \	/
describe( 'jconv.convert SIGN-YEN', function() {
	check( 'SIGN-YEN', 'UTF8', 'SJIS' );
	check( 'SIGN-YEN', 'UTF8', 'JIS' );
	check( 'SIGN-YEN', 'UTF8', 'EUCJP' );

	check( 'SIGN-YEN', 'SJIS', 'UTF8' );
	check( 'SIGN-YEN', 'SJIS', 'JIS' );
	check( 'SIGN-YEN', 'SJIS', 'EUCJP' );

	check( 'SIGN-YEN', 'JIS', 'UTF8' );
	check( 'SIGN-YEN', 'JIS', 'SJIS' );
	check( 'SIGN-YEN', 'JIS', 'EUCJP' );

	check( 'SIGN-YEN', 'EUCJP', 'UTF8' );
	check( 'SIGN-YEN', 'EUCJP', 'SJIS' );
	check( 'SIGN-YEN', 'EUCJP', 'JIS' );
});

// PARALLEL TO
// ∥
describe( 'jconv.convert PARALLELTO', function() {
	check( 'PARALLELTO', 'UTF8', 'SJIS' );
	check( 'PARALLELTO', 'UTF8', 'JIS' );
	check( 'PARALLELTO', 'UTF8', 'EUCJP' );

	check( 'PARALLELTO', 'SJIS', 'UTF8' );
	check( 'PARALLELTO', 'SJIS', 'JIS' );
	check( 'PARALLELTO', 'SJIS', 'EUCJP' );

	check( 'PARALLELTO', 'JIS', 'UTF8' );
	check( 'PARALLELTO', 'JIS', 'SJIS' );
	check( 'PARALLELTO', 'JIS', 'EUCJP' );

	check( 'PARALLELTO', 'EUCJP', 'UTF8' );
	check( 'PARALLELTO', 'EUCJP', 'SJIS' );
	check( 'PARALLELTO', 'EUCJP', 'JIS' );
});

// SIGN-MINUS
// ―	－
describe( 'jconv.convert SIGN-MINUS', function() {
	check( 'SIGN-MINUS', 'UTF8', 'SJIS' );
	check( 'SIGN-MINUS', 'UTF8', 'JIS' );
	check( 'SIGN-MINUS', 'UTF8', 'EUCJP' );

	check( 'SIGN-MINUS', 'SJIS', 'UTF8' );
	check( 'SIGN-MINUS', 'SJIS', 'JIS' );
	check( 'SIGN-MINUS', 'SJIS', 'EUCJP' );

	check( 'SIGN-MINUS', 'JIS', 'UTF8' );
	check( 'SIGN-MINUS', 'JIS', 'SJIS' );
	check( 'SIGN-MINUS', 'JIS', 'EUCJP' );

	check( 'SIGN-MINUS', 'EUCJP', 'UTF8' );
	check( 'SIGN-MINUS', 'EUCJP', 'SJIS' );
	check( 'SIGN-MINUS', 'EUCJP', 'JIS' );
});

// EXTENSION
// SJIS does not have the EXTENSION-table(JIS X 0212).
// 丂	‖	−
describe( 'jconv.convert EXTENSION', function() {
	check( 'EXTENSION', 'UTF8', 'JIS' );
	check( 'EXTENSION', 'UTF8', 'EUCJP' );

	check( 'EXTENSION', 'JIS', 'UTF8' );
	check( 'EXTENSION', 'JIS', 'EUCJP' );

	check( 'EXTENSION', 'EUCJP', 'UTF8' );
	check( 'EXTENSION', 'EUCJP', 'JIS' );
});

// UNICODE
describe( 'jconv.convert UNICODE', function() {
	check( 'BASIC', 'SJIS', 'UNICODE' );
	check( 'BASIC', 'JIS', 'UNICODE' );
	check( 'BASIC', 'EUCJP', 'UNICODE' );
	check( 'BASIC', 'UTF8', 'UNICODE' );

	check( 'BASIC', 'UNICODE', 'SJIS' );
	check( 'BASIC', 'UNICODE', 'JIS' );
	check( 'BASIC', 'UNICODE', 'EUCJP' );
	check( 'BASIC', 'UNICODE', 'UTF8' );
});
