## novel-downloader-build
构建最新开发版脚本

### 开发计划
+ 功能优化：
  - 同时选择多个保存参数
  - 选择下载txt或epub格式
  - 未选择的章节名会包含在文件中
+ 站点添加：
  - 主要看issues站点请求，※拒接黄站
+ 其它功能：
  - ...

### 更新日志
#### 2023-07-01
+ 哩哔轻小说 (www.linovelib.com) 新增广告拦截检测
+ 查找了在页面加载前删除元素的脚本，但是JS无法直接转TS
+ 正在尝试整合，油猴脚本如下
```
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

```