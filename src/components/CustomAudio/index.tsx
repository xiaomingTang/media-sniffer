import React from "react"
import { ButtonProps } from "antd/lib/button"

interface Props extends React.AudioHTMLAttributes<HTMLAudioElement> {
  title: string;
  queryPlay: boolean;
}

export default function Audio({
  title, queryPlay, ...props
}: Props) {
  return <audio {...props} />
}
