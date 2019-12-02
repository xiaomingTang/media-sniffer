import React from "react"
import ReactDOM from "react-dom"

import App from "@Comps/App"
import { isProduction } from "@Src/global"

import Styles from "@Src/index.module.scss"

function main() {
  const rootDom = document.createElement("div")
  rootDom.className = Styles.rootDom
  document.body.appendChild(rootDom)

  ReactDOM.render(
    <App />,
    rootDom,
  )
}

function devMain(url: string) {
  document.body.style.overflow = "hidden"
  const devRootDom = document.createElement("iframe")
  devRootDom.width = "100%"
  devRootDom.height = "100%"
  devRootDom.src = url
  document.body.appendChild(devRootDom)
}

function isTop() {
  try {
    return window === window.top
  } catch (err) {
    return false
  }
}

// if (!isProduction && isTop()) {
//   devMain("https://www.baidu.com/")
// }

main()
