import { diff } from './diff'

const q = []

function debouncing() {
  let t
  return function(fn) {
    let arg = arguments
    clearTimeout(t)
    t = setTimeout(() => {
      fn(Array.prototype.slice.call(arguments, 1))
    })
  }
}

let debouncingRender = debouncing()

function process() {
  let c
  q.sort((a, b) => b._vnode._depth - a._vnode._depth)
  while ((c = q.pop())) {
    if (c._dirty) doUpdate(c)
  }
}

function doUpdate(c) {
  const vnode = c._vnode,
    parentDom = c._parentDom,
    mounts = []
  diff(parentDom, vnode, Object.assign({}, vnode), mounts)
}

export function component() {
  return {
    props: null,
    _vnode: null,
    _hooks: [],
    _dirty: true,
    _parentDom: null,
  }
}

export function setState(c) {
  c._dirty = true
  q.push(c)
  debouncingRender(process)
}
