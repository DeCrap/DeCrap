// ==UserScript==
// @name         NNM Club DeCrap
// @namespace    http://tampermonkey.net/
// @version      0.2
// @downloadURL  https://github.com/DeCrap/DeCrap/raw/master/sites/nnmclub/nnmclub_decrap.user.js
// @description  Removes all crap and shit for this site
// @author       DeCrap
// @license      GPL3
// @require      https://github.com/DeCrap/DeCrap/raw/master/core/V1/decrap_core_v1.user.js
// @run-at       document-start
// @grant        none
// @include      /^https?://nnmclub.to/*/
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

    //adblock detect
    del('//div[@class="request"]');
    del('//script[contains(@src, "requests")]');

    //directadvert.ru
    del('//div[contains(@class, "DA-BLOCK")]');
    adel('//script[contains(., "DA-BLOCK")]');
    del('//script[contains(@src, "directadvert.ru") or contains(., "directadvert.ru")]');
    
    //marketgid.com
    del('//script[contains(@src, "marketgid.com") or contains(., "marketgid.com")]');
    del('//div[@class="mgbox"]');
    
    //awesomeredirector.com
    del('//*[contains(@href, "awesomeredirector.com")]');
    
    //background image
    del('//style[contains(., "background-image")]');
}