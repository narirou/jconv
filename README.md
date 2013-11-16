jconv
----------------------
> Iconv.js for Japanese characters.

 * Pure Javascript, no compile needed.
 * Spported: Shift_JIS(CP932), ISO-2022-JP(-1), EUC-JP, UTF8 conversion.
 * Almost much faster than node-iconv.

### Install
```
npm install jconv
```

### Usage
For example, simply convert **EUC-JP** to **Shift_JIS** :

```javascript
var jconv = require( 'jconv' );
var converted = jconv.convert( buffer, 'EUCJP', 'SJIS' );
```

<!-- Also available **node-iconv-lite** syntax:
```javascript
var string = jconv.decode( buffer, fromEncoding );
```
```javascript
var buffer = jconv.encode( string, toEncoding );
``` -->

### API

* #####`jconv( input, from, to )`
* #####`jconv.convert( input, from, to )`  
`input` source is {Buffer} or {String}.  
`from` and `to` are {String}: 'Shift_JIS(SJIS)' or 'ISO-2022-JP(JIS)' or 'EUCJP' or 'UTF8'.  
`Return value` is {Buffer}.

<!-- * #####`jconv.decode( inputBuffer, from )`

* #####`jconv.encode( inputString, to )` 

 -->

### EncodingSpeed
"Kokoro by NatsumeSoseki(夏目 漱石)" converted 100times.
![jconv - encoding speed test chart](https://dl-web.dropbox.com/get/Public/speedLog.png?w=AABFHiEysNe2M2DhrKqAUEMU-QziEaIMvUu1SDmaJtGeKQ)

### CharsetMapping
 * Supported Windows Dependent Characters <-> JIS Conversion.  
[(problem details)](http://support.microsoft.com/default.aspx?scid=kb;ja;JP170559)  


 * "JIS X 0208", "JIS X 0212" and "CP932" have Unicode Table Differences, the specific characters(～￠￡∥ etc...) cannot be round-trip converted by default.  
 So this module follows the rules below when converting.  
[(problem details)](http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html)  


### Based on, and References
 * [iconv-lite](https://github.com/ashtuchkin/iconv-lite) by ashtuchkin.
 * [node-iconv](https://github.com/bnoordhuis/node-iconv) by bnoordhuis.
 * [Encoding.js](https://github.com/polygonplanet/Unzipper.js) by polygonplanet.
 * [libiconv-1.9.1-ja-patch Description](http://www2d.biglobe.ne.jp/~msyk/software/libiconv-1.9.1-patch.html)

 Thank you so much!


### TODO
 * internal encoding support
 * unit test  

Pull Requests are welcome.


### License
MIT Lisence
