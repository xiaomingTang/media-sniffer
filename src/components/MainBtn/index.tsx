import React, { useState, useEffect, useCallback } from "react"
import { Button } from "antd"
import { ButtonProps } from "antd/lib/button"

import Styles from "./index.module.scss"

interface Props extends ButtonProps {
  content: string;
  delay?: number;
  icon?: string;
}

export default function MainBtn({
  content, delay = 3000, icon = "menu", ...props
}: Props) {
  const [active, setActive] = useState(true)
  const [isHover, setIsHover] = useState(false)
  const [timer, setTimer] = useState(-1)

  const clearTimer = useCallback(() => {
    if (timer !== -1) {
      clearTimeout(timer)
      setTimer(-1)
    }
  }, [timer])

  const onEnter = useCallback(() => {
    setIsHover(true)
  }, [])

  const onLeave = useCallback(() => {
    setIsHover(false)
  }, [])

  useEffect(() => {
    if (!active && isHover) {
      clearTimer()
      setActive(true)
    }
    if (active && !isHover && (timer === -1)) {
      const t = window.setTimeout(() => {
        clearTimer()
        setActive(false)
      }, delay)
      setTimer(t)
    }
  }, [active, isHover, delay, timer, clearTimer])

  return <Button
    {...props}
    type="primary"
    shape={active ? undefined : "circle"}
    icon={icon}
    onMouseEnter={() => onEnter()}
    onMouseLeave={() => onLeave()}
  >
    <div className={`${active ? "" : Styles.inactive} ${Styles.innerBox}`}>
      {content}
    </div>
  </Button>
}
