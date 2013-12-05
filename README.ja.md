jconv
====================

> Pure Javascript Iconv for Japanese encodings.

[![Build Status](https://secure.travis-ci.org/narirou/jconv.png?branch=master)](https://travis-ci.org/narirou/jconv)

 * 日本で一般的に利用されている以下のエンコーディングを行います。  
   *Shift_JIS(CP932)、ISO-2022-JP(-1)、EUC-JP、UTF8*
 * Javascriptのみで書かれているため、コンパイルは必要ありません。
 * [node-iconv](https://github.com/bnoordhuis/node-iconv)よりも高速です。

## インストール
```
npm install jconv
```

## 使用方法
例えば**EUC-JP** から **Shift_JIS** に変換したいときは:

```javascript
var jconv = require( 'jconv' );

var SJISBuffer = jconv.convert( EUCJPBuffer, 'EUCJP', 'SJIS' );
```

**iconv-lite** 形式のAPIも利用可能です。:

```javascript
var string = jconv.decode( buffer, fromEncoding );

var buffer = jconv.encode( string, toEncoding );
```

## API
* **jconv( input, from, to )**  
* **jconv.convert( input, from, to )**  
    * `input` {Buffer} または {String}  
    * `from`, `to` {String}: 変換元のエンコードと、変換先のエンコードを指定します。  
    ここには、*Shift_JIS(SJIS)、ISO-2022-JP(JIS)、EUCJP、UTF8* のいづれかを指定してください。  
    * `return` {Buffer}  

* **jconv.decode( inputBuffer, from )**  
    * `return` {String}.  

* **jconv.encode( inputString, to )**  
    * `return` {Buffer}.  

## 変換速度
node-iconv@ 2.0.7 との比較です。比較には、[夏目漱石 こころ](http://www.aozora.gr.jp/cards/000148/files/773_14560.html)
を [Benchmark.js](https://github.com/bestiejs/benchmark.js)を使って変換速度を計測しています。  
環境は *Windows7, core i5 2405-S, mem8G, Node 0.10.22* です。 (testフォルダに計測のためのコードがあるので、利用する環境で詳細な計測してみてください。)  
`Gray`: iconv、`Blue`: jconv　の結果を表しています。  

![jconv - encoding speed test chart](./test/chart/speedLog.png)
[[latest log]](./test/chart/speedLog.txt)  
<!-- https://raw.github.com/narirou/jconv/master/ -->

## エンコードについて
 * 以下のエンコードの相互変換をサポートします。: Shift_JIS(CP932), ISO-2022-JP(-1), EUC-JP, UTF8.  
 * Windowsの機種依存文字と、JISの変換をサポートします。  
[(問題詳細)](http://support.microsoft.com/default.aspx?scid=kb;ja;JP170559)  

 * "JIS X 0208"、"JIS X 0212"、"CP932" は、ユニコード変換テーブルにいくつかの相違点があります。
  そのためいくつかの特殊な文字 ( ～￠￡∥ など ) で、デフォルトでは相互変換を行うことが出来ません。  
 このモジュールでは、これらの幾つかを変更して相互変換できるようにしています。（秀丸エディタとほぼ同じ変換を行います。）  
 定義に厳格な変換を行いたい場合は、node-iconvにlibiconvの日本語用修正パッチを当てたモジュールを用いることが推奨されます。  
[(問題詳細)](http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html)  

## 参考
 * [iconv-lite](https://github.com/ashtuchkin/iconv-lite) by ashtuchkin.
 * [Encoding.js](https://github.com/polygonplanet/Unzipper.js) by polygonplanet.
 * [iconv-js](https://github.com/Hikaru02/iconv-js) by Hikaru02.
 * [node-iconv](https://github.com/bnoordhuis/node-iconv) by bnoordhuis.
 * [libiconv-1.9.1-ja-patch Description](http://www2d.biglobe.ne.jp/~msyk/software/libiconv-1.9.1-patch.html)

ありがとうございます！

## Note
プルリクエストは誰でもウェルカム。

## TODO
 * native encoding support
