/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from "react"
import { message } from "antd"

import { parseAssetName } from "@Utils/url"
import { isProduction } from "@Src/global"
import {
  useCheckAudioInfo, useCheckImgInfo, useCheckVideoInfo, friendlyTime,
} from "@Src/utils/media"

import Styles from "./index.module.scss"

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

interface AudioProps extends React.ImgHTMLAttributes<HTMLAudioElement> {
  src: string;
}

interface VideoProps extends React.ImgHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function ImgPlayer({ src, ...props }: ImgProps) {
  const { size } = useCheckImgInfo(src)
  const assetName = parseAssetName(src)

  return <div className={Styles.imgWrapper} {...props}>
    <img src={src} className={Styles.img} title={`保存 [${assetName}]`} onClick={() => {
      if (!isProduction) {
        message.error("测试环境没有内置GM_函数")
        return
      }
      // eslint-disable-next-line no-undef
      GM_download(src, assetName)
    }} />
    <div className={Styles.imgHeader}>
      {
        (() => {
          if (size.width === -1) {
            return <>加载失败</>
          }
          if (size.width === 0) {
            return <>加载中...</>
          }
          return <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            title="新窗口中打开"
            className={Styles.imgHeaderLink}
          >
            {`${size.width} * ${size.height}`}
          </a>
        })()
      }
    </div>
  </div>
}

export function AudioPlayer({ src }: AudioProps) {
  const { duration } = useCheckAudioInfo(src)
  const assetName = parseAssetName(src, window.location.href)
  return <a
    href={src}
    title={`新窗口中打开: ${src}`}
    style={{ display: "inline" }}
    rel="noopener noreferrer"
    target="_blank"
  >
    {assetName}
    ---
    {
      (() => {
        if (duration === -1) {
          return "加载错误"
        }
        if (duration === 0) {
          return "加载中..."
        }
        return `总时长 ${friendlyTime(duration)}`
      })()
    }
  </a>
}

export function VideoPlayer({ src, className }: VideoProps) {
  const { duration } = useCheckVideoInfo(src)
  const assetName = parseAssetName(src, window.location.href)

  return <div className={`${Styles.imgWrapper} ${className}`}>
    <video src={src} className={Styles.img} title={`保存 [${assetName}]`} onClick={() => {
      if (!isProduction) {
        message.error("测试环境没有内置GM_函数")
        return
      }
      // eslint-disable-next-line no-undef
      GM_download(src, assetName)
    }} />
    <div className={Styles.imgHeader}>
      {
        (() => {
          if (duration === -1) {
            return "加载错误"
          }
          if (duration === 0) {
            return "加载中..."
          }
          return <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            title="新窗口中打开"
            className={Styles.imgHeaderLink}
          >
            {`总时长 ${friendlyTime(duration)}`}
          </a>
        })()
      }
    </div>
  </div>
}
