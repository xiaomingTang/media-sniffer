import "url-polyfill"

const defaultBase = window.location.href

export function parseUrl(path: string, base = defaultBase) {
  return new URL(path, base)
}

export function parseAssetName(path: string, base = defaultBase) {
  const { pathname } = parseUrl(path, base)
  const arr = pathname.split("/")
  return window.decodeURIComponent(arr[arr.length - 1])
}

export function splitQuery(path: string, base = defaultBase) {
  const {
    protocol, host, pathname, search,
  } = parseUrl(path, base)
  let a = ""
  let b = ""
  if (protocol) {
    a += `${protocol}//`
  }
  if (host) {
    a += host
  }
  if (pathname) {
    a += pathname
  }
  if (search) {
    b = search
  }
  return [a, b]
}
