// ==UserScript==
// @name         哩哔轻小说去除广告拦截检测
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove ad blocking detection
// @author       Zxwy
// @match        *://www.linovelib.com/novel/*/catalog
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==
function rmdom(dom) {
  var observer = new MutationObserver(function (mutations, observer) {
    var stopped = false;
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.tagName) {
          if (node.matches(dom)) {
            stopped = true;
            observer.disconnect();
            node.remove();
          }
          else if (node.firstElementChild && node.querySelector(dom)) {
            stopped = true;
            observer.disconnect();
            node.querySelectorAll(dom).forEach(function (el) { return el.remove(); });
          }
        }
      });
    });
    if (stopped) observ();
  });
  function observ() { observer.observe(document, { subtree: true, childList: true }); }
  observ();
}
rmdom('div.container > div > script');
console.log('[linovelib]广告拦截检测已去除');
