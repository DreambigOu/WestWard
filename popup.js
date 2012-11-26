// ---- Original by Jim--------------
// chrome.browserAction.onClicked.addListener(
// 	function (tab) {
// 		chrome.tabs.executeScript(tab.id, {file: 'jQuery.js'});
// 		chrome.tabs.executeScript(tab.id, {file: "content_scripts.js"});
// 	window.close();
// });
// ---- Original by Jim END--------------

// console.log('Debug Test');
// console.log(chrome.tabs.executeScript(null, {file: 'jQuery.js'}));
// console.log(chrome.tabs.executeScript(null, {file: "content_scripts.js"}));

function click(e) {
	console.log("click");
  // chrome.tabs.executeScript(null,
  //     {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
	chrome.tabs.executeScript(null,
      {file: "jQuery.js"});
	chrome.tabs.executeScript(null,
      {file: "content_scripts.js"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});