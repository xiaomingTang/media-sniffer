/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { useState, useEffect } from "react"

export interface Size {
  width: number;
  height: number;
}

export const defaultSize: Size = { width: 0, height: 0 }

/**
 * size.width:
 *    0：加载中
 *   -1: 加载失败
 *  > 0: 加载成功
 */
export function useCheckImgInfo(src: string) {
  const [size, setSize] = useState<Size>(defaultSize)
  useEffect(() => {
    let img = new Image()
    function onLoad() {
      setSize({ width: img.width, height: img.height })
      img.removeEventListener("load", onLoad)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      img.removeEventListener("error", onError)
      // @ts-ignore
      img = null
    }
    function onError() {
      setSize({ width: -1, height: -1 })
      img.removeEventListener("load", onLoad)
      img.removeEventListener("error", onError)
      // @ts-ignore
      img = null
    }
    img.addEventListener("load", onLoad)
    img.addEventListener("error", onError)
    img.src = src
    return () => {
      if (img) {
        img.removeEventListener("load", onLoad)
        img.removeEventListener("error", onError)
      }
    }
  }, [src])
  return { size }
}

/**
 * duration:
 *    0：加载中
 *   -1: 加载失败
 *  > 0: 加载成功
 */
export function useCheckAudioInfo(src: string) {
  const [duration, setDuration] = useState(0)
  let audio = document.createElement("audio")
  function onDurationChange() {
    setDuration(audio.duration)
    audio.removeEventListener("durationchange", onDurationChange)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    audio.removeEventListener("error", onError)
    // @ts-ignore
    audio = null
  }
  function onError() {
    setDuration(-1)
    audio.removeEventListener("durationchange", onDurationChange)
    audio.removeEventListener("error", onError)
    // @ts-ignore
    audio = null
  }
  useEffect(() => {
    audio.addEventListener("durationchange", onDurationChange)
    audio.addEventListener("error", onError)
    return () => {
      if (audio) {
        audio.removeEventListener("durationchange", onDurationChange)
        audio.removeEventListener("error", onError)
      }
    }
  })
  audio.src = src
  return { duration }
}

/**
 * duration:
 *    0：加载中
 *   -1: 加载失败
 *  > 0: 加载成功
 */
export function useCheckVideoInfo(src: string) {
  const [duration, setDuration] = useState(0)
  let video = document.createElement("video")
  function onDurationChange() {
    setDuration(video.duration)
    video.removeEventListener("durationchange", onDurationChange)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    video.removeEventListener("error", onError)
    // @ts-ignore
    video = null
  }
  function onError() {
    setDuration(-1)
    video.removeEventListener("durationchange", onDurationChange)
    video.removeEventListener("error", onError)
    // @ts-ignore
    video = null
  }
  useEffect(() => {
    video.addEventListener("durationchange", onDurationChange)
    video.addEventListener("error", onError)
    return () => {
      if (video) {
        video.removeEventListener("durationchange", onDurationChange)
        video.removeEventListener("error", onError)
      }
    }
  })
  video.src = src
  return { duration }
}

export function friendlyTime(sec: number) {
  const n = Math.floor(sec)
  const h = Math.floor(n / 3600)
  const min = Math.floor(n / 60)
  const s = Math.floor(n % 60)
  let result = ""
  if (h > 0) {
    result += `${h}时`
  }
  if (min > 0) {
    result += `${min}分`
  }
  result += `${s}秒`
  return result
}
