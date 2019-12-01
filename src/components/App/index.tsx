import React, { useState, useMemo } from "react"
import {
  message, List, Collapse,
} from "antd"
import MainBtn from "@Comps/MainBtn"
import { Poper } from "@Comps/Poper"
import { ImgPlayer, AudioPlayer, VideoPlayer } from "@Comps/MediaPlayer"
import { sniffAll, geneDefaultSrcs } from "@Utils/sniff"
import Styles from "./index.module.scss"

const { Panel } = Collapse

export default function App() {
  const [srcMap, setSrcList] = useState(geneDefaultSrcs())
  const [poperVisible, setPoperVisible] = useState(false)

  const audioList = useMemo(() => Object.values(srcMap.audio), [srcMap])
  const videoList = useMemo(() => Object.values(srcMap.video), [srcMap])
  const imgList = useMemo(() => Object.values(srcMap.img), [srcMap])
  const audioLen = useMemo(() => audioList.length, [audioList])
  const videoLen = useMemo(() => videoList.length, [videoList])
  const imgLen = useMemo(() => imgList.length, [imgList])

  return (
    <>
      {/* <audio style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/音乐.mp3" />
      <video style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/视频.mp4" />
      <img style={{ width: 0, height: 0, overflow: "hidden" }} src="./assets/图片.jpg" alt=""/> */}

      <MainBtn
        className={Styles.mainBtn}
        content="嗅一嗅"
        icon="search"
        delay={700}
        onClick={() => {
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
        }}
      />

      <Poper state={[poperVisible, setPoperVisible]}>
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
              dataSource={imgList}
              renderItem={(src) => (<ImgPlayer src={src} />)}
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
      </Poper>
    </>
  )
}
