var fs     = require( 'fs' ),
	assert = require( 'assert' ),
	jconv  = require( __dirname + '/../' );

function getBuffer( type, name ) {
	return fs.readFileSync( __dirname + '/input/' + type + '/' + name + '.txt' );
}

function check( type, from, to ) {
	it( '#' + from + '->' + to, function() {
		var toBuf = getBuffer( type, to );
		var fromBuf = getBuffer( type, from );
		var convertedBuf = jconv.convert( fromBuf, from, to );

		// console.log( '' );
		// console.log( toBuf );
		// console.log( convertedBuf );

		assert.deepEqual( toBuf, convertedBuf );
	});
}

describe( 'jconv.decode, jconv.encode', function() {
	it( '#iconv-lite Function', function() {
		var input = '君知るや南の国 かなたへ 君と共にゆかまし';
		var jisBuffer = jconv.encode( input, 'JIS' );
		var utfString = jconv.decode( jisBuffer, 'JIS' );

		assert.equal( input, utfString );
	});
});

describe( 'jconv should convert KANJI', function() {
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

describe( 'jconv should convert ASCII', function() {
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

describe( 'jconv should convert HALFWIDTH_KATAKANA', function() {
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

describe( 'jconv should convert WindowsDependent', function() {
	// toSJIS Converting is convert IBM EXTENSION to NEC's select IBM EXTENSION.

	// check( 'WindowsDependent', 'UTF8', 'SJIS' );
	check( 'WindowsDependent', 'UTF8', 'JIS' );
	check( 'WindowsDependent', 'UTF8', 'EUCJP' );

	check( 'WindowsDependent', 'SJIS', 'UTF8' );
	check( 'WindowsDependent', 'SJIS', 'JIS' );
	check( 'WindowsDependent', 'SJIS', 'EUCJP' );

	check( 'WindowsDependent', 'JIS', 'UTF8' );
	// check( 'WindowsDependent', 'JIS', 'SJIS' );
	check( 'WindowsDependent', 'JIS', 'EUCJP' );

	check( 'WindowsDependent', 'EUCJP', 'UTF8' );
	// check( 'WindowsDependent', 'EUCJP', 'SJIS' );
	check( 'WindowsDependent', 'EUCJP', 'JIS' );
});

describe( 'jconv should convert EXTENSION', function() {
	// SJIS does not have EXTENSION table.

	check( 'EXTENSION', 'UTF8', 'JIS' );
	check( 'EXTENSION', 'UTF8', 'EUCJP' );

	check( 'EXTENSION', 'JIS', 'UTF8' );
	check( 'EXTENSION', 'JIS', 'EUCJP' );

	check( 'EXTENSION', 'EUCJP', 'UTF8' );
	check( 'EXTENSION', 'EUCJP', 'JIS' );
});

// WAVEDASH

// SPECIFIC SIGN

// PARALLEL TO

// DASH
