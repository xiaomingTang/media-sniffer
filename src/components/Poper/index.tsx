import * as React from "react"
import { Button } from "antd"
import { ButtonProps } from "antd/lib/button"

import * as Styles from "./index.module.scss"

interface PoperProps {
    mask?: boolean;
    maskCloseable?: boolean;
    children: React.ReactChild;
    state: [boolean, React.Dispatch<boolean>];
}

interface TriggerProps extends ButtonProps {
    state: [boolean, React.Dispatch<boolean>];
}

export function Poper({
  mask = true, maskCloseable = true, children, state,
}: PoperProps) {
  const [poperVisible, setPoperVisible] = state

  if (!poperVisible) {
    return null
  }

  return <>
    {
      mask && <div
        className={Styles.mask}
        role="button"
        tabIndex={-1}
        onClick={() => {
          if (maskCloseable) {
            setPoperVisible(false)
          }
        }}
      />
    }

    <div className={Styles.poper}>
      <div className={Styles.inner}>
        { children }
      </div>
      <Button icon="close" shape="circle-outline" style={{
        position: "absolute",
        right: "-16px",
        top: "-16px",
      }} onClick={() => {
        setPoperVisible(false)
      }} />
    </div>
  </>
}

export function PoperTrigger({
  state, icon = "info", shape = "circle-outline", ...props
}: TriggerProps) {
  const [poperVisible, setPoperVisible] = state

  if (poperVisible) {
    return null
  }

  return <Button
    onClick={() => {
      setPoperVisible(true)
    }}
    icon={icon}
    shape={shape}
    {...props}
  />
}
