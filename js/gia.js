/*
	@gia.js

    @date: 2017-01-29
    @version:0.0.0.5

    @date: 2016-10-05
    @version:0.0.0.4

	@author: Dingbao.ai[aka. ehaagwlke]
	@date: 2011-01-02
	@version:0.0.0.3
*/

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    //debugger;
    //alert('document ' + window.document)
    //alert(request.method + " " + window.document.activeElement.getElementsByTagName("img")[0].getAttribute("src"));
    if (request.method == "getImageInfo") {

        var et = window.document.activeElement,
            alt = null,
            title = null,
            dispWidth = 0,
            dispHeight = 0,
            src = null,
            tabUrl = window.document.URL;

        if (et && et.nodeName.toLowerCase() != 'img') {
            var images = et.getElementsByTagName("img");
            if (images.length > 0) {
                et = images[0];
            }
        }

        alt = et.alt ? et.alt : alt;
        title = et.title ? et.title : title;
        dispWidth = et.width;
        dispHeight = et.height;
        src = et.src;

        sendResponse({
            "alt": alt,
            "title": title,
            "dispWidth": dispWidth,
            "dispHeight": dispHeight,
            "srcUrl": src,
            "tabUrl": tabUrl
        });
    } else
        sendResponse({}); // snub them.
});