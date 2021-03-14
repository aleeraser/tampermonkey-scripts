// ==UserScript==
// @name         Ultimate-Guitar any-tab-downloader
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Add a button to download any tab, even if the download would not be normally available
// @author       aleeraser
// @match        https://tabs.ultimate-guitar.com/tab/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @updateURL    https://raw.githubusercontent.com/aleeraser/tampermonkey-scripts/main/ultimate-guitar-downloader.js
// ==/UserScript==

// NOTE: code ready for single usage
// function _f(t){const e=document.createElement("form");e.setAttribute("action","https://tabs.ultimate-guitar.com/tab/download"),e.setAttribute("id","hack_me"),e.innerHTML='<input type="hidden" name="id" value="'+t+'">\n<input type="hidden" name="session_id">\n<button type="submit">\n<span>Download Tab</span>\n</button>',document.body.appendChild(e)}const tab_id=window.location.href.toString().match(/[0-9]+$/)[0];_f(tab_id),document.getElementById("hack_me").submit(),document.body.removeChild(document.getElementById("hack_me"));

(function () {
    'use strict';

    const tab_id = window.location.href.toString().match(/[0-9]+$/)[0]
    const form = document.createElement("form");

    form.setAttribute("action", "https://tabs.ultimate-guitar.com/tab/download");
    form.setAttribute("id", "hack_me");
    form.setAttribute("style", "position: fixed; z-index: 26; width: 10em; height: 4em; top: 0; left: 0");

    form.innerHTML = `<input type="hidden" name="id" value="` + tab_id + `">
	    <input type="hidden" name="session_id">
        <button type="submit" style="
            color: rgb(255, 254, 242);
            border-color: transparent;
            background-color: rgb(56, 91, 159);
            padding: 1em">
                Download Tab
        </button>`;
    document.body.insertBefore(form, document.body.firstChild);

    // button drag
    $('#hack_me').on('mousedown', function (e) {
        e.preventDefault();

        var dr = $(this).addClass('drag').css('cursor', 'move');
        var height = dr.outerHeight();
        var width = dr.outerWidth();
        var ypos = dr.offset().top + height - e.pageY;
        var xpos = dr.offset().left + width - e.pageX;
        $(document.body).on('mousemove', function (e) {
            e.preventDefault();
            var itop = e.pageY + ypos - height;
            var ileft = e.pageX + xpos - width;
            if (dr.hasClass('drag')) {
                dr.offset({
                    top: itop,
                    left: ileft
                });
            }
        }).on('mouseup', function (e) {
            e.preventDefault();
            dr.removeClass('drag');
        });
    });
})();
