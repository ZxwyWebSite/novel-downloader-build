// ==UserScript==
// @name         哩哔轻小说去除广告拦截检测
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Zxwy
// @match        *://www.linovelib.com/novel/*/catalog
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at         document-start
// ==/UserScript==
const DEL_SELECTOR = 'div.container > div > script';
const mo = new MutationObserver(onMutation);
onMutation([{addedNodes: [document.documentElement]}]);
observe();
function onMutation(mutations) {
  let stopped;
  for (const {addedNodes} of mutations) {
    for (const n of addedNodes) {
      if (n.tagName) {
        if (n.matches(DEL_SELECTOR)) {
          stopped = true;
          mo.disconnect();
          n.remove();
        } else if (n.firstElementChild && n.querySelector(DEL_SELECTOR)) {
          stopped = true;
          mo.disconnect();
          for (const el of n.querySelectorAll(DEL_SELECTOR)) el.remove();
        }
      }
    }
  }
  if (stopped) observe();
}
function observe() {
  mo.observe(document, {
    subtree: true,
    childList: true,
  });
}
