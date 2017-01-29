﻿/*
	@clk.js

    @date: 2016-10-05
    @version:0.0.0.7

	@author: Dingbao.ai[aka. ehaagwlke]
	@date: 2011-01-02
	@version:0.0.0.6
*/

var imgInfoObj  = {},
    alt         = '--',
    title       = '--',
    altTitleStr = '--/--',
    dispWidth   = 0,
    dispHeight  = 0,
    srcUrl      = null;

var ciid = chrome.contextMenus.create({
	"type"     : "normal",
	"title"    : chrome.i18n.getMessage("contextMenuStr"),
	"contexts" : ["image", "link"],
	"onclick"  : evt
});

chrome.tabs.onSelectionChanged.addListener(function(tid,info){
    alt         = '--',
    title       = '--',
    altTitleStr = '--/--',
    dispWidth   = 0,
    dispHeight  = 0,
    srcUrl      = null;
});

chrome.extension.onRequest.addListener(function(request){

	alt         = request.alt   ? request.alt   : '--';
	title       = request.title ? request.title : '--';
    altTitleStr = alt + ' / ' + title;

	dispWidth  = request.dispWidth  ? request.dispWidth  : 0;
	dispHeight = request.dispHeight ? request.dispHeight : 0;
	srcUrl     = request.srcUrl ? request.srcUrl : 0;
});

function evt(info,tab){
		//the location of the image
	var imgSrc=info.srcUrl ? info.srcUrl : srcUrl,

		//image src link type, base64 or ordinary link
		linkType,

		//image url length, the window width will be the url length times 7
		linkLength,

		//url of the tab which the image embedded
		tabUrl=tab.url,

		//the width and height of the popup window
		popWinWidth,
        popWinHeight;

		linkType = (imgSrc.indexOf('data:image/') == 0 && imgSrc.indexOf('base64') > -1) ?
                   "base64" : "normal";

        linkLength = linkType == "normal" ? imgSrc.length : 75;

		popWinWidth = linkLength < 75 ? linkLength * 8 + 100 : 800;
		popWinHeight = 220;

		chrome.windows.create({
            "type"   : "popup",
            "url"    : "view/vii.html",
            "width"  : popWinWidth,
            "height" : popWinHeight
        });

		imgInfoObj={
            "imgSrc"        :imgSrc,
            "linkType"      :linkType,
            "tabUrl"        :tabUrl,
            "popWinWidth"   :popWinWidth,
            "popWinHeight"  :popWinHeight,
            "linkLength"    :linkLength,
            "altTitleStr"   :altTitleStr,
            "dispWidth"     :dispWidth,
            "dispHeight"    :dispHeight
        };
}
