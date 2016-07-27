// ==UserScript==
// @name         Trackers DeCrap
// @namespace    http://tampermonkey.net/
// @version      0.1
// @downloadURL  https://github.com/DeCrap/DeCrap/raw/master/trackers/trackers_decrap.user.js
// @description  Removes all trackers, metricks, analystics for any site
// @author       DeCrap
// @license      GPL3
// @require      https://github.com/DeCrap/DeCrap/raw/master/core/V1/decrap_core_v1.user.js
// @run-at       document-start
// @grant        none
// @include      http://*
// @include      https://*
// ==/UserScript==

//Docs for "one hour learning" antiadvertisment scripting, lol
//script header: https://wiki.greasespot.net/Metadata_Block
//Xpath selector format: http://www.w3schools.com/xsl/xpath_syntax.asp, https://ru.wikipedia.org/wiki/XPath
//html: http://htmlbook.ru, https://webref.ru/html
//js: https://learn.javascript.ru

start();
filters();

function filters()
{
    //counter.yadro.ru
    del('//img[contains(@src, "counter.yadro.ru")]');
    del('//script[contains(., "counter.yadro.ru")]');
}