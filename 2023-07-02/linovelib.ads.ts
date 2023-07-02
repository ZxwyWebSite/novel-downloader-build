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
function rmdom(dom: string) {
  const observer = new MutationObserver((mutations, observer) => {
    let stopped = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if ((node as Element).tagName) {
          if ((node as Element).matches(dom)) {
            stopped = true;
            observer.disconnect();
            (node as Element).remove();
          } else if ((node as Element).firstElementChild && (node as Element).querySelector(dom)) {
            stopped = true;
            observer.disconnect();
            (node as Element).querySelectorAll(dom).forEach((el) => el.remove());
          }
        }
      });
    });
    if (stopped) observ();
  });
  function observ() { observer.observe(document, { subtree: true, childList: true }) }
  observ();
}
rmdom('div.container > div > script');
console.log('[linovelib]广告拦截检测已去除');
