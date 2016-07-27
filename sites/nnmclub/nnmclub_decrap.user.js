// ==UserScript==
// @name         NNM Club DeCrap
// @namespace    http://tampermonkey.net/
// @downloadURL  https://github.com/DeCrap/DeCrap/raw/master/sites/nnmclub/nnmclub_decrap.user.js
// @description  Removes all crap and shit for this site
// @author       DeCrap
// @run-at       document-start
// @grant        none
// @include      /^https?://nnmclub.to/*/
// ==/UserScript==

//Docs for "one hour learning" antiadvertisment scripting, lol
//script header: https://wiki.greasespot.net/Metadata_Block
//Xpath selector format: http://www.w3schools.com/xsl/xpath_syntax.asp, https://ru.wikipedia.org/wiki/XPath
//html: http://htmlbook.ru, https://webref.ru/html
//js: https://learn.javascript.ru

function filters()
{
    log('filters fill');
    //del(filter) - clear advertisment in realtime, before html-page comlete loading
    //adel(filter) - clear advertisment after html-page comlete loading
    //edit(filter, newvalue) - edit element in realtime, before html-page comlete loading
    //aedit(filter, newvalue) - edit element after html-page comlete loading

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






//primary func

function main()
{
    log('main loop start');
    if (count > 0)
    {
        log('realtime clearing executing');
        count = 0;
        remove(sync_filter);
        editor(sync_edit);
    }

    if (count > 0)
    {
        log('crap found: '+count+' elements, set start now');
        id = setTimeout(main, timeout);
    }

    if (last)
    {
        log('last block start');
        log('freezing async script');
        ClearAllTimeouts();
        log('last clearing execute');
        remove(sync_filter);
        remove(async_filter);
        editor(sync_edit);
        editor(async_edit);
        clearTimeout(id);
        log('last block end');
    }
    log('crap found in this cicle: '+count+' elements');
    log('main loop end, sleeping');
}


log('starting');
//begin script

var last = false;
var id;
var count = 0;
var sync_filter = [];
var async_filter = [];
var sync_edit = [];
var async_edit = [];
var timeout = 100;
var debug = 0;

//start script
count++;

//fill filters
filters();

//set listener
document.onreadystatechange = wait_load; //wait complete loading and clear async crap

//set interactive clear crap
id = setTimeout(main, timeout);

//end.
log('sleeping');


//misc func

function remove(array)
{
    if ((array !== null)&&(array.length > 0))
    {
        for (let i = 0; i <= array.length - 1; i++)
        {
            log('del("'+array[i]+'")');
            let result = document.evaluate(array[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if ((result !== null) && (result.snapshotLength > 0))
            {
                log('found '+result.snapshotLength+' elements');
                for (let i = 0; i <= result.snapshotLength - 1; i++)
                {
                    let element = result.snapshotItem(i);
                    element.parentNode.removeChild(element);
                    count++;
                }
            }
        }
    }
}

function editor()
{
    log('editing');
}

function log(str)
{
    if (debug === 1)
    {
        console.log(Math.round(performance.now())+': DeCrap '+str);
    }
}

function ClearAllIntervals() {
    for (let i = 1; i < 99999; i++)
        window.clearInterval(i);
}

function ClearAllTimeouts() {
    for (let i = 1; i < 99999; i++)
        window.clearTimeout(i);
}

function wait_load()
{
    if (document.readyState === "complete")
    {
        log('site load completed');
        last = true;
        id = setTimeout(main, timeout);
    }
}

function del(selector)
{
    sync_filter.push(selector);
}

function adel(selector)
{
    async_filter.push(selector);
}