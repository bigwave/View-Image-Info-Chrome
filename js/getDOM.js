chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	//debugger;
	//alert('document ' + window.document)
	//alert(request.method + " " + window.document.activeElement.getElementsByTagName("img")[0].getAttribute("src"));
  if (request.method == "getSelection")
    sendResponse({data: window.document.activeElement.getElementsByTagName("img")[0].getAttribute("src")});
  else
    sendResponse({}); // snub them.
});