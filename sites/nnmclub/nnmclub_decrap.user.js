// ==UserScript==
// @name         NNM Club DeCrap
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Removes all crap and shit for this site
// @author       DeCrap
// @include      /^https?://nnmclub.to/*/
// @grant        none
// ==/UserScript==

//Docs for "one hour learning" antiadvertisment scripting, lol
//Xpath selector format: http://www.w3schools.com/xsl/xpath_syntax.asp, https://ru.wikipedia.org/wiki/XPath
//html: http://htmlbook.ru, https://webref.ru/html
//js: https://learn.javascript.ru

function filters()
{
    //del(filter) - clear advertisment in realtime, before html-page comlete loading
    //adel(filter) - clear advertisment after html-page comlete loading
    //edit(filter, newvalue) - edit element in realtime, before html-page comlete loading
    //aedit(filter, newvalue) - edit element after html-page comlete loading

    //remove adbloc detect
    del('//div[@class="request"]');
    del('//script[contains(@src, "requests")]');

    //remove directadvert.ru
    del('//center/div[contains(@class, "DA-BLOCK")]');
    adel('//center/script[contains(., "DA-BLOCK")]');
    del('//script[contains(@src, "directadvert.ru") or contains(., "directadvert.ru")]');
}






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
        id = setTimeout(main, 100);
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
var id;
var count = 0;
var sync_filter = [];
var async_filter = [];
var sync_edit = [];
var async_edit = [];

//start script
count++;

//fill filters
filters();

//set listener
document.onreadystatechange = wait_load; //wait complete loading and clear async crap

//set interactive clear crap
id = setTimeout(main, 100);

//end.



//misc func

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
                }
            }
        }
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
        last = true;
        id = setTimeout(main, 100);
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