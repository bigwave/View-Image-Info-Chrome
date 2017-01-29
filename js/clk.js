/*
	@clk.js

    @date: 2016-10-05
    @version:0.0.0.7

	@author: Dingbao.ai[aka. ehaagwlke]
	@date: 2011-01-02
	@version:0.0.0.6
*/

var imgInfoObj = {},
	alt = '--',
	title = '--',
	altTitleStr = '--/--',
	dispWidth = 0,
	dispHeight = 0;

var ciid = chrome.contextMenus.create({
	"type": "normal",
	"title": chrome.i18n.getMessage("contextMenuStr"),
	"contexts": ["image", "link"],
	"onclick": evt
});

chrome.tabs.onSelectionChanged.addListener(function (tid, info) {
	alt = '--',
		title = '--',
		altTitleStr = '--/--',
		dispWidth = 0,
		dispHeight = 0;
});

chrome.extension.onRequest.addListener(function (request) {

});

function evt(info, tab) {
	chrome.tabs.sendMessage(tab.id, {
			method: "getImageInfo"
		},
		function (response) {
			alt = response.alt ? response.alt : '--';
			title = response.title ? response.title : '--';
			altTitleStr = alt + ' / ' + title;

			dispWidth = response.dispWidth ? response.dispWidth : 0;
			dispHeight = response.dispHeight ? response.dispHeight : 0;

			//the location of the image
			var imgSrc = response.srcUrl,

				//image src link type, base64 or ordinary link
				linkType,

				//image url length, the window width will be the url length times 7
				linkLength,

				//url of the tab which the image embedded
				tabUrl = response.tabUrl,

				//the width and height of the popup window
				popWinWidth,
				popWinHeight;

			linkType = (imgSrc.indexOf('data:image/') == 0 && imgSrc.indexOf('base64') > -1) ?
				"base64" : "normal";

			linkLength = linkType == "normal" ? imgSrc.length : 75;

			popWinWidth = linkLength < 75 ? linkLength * 8 + 100 : 800;
			popWinHeight = 220;

			chrome.windows.create({
				"type": "popup",
				"url": "view/vii.html",
				"width": popWinWidth,
				"height": popWinHeight
			});

			imgInfoObj = {
				"imgSrc": imgSrc,
				"linkType": linkType,
				"tabUrl": tabUrl,
				"popWinWidth": popWinWidth,
				"popWinHeight": popWinHeight,
				"linkLength": linkLength,
				"altTitleStr": altTitleStr,
				"dispWidth": dispWidth,
				"dispHeight": dispHeight
			};
	});
}