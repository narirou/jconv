jconv
====================

> Pure Javascript Iconv for Japanese encodings.

[![Build Status](https://secure.travis-ci.org/narirou/jconv.png?branch=master)](https://travis-ci.org/narirou/jconv)

 * This module supported the encoding commonly used in japanese:  
   *Shift_JIS(CP932), ISO-2022-JP(-1), EUC-JP, UTF8* conversion.
 * Pure Javascript, no compile needed.
 * Much faster than [node-iconv](https://github.com/bnoordhuis/node-iconv).

## Install
```
npm install jconv
```

## Usage
For example simply convert from **EUC-JP** to **Shift_JIS**:

```javascript
var jconv = require( 'jconv' );

var SJISBuffer = jconv.convert( EUCJPBuffer, 'EUCJP', 'SJIS' );
```

Also available **iconv-lite** syntax:

```javascript
var string = jconv.decode( buffer, fromEncoding );

var buffer = jconv.encode( string, toEncoding );
```

## API

* **jconv( input, from, to )**  
* **jconv.convert( input, from, to )**  
    * `input` {Buffer} or {String}.  
    * `from`, `to` {String}: *Shift_JIS(SJIS), ISO-2022-JP(JIS), EUCJP, UTF8* are available.  
    * `return` {Buffer}.  

* **jconv.decode( inputBuffer, from )**  
    * `return` {String}.  

* **jconv.encode( inputString, to )**  
    * `return` {Buffer}.  

## Speed
Comparison with node-iconv@ 2.0.7 by converting [Japanese text](http://www.aozora.gr.jp/cards/000148/files/773_14560.html)
using [Benchmark.js](https://github.com/bestiejs/benchmark.js).  
Environment is *Windows7, core i5 2405-S, mem8G, Node 0.10.22*.
(Please check on your hardware.)  
`Gray` is iconv and `Blue` is jconv.  

![jconv - encoding speed test chart](./test/chart/speedLog.png)
[[latest log]](./test/chart/speedLog.txt)  
<!-- https://raw.github.com/narirou/jconv/master/ -->

## Encodings
 * Supported: Shift_JIS(CP932), ISO-2022-JP(-1), EUC-JP, UTF8.  
 * Supported Windows Dependent Characters <-> JIS Conversion.  
[(problem details)](http://support.microsoft.com/default.aspx?scid=kb;ja;JP170559)  

 * "JIS X 0208", "JIS X 0212" and "CP932" have the Unicode Mapping Table Differences,
  so the specific characters ( ～￠￡∥ etc... ) cannot be round-trip converted by default.  
 This module corrects this difference as much as possible when converting.  
[(problem details)](http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html)  

## Based on
 * [iconv-lite](https://github.com/ashtuchkin/iconv-lite) by ashtuchkin.
 * [Encoding.js](https://github.com/polygonplanet/Unzipper.js) by polygonplanet.
 * [iconv-js](https://github.com/Hikaru02/iconv-js) by Hikaru02.
 * [node-iconv](https://github.com/bnoordhuis/node-iconv) by bnoordhuis.
 * [libiconv-1.9.1-ja-patch Description](http://www2d.biglobe.ne.jp/~msyk/software/libiconv-1.9.1-patch.html)

Thank you so much!

## Note
Pull requests are welcome.

## TODO
 * native encoding support
