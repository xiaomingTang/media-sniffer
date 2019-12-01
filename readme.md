# media-sniffer

### description
搜寻当前页面图片、音乐、视频资源的油猴脚本    

![脚本截图](./dist/static/assets/screenshot-1.png)

### 项目特点
- 基于[template-react-tampermonkey](https://github.com/xiaomingTang/template-react-tampermonkey)开发, 可二次开发
- 当前支持
  1. 知乎视频
  2. QQ音乐
  3. 酷狗音乐
  4. 酷我音乐
  5. instagram图片+视频
  6. xiami.com
  7. 西瓜视频
- 当前不支持
  1. 网易云音乐
  2. 千千音乐
  3. emumo.xiami.com
  4. youtube
  5. 腾讯视频
  6. 优酷
  7. pptv
  8. a站
  9. b站
  10. 喜马拉雅
  11. 蜻蜓fm

### warning
- 注意, 图片/视频下载功能是调用的GM_download, 由于浏览器响应问题, 可能有时候点击下载却没反应, 是正常的, 不愿意等的可以点击标题在新页面打开并下载

- 由于不同站点的功能实现千奇百怪, 该脚本只适用部分网站, 可能在一些网站, 你明明就看着一张图片在脸上, 可脚本就是看不见, 这是正常的, 本人不保证脚本适用所有网站
