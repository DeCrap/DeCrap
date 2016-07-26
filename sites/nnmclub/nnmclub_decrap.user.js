// ==UserScript==
// @name         NNM Club DeCrap
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes all crap and shit for this site
// @author       DeCrap
// @include      /^https?://nnmclub.to/*/
// @grant        none
// ==/UserScript==

//Docs for "one hour learning" antiadvertisment scripting, lol
//Xpath selector format: http://www.w3schools.com/xsl/xpath_syntax.asp, https://ru.wikipedia.org/wiki/XPath
//html: http://htmlbook.ru, https://webref.ru/html
//js: https://learn.javascript.ru


var last = false;
var select_result = null;
var selector_remove = []; //Элементы, которые необходимо удалить из кода страницы
var selector_modification = []; //Элементы, которые необходимо изменить.

//Добавяем фильтры

//remove craps

//copy-paste this template
//selector_remove.push('');

//remove shit trading
selector_remove.push('//table/tbody/tr[3]/td/span/a[1][contains(@href, "t=154688")]');

//remove crap desing from shitdesigner this shitsite
selector_remove.push('//td[@class="leftnav"]');
selector_remove.push('//script[contains(@src, "music")]');
selector_remove.push('//div[@class="highslide-container"]');

//remove misc shits
//selector_remove.push('//html[contains(@prefix, "ya:")]');
selector_remove.push('//meta[contains(@*, "ya:") or contains(@*, "yandex")]');
selector_remove.push('//link[contains(@*, "ya:") or contains(@*, "yandex")]');

//remove crap links
selector_remove.push('//div[@class="request"]');

//remove visible craps
selector_remove.push('//div[@class="branding"]');
selector_remove.push('//*[@id="logo"]');//micro sqare shit images on top
selector_remove.push('//div[@class="copyright"]');

//remove all hidden elements - all hidden default craps
selector_remove.push('//*[@style="display:none"]');

//remove all hacks - all hacks hide crap on webspiders, and all hack in default of illegals
selector_remove.push('//noindex');
selector_remove.push('//noscript');
selector_remove.push('//comment()');

//remove crap scripts
selector_remove.push('//script[contains(@src, "requests")]');
selector_remove.push('//script[contains(@src, "marketgid") or contains(., "marketgid")]');
selector_remove.push('//script[contains(@src, "nighter.club") or contains(., "nighter.club")]');
selector_remove.push('//script[contains(@src, "analytics") or contains(., "analytics")]');
selector_remove.push('//script[contains(@src, "yadro") or contains(., "yadro")]');
selector_remove.push('//script[contains(@src, "yandex") or contains(., "yandex")]');
selector_remove.push('//script[contains(@src, "advert") or contains(., "advert")]');
//selector_remove.push('//script[contains(., "random")]');
//selector_remove.push('//script');

selector_remove.push('//center/div[contains(@class, "DA-BLOCK")]');
selector_remove.push('//center/script[contains(., "DA-BLOCK")]');


selector_modification.push('/html','');


function del(selector)
{
    var result = document.evaluate(selector, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //    if ((result !== null) && (result.snapshotLength !== 0))
    {
        for (var i = select_result.snapshotLength - 1; i >= 0; i--)
        {
            var element = select_result.snapshotItem(i);
            alert(element);
            element.parentNode.removeChild(element);
        }
    }
}

//
//remove element
function remove()
{
    if (select_result !== null)
    {
        if (select_result.snapshotLength !== 0)
        {
            for (var i = select_result.snapshotLength - 1; i >= 0; i--)
            {
                var element = select_result.snapshotItem(i);
                element.parentNode.removeChild(element);
            }
        }
    }
}


//scan document
function xpath_scan(selector)
{
    //var regex = "/html/body//div[./div/div/div/div/a[contains(@href, 'marketgid') or contains(@href, 'tovarro')]]";

    //reset var
    select_result = null;
    //fill var
    select_result = document.evaluate(selector, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    //terminate scan, if scaning over 1 sec
    //    if (time_count <= 10)
    //    {
    //        window.setTimeout(xpath,100);
    //        if (select_result.snapshotLength !== 0) time_count = 0;
    //        time_count++;
    //    }
    //
    //    remove();
}
//

function ClearAllIntervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}

function wait_load()
{
    if (document.readyState === "complete")
    {
        //dd
    }
}


//Main logic
function main()
{
    //wait complete loading and clear async crap
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            //var path = "//script[@src='locationOfScript']";
            // etc...

            //for (var i = selector_remove.length - 1; i>=0; i--) del(selector_remove[i]);
            //del('//*[@id="logo"]');

            ClearAllIntervals();

            //
            //remove all
            for (var i = selector_remove.length - 1; i>=0; i--)
            {
                xpath_scan(selector_remove[i]);
                remove();
            }
            //selector_remove = null;

            //modification all
            for (var j = selector_modification.length - 1; j>=0; j--)
            {
                //        xpath_scan(selector_modification[j]);
                //        remove();
            }
            selector_modification = null;

            //clear memory
            select_result = null;
            //
        }};
}

//set listener
document.onreadystatechange = wait_load(); //wait complete loading and clear async crap

//Run script
main();

//window.setTimeout(main,10);