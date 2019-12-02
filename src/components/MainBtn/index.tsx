import React, { useEffect, useCallback } from "react"
import { Button } from "antd"
import { ButtonProps } from "antd/lib/button"
import { useTenaciousDuck } from "use-ducks"

import Styles from "./index.module.scss"

interface Props extends ButtonProps {
  content: string;
  delay?: number;
  icon?: string;
}

export default function MainBtn({
  content, delay = 3000, icon = "menu", ...props
}: Props) {
  const [isDying, awake, kill] = useTenaciousDuck(delay)

  const onEnter = useCallback(() => {
    awake()
  }, [awake])

  const onLeave = useCallback(() => {
    kill()
  }, [kill])

  useEffect(kill, [])

  return <Button
    {...props}
    type="primary"
    shape={isDying ? "circle" : undefined}
    icon={icon}
    onMouseEnter={() => onEnter()}
    onMouseLeave={() => onLeave()}
  >
    <div className={`${isDying ? Styles.inactive : ""} ${Styles.innerBox}`}>
      {content}
    </div>
  </Button>
}
