import React from "react"
import ReactDOM from "react-dom"

import App from "@Comps/App"

import Styles from "@Src/index.module.scss"

if (window === window.top) {
  const rootDom = document.createElement("div")
  rootDom.className = Styles.rootDom
  document.body.appendChild(rootDom)

  ReactDOM.render(
    <App />,
    rootDom,
  )
}
