import React, { useState, useMemo, useCallback } from "react"
import {
  message, List, Collapse, Button,
} from "antd"
import MainBtn from "@Comps/MainBtn"
import { Poper } from "@Comps/Poper"
import { ImgPlayer, AudioPlayer, VideoPlayer } from "@Comps/MediaPlayer"
import { sniffAll, geneDefaultSrcs } from "@Utils/sniff"
import { useDyingDuck } from "use-ducks"
import { isProduction } from "@Src/global"

import Styles from "./index.module.scss"

const { Panel } = Collapse

function calcFrameLevel(frameWindow: Window, n = 0): number {
  if (frameWindow === frameWindow.top) {
    return n
  }
  return calcFrameLevel(frameWindow.parent, n + 1)
}

const frameLevel = calcFrameLevel(window)

export default function App() {
  const [srcMap, setSrcList] = useState(geneDefaultSrcs())
  const [poperVisible, setPoperVisible] = useState(false)
  const [isDying, awake] = useDyingDuck(2000)
  const [curImgSrc, setCurImgSrc] = useState("")

  const audioList = useMemo(() => Object.values(srcMap.audio), [srcMap])
  const videoList = useMemo(() => Object.values(srcMap.video), [srcMap])
  const imgList = useMemo(() => Object.values(srcMap.img), [srcMap])
  const audioLen = useMemo(() => audioList.length, [audioList])
  const videoLen = useMemo(() => videoList.length, [videoList])
  const imgLen = useMemo(() => imgList.length, [imgList])

  const updateAssets = useCallback(() => {
    const tempSrcMap = sniffAll(window)
    const tempAudioLen = Object.keys(tempSrcMap.audio).length
    const tempVideoLen = Object.keys(tempSrcMap.video).length
    const tempImgLen = Object.keys(tempSrcMap.img).length
    if (tempAudioLen + tempVideoLen + tempImgLen === 0) {
      message.error("本页内没有找到多媒体资源。")
    } else {
      message.success(`找到 音乐*${tempAudioLen} , 图片*${tempImgLen} , 视频*${tempVideoLen}`)
      setPoperVisible(true)
    }
    setSrcList(tempSrcMap)
    awake()
  }, [awake])

  return (
    <>
      {
        (() => (
          !isProduction && (<>
            <audio style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/音乐.mp3" />
            <video style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/视频.mp4" />
            <img style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/图片1.jpg" alt=""/>
            <img style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/图片2.jpg" alt=""/>
            <img style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/图片3.jpg" alt=""/>
            <img style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/图片4.jpg" alt=""/>
            <img style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/图片5.jpg" alt=""/>
            <img style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/图片6.jpg" alt=""/>
          </>)
        ))()
      }

      <MainBtn
        className={Styles.mainBtn}
        style={{ right: `${frameLevel * 2 + 0.5}em` }}
        content="嗅一嗅"
        icon="search"
        delay={700}
        onClick={updateAssets}
      />

      <Poper state={[poperVisible, setPoperVisible]}>
        <>
          <Collapse
            defaultActiveKey={[
              audioLen > 0 ? "audios" : "",
              imgLen > 0 ? "imgs" : "",
              videoLen > 0 ? "videos" : "",
            ]}
          >
            <Panel header={`音乐 (${audioLen})`} key="audios">
              <List
                dataSource={audioList}
                renderItem={(src, i) => (<div>
                  {i + 1}:
                  <AudioPlayer src={src} />
                </div>)}
              />
            </Panel>
            <Panel header={`图片 (${imgLen})`} key="imgs">
              <List
                style={{
                  paddingRight: "102px",
                  paddingBottom: "102px",
                }}
                dataSource={imgList}
                renderItem={(src) => (<ImgPlayer src={src} active={curImgSrc === src} onClick={() => {
                  if (src === curImgSrc) {
                    setCurImgSrc("")
                  } else {
                    setCurImgSrc(src)
                  }
                }} />)}
              />
            </Panel>
            <Panel header={`视频 (${videoLen})`} key="videos">
              <List
                dataSource={videoList}
                renderItem={(src) => (<div>
                  <VideoPlayer src={src} />
                </div>)}
              />
            </Panel>
          </Collapse>
          {
            isDying && <Button
              type="default"
              shape="circle"
              icon="sync"
              title="再找找看"
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
              }}
              onClick={updateAssets}
            />
          }
        </>
      </Poper>
    </>
  )
}
