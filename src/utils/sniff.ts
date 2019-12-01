import { message } from "antd"
import { splitQuery } from "@Utils/url"

export interface SrcMap {
  audio: {
    [key: string]: string;
  };
  video: {
    [key: string]: string;
  };
  img: {
    [key: string]: string;
  };
}

export function geneDefaultSrcs(): SrcMap {
  return {
    audio: {},
    video: {},
    img: {},
  }
}

export function deepCopySrcMap(map: SrcMap): SrcMap {
  return {
    audio: { ...map.audio },
    video: { ...map.video },
    img: { ...map.img },
  }
}

export function sniff(frameWindow: Window, oldSrcs: SrcMap) {
  const newSrcs = deepCopySrcMap(oldSrcs)
  let doc: Document
  try {
    doc = frameWindow.document
  } catch (err) {
    console.error(err)
    message.error("跨域了, 所以看不到子页面的资源.")
    return newSrcs
  }
  const allAudios = doc.querySelectorAll("audio")
  const allVideos = doc.querySelectorAll("video")
  const allImgs = doc.querySelectorAll("img")
  for (let i = 0, len = allAudios.length; i < len; i += 1) {
    const src = allAudios[i].getAttribute("src")
    if (src && !/^blob/.test(src)) {
      const [pathname] = splitQuery(src)
      newSrcs.audio[pathname] = src
    }
  }
  for (let i = 0, len = allVideos.length; i < len; i += 1) {
    const src = allVideos[i].getAttribute("src")
    if (src && !/^blob/.test(src)) {
      const [pathname] = splitQuery(src)
      newSrcs.video[pathname] = src
    }
  }
  for (let i = 0, len = allImgs.length; i < len; i += 1) {
    const src = allImgs[i].getAttribute("src")
    if (src && !/^blob/.test(src)) {
      const [pathname] = splitQuery(src)
      newSrcs.img[pathname] = src
    }
  }
  return newSrcs
}

export function sniffAll(frameWindow: Window, oldSrcs: SrcMap = geneDefaultSrcs()) {
  let srcs = sniff(frameWindow, oldSrcs)
  for (let i = 0, len = frameWindow.frames.length; i < len; i += 1) {
    const childWindow = frameWindow.frames[i]
    srcs = sniffAll(childWindow, srcs)
  }
  return srcs
}
