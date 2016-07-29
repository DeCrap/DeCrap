// ==UserScript==
// @name         NNM Club DeCrap
// @description  Removes all crap and shit for this site
// @version      0.4.0.1
// @downloadURL  https://github.com/DeCrap/DeCrap/raw/master/sites/nnmclub/nnmclub_decrap.user.js
// @require      https://github.com/DeCrap/DeCrap/raw/core/core/v1/decrap_core_v1.user.js
// @author       DeCrap
// @license      GPL3
// @namespace    http://tampermonkey.net/
// @grant        none
// @run-at       document-start
// @noframes
// @include      /^https?://nnmclub.to/*/
// ==/UserScript==

(function() {
	'use strict';
	//var core = require('https://github.com/DeCrap/DeCrap/raw/core/core/v1/decrap_core_v1.user.js');
	console.dir(Math.round(performance.now()) + ': DeCrap ' + 'nnm');

	//log('nnmnnmnnm')
	//var log = core.log;
	// var del = core.del;

	// ////////////////////////
	// //settings
	// core.timeout.freeze = 2000; //freeze all script every some second
	// core.timeout.remove = 230; //clear crap timeout
	// core.timeout.main = 50; //minimal mainloop timeout
	// //var debuglevel = 1; //0..3 - deep logging
	// core.debug = 1; //enable logs
	// var design = 1; //fix site design
	// ////////////////////////
	// log('nnmclub starting!');

	// ///////////////////////////////////////////////////
	// // ↓↓↓↓↓↓ YOUR ↓↓↓↓↓↓ FILTERS ↓↓↓↓↓↓ HERE ↓↓↓↓↓↓ //
	// // ↓↓↓↓↓↓ YOUR ↓↓↓↓↓↓ FILTERS ↓↓↓↓↓↓ HERE ↓↓↓↓↓↓ //
	// // ↓↓↓↓↓↓ YOUR ↓↓↓↓↓↓ FILTERS ↓↓↓↓↓↓ HERE ↓↓↓↓↓↓ //
	// ///////////////////////////////////////////////////

	// //adblock detect
	// del('//div[@class="request"]');
	// del('//script[contains(@src, "requests")]');

	// //directadvert.ru
	// del('//div[contains(@class, "DA-BLOCK")]');
	// del('//script[contains(., "DA-BLOCK")]');
	// del('//script[contains(@src, "directadvert.ru") or contains(., "directadvert.ru")]');

	// //marketgid.com
	// del('//script[contains(@src, "marketgid.com") or contains(., "marketgid.com")]');
	// del('//div[@class="mgbox"]');

	// //awesomeredirector.com
	// del('//*[contains(@href, "awesomeredirector.com")]');

	// //background image
	// del('//style[contains(., "background-image")]');

	// if (design === 1) {
	// 	//left navigation bar
	// 	del('//td[@class="leftnav"]');
	// 	del('//div[@class="copyright"]');
	// 	del('//body/div[@class="wrap"]', 'class');
	// }

	// ///////////////////////////////////////////////////
	// // ↑↑↑↑↑↑ YOUR ↑↑↑↑↑↑ FILTERS ↑↑↑↑↑↑ HERE ↑↑↑↑↑↑ //
	// // ↑↑↑↑↑↑ YOUR ↑↑↑↑↑↑ FILTERS ↑↑↑↑↑↑ HERE ↑↑↑↑↑↑ //
	// // ↑↑↑↑↑↑ YOUR ↑↑↑↑↑↑ FILTERS ↑↑↑↑↑↑ HERE ↑↑↑↑↑↑ //
	// ///////////////////////////////////////////////////
	// log('nnmclub filters fill');
	// core.start();

})();