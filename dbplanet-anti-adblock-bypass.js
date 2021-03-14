// ==UserScript==
// @name         DB-Planet Anti-Adblock bypass
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bypass dbplanet.net anti adblock
// @author       aleeraser
// @match        https://dbplanet.net/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @updateURL    https://raw.githubusercontent.com/aleeraser/tampermonkey-scripts/main/dbplanet-anti-adblock-bypass.js
// ==/UserScript==

(function () {
    'use strict';

    const TAG = "[dbplanet anti-adblock] ";
    const MAX_COUNTER_VAL = 30;
    let counter = 0;

    console.log(TAG + "Using aleeraser's dbplanet anti-adblock");

    let interval_id = setInterval(() => {

        if ($(".ipsModal").length) {
            console.log(TAG + "Got it");
            clearInterval(interval_id);
            $(".ipsModal").remove();
            $(".ipsDialog").remove();
            $("body").removeClass("ipsNoScroll");

        } else {
            console.log(TAG + "Waiting... (" + counter + ")");
            counter++;

            if (counter > MAX_COUNTER_VAL) {
                clearInterval(interval_id);
                console.log(TAG + "Reached maximum tries (" + counter + "), aborting");
            }
        }
    }, 100);
})();
