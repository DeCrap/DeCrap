// ==UserScript==
// @name         NNM Club DeCrap
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @downloadURL  https://github.com/DeCrap/DeCrap/raw/master/sites/nnmclub/nnmclub_decrap.user.js
// @description  Removes all crap and shit for this site
// @author       DeCrap
// @run-at       document-start
// @noframes
// @grant        none
// @include      /^https?://nnmclub.to/*/
// ==/UserScript==

(function() {
	'use strict';
	var filter = []; //array for filters
	var timeout = {};
	////////////////////////
	//settings
	timeout.freeze = 2000; //freeze all script every some second
	timeout.remove = 230; //clear crap timeout
	timeout.main = 50; //minimal mainloop timeout
	//var debuglevel = 1; //0..3 - deep logging
	var debug = 0;
	////////////////////////
	log('starting!');

	///////////////////////////////////////////////////
	// ↓↓↓↓↓↓ YOUR ↓↓↓↓↓↓ FILTERS ↓↓↓↓↓↓ HERE ↓↓↓↓↓↓ //
	// ↓↓↓↓↓↓ YOUR ↓↓↓↓↓↓ FILTERS ↓↓↓↓↓↓ HERE ↓↓↓↓↓↓ //
	// ↓↓↓↓↓↓ YOUR ↓↓↓↓↓↓ FILTERS ↓↓↓↓↓↓ HERE ↓↓↓↓↓↓ //
	///////////////////////////////////////////////////

	//adblock detect
	del('//div[@class="request"]');
	del('//script[contains(@src, "requests")]');

	//directadvert.ru
	del('//div[contains(@class, "DA-BLOCK")]');
	del('//script[contains(., "DA-BLOCK")]');
	del('//script[contains(@src, "directadvert.ru") or contains(., "directadvert.ru")]');

	//marketgid.com
	del('//script[contains(@src, "marketgid.com") or contains(., "marketgid.com")]');
	del('//div[@class="mgbox"]');

	//awesomeredirector.com
	del('//*[contains(@href, "awesomeredirector.com")]');

	//background image
	del('//style[contains(., "background-image")]');

	///////////////////////////////////////////////////
	// ↑↑↑↑↑↑ YOUR ↑↑↑↑↑↑ FILTERS ↑↑↑↑↑↑ HERE ↑↑↑↑↑↑ //
	// ↑↑↑↑↑↑ YOUR ↑↑↑↑↑↑ FILTERS ↑↑↑↑↑↑ HERE ↑↑↑↑↑↑ //
	// ↑↑↑↑↑↑ YOUR ↑↑↑↑↑↑ FILTERS ↑↑↑↑↑↑ HERE ↑↑↑↑↑↑ //
	///////////////////////////////////////////////////
	log('filters fill');

	//begin script

	//arrays
	var result = [];
	//service var
	var last = false; //last cicle?
	var id = []; //timer id array
	var count = 0; //count finding crap in this cicle
	var changes = 0; //counter detected page changes
	var changesall = 0; //all changes
	var removing = false; //removing active?
	var freezing = false; //scripts freezing?
	//counters
	var countall = 0; //count finding crap in all cicles
	var cicles = 0; //count cicles
	//misc arrays
	//check timeout base
	var base = {
		main: Date.now(),
		remove: Date.now(),
		freeze: Date.now(),
	};

	//start script

	//optimize();
	init();

	//set maintimer now
	id.push = setTimeout(main, timeout.main);
	log('next mainloop cicle start over ' + timeout.main + 'ms');

	log('sleeping');
	log('');

	//end.

	//primary func

	//mainloop

	function main() {
		if (((checkinterval() && (changes > 0)) || (last)) && (!removing)) {
			//clear interrupt
			removing = true;
			var tms = Date.now();

			//add cicle counter
			cicles++;
			log('start mainloop №' + cicles);

			//reset counter
			count = 0;
			log('on last cicles detect page changes: ' + changes);

			//find&remove craps
			freeze();
			remove();

			//reset counter
			changes = 0;
			//log('reset counter: '+changes);

			//logging
			log('end mainloop №' + cicles);
			log('crap found in this cicle: ' + count + ' elements');
			log('time cicle: ' + (Date.now() - tms) + 'ms');

			//exit or sleep?
			if (!last) {
				log('sleeping');
				log(''); //delimiter
			} else {
				exit();
				log('exiting');
				ClearAllMainTimers();
				log('script terminated');
			}

			//reset timeout check base
			base.remove = Date.now();

			//set interrupt
			removing = false;

		} else {
			//log('mainloop start delayed: '+(Date.now()-ms)+'/'+timeout.remove+'ms');
		}

		//set next mainloop start
		if (id.length > 1) {
			log('WARNING: ' + id.length + 'timers!!!');
			ClearAllMainTimers();
		}
		var t = id.pop;
		//id.pop;
		if (!last) id.push = setTimeout(main, timeout.main);
	}

	function freeze() {
		if ((checkinterval('freeze') || last) && (!freezing)) {
			freezing = true; //clear interrupt
			var tms = Date.now();
			log('start freezing');

			//freeze all scripts
			ClearAllIntervals();
			ClearAllTimeouts();

			log('all scripts freezing!');
			log('time cicle: ' + (Date.now() - tms) + 'ms');

			//reset timeout check base
			base.freeze = Date.now();

			//set interrupt
			freezing = false;
		}
	}



	//misc func

	function checkinterval(mode = 'remove') {
		var time;
		var interval;

		switch (mode) {
			case 'main':
				time = base.main;
				interval = timeout.main;
				break;
			case 'remove':
				time = base.remove;
				interval = timeout.remove;
				break;
			case 'freeze':
				time = base.freeze;
				interval = timeout.freeze;
				break;
			default:
				log('ERROR checkinterval');
		}

		return ((Date.now() - time) >= interval);
	}


	function exit() {
		log('');
		log('statistic:');
		log('total cicles: ' + cicles);
		log('total crap destroyed: ' + (countall));
		log('total filters: ' + filter.length);
		log('efficiency: ' + (countall / filter.length).toFixed(2));
		log('');
		init();
	}


	function init() {
		var stage = false;
		if (!last) {
			//set listeners
			document.onreadystatechange = wait_load; //wait complete page loading
			document.addEventListener('DOMSubtreeModified', wait_pagechange, stage);
			log('set listener');
		} else {
			//remove listener
			document.removeEventListener('DOMSubtreeModified', wait_pagechange, stage);
			log('remove listener');
		}
	}


	function wait_load() {
		var status = document.readyState;
		log('page status: ' + status);
		//check status
		if (status === "complete") {
			log('page load completed!');
			last = true;
		}
	}


	function wait_pagechange() {
		changes++;
		changesall++;
		//log('page change! counter: '+changes);
	}


	function remove() {
		filterscan();
	}


	function filterscan() {
		if ((filter !== null) && (filter.length > 0)) {
			for (let i = 0; i <= filter.length - 1; i++) {
				//find crap
				result = document.evaluate(filter[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				//remove finding crap
				resultscan(i);
			}
		}
	}


	function resultscan(index) {
		if ((result !== null) && (result.snapshotLength > 0)) {
			log('remove ' + result.snapshotLength + ' elements of filter "' + filter[index] + '"');
			for (let i = 0; i <= result.snapshotLength - 1; i++) {
				removenode(result.snapshotItem(i));
			}
		}
	}


	function removenode(node) {
		//remove node
		node.parentNode.removeChild(node);
		//update counters
		count++;
		countall++;
	}

	function editnode(node) {
		//
		node.setAttribute("category", "food");

	}

	function ClearAllIntervals() {
		//reset all interval timers
		for (let i = 1; i < 99999; i++)
			clearInterval(i);
	}


	function ClearAllTimeouts() {
		//reset all timeout timers
		for (let i = 1; i < 99999; i++)
			clearTimeout(i);
	}


	function ClearAllMainTimers() {
		if (id !== null) {
			while (id.length > 0) {
				clearTimeout(id.pop);
			}
		}
	}


	function log(str) {
		//logging str
		if (debug === 1) console.dir(Math.round(performance.now()) + ': DeCrap ' + str);
	}


	function del(selector, mode = 'node') {
		switch (mode) {
			case 'node':
				filter.push(selector);
				break;
//				case 'attribute' 
			default:
				log('ERROR del');
		}
	}


})();