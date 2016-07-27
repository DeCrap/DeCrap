// ==UserScript==
// @name         DeCrap core V1
// @namespace    http://tampermonkey.net/
// @version      0.2
// @downloadURL  https://github.com/DeCrap/DeCrap/raw/master/core/V1/decrap_core_v1.user.js
// @description  Core script from remove all crap and shit for any site
// @author       DeCrap
// @license      GPL3
// @grant        none
// ==/UserScript==

//Docs for "one hour learning" antiadvertisment scripting, lol
//script header: https://wiki.greasespot.net/Metadata_Block
//Xpath selector format: http://www.w3schools.com/xsl/xpath_syntax.asp, https://ru.wikipedia.org/wiki/XPath
//html: http://htmlbook.ru, https://webref.ru/html
//js: https://learn.javascript.ru

//primary func

function main()
{
    if (count > 0)
    {
        count = 0;
        remove(sync_filter);
        editor(sync_edit);
    }

    if (count > 0)
    {
        id = setTimeout(main, timeout);
    }

    if (last)
    {
        ClearAllTimeouts();
        remove(sync_filter);
        remove(async_filter);
        editor(sync_edit);
        editor(async_edit);
        clearTimeout(id);
    }
}



//begin script

var last = false;
var startup = false;
var id;
var count = 0;
var sync_filter = [];
var async_filter = [];
var sync_edit = [];
var async_edit = [];
var timeout = 100;

//start script
count++;

//fill filters
//filters();

//set listener
document.onreadystatechange = wait_load; //wait complete loading and clear async crap

//set interactive clear crap
//id = setTimeout(main, timeout);

//end.



//misc func

export function start()
{
    if (!startup)
    {
        id = setTimeout(main, timeout);
        startup = true;
    }
}

function remove(array)
{
    if ((array !== null)&&(array.length > 0))
    {
        for (let i = 0; i <= array.length - 1; i++)
        {
            let result = document.evaluate(array[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if ((result !== null) && (result.snapshotLength > 0))
            {
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
        last = true;
        id = setTimeout(main, timeout);
    }
}

export function del(selector)
{
    sync_filter.push(selector);
}

export function adel(selector)
{
    async_filter.push(selector);
}

export function edit(selector)
{
    sync_edit.push(selector);
}

export function aedit(selector)
{
    async_edit.push(selector);
}