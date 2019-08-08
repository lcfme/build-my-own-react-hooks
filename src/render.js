import { Fragment, createElement } from './createElement'
import { diff } from './diff'

export function render(vnode, parentDom) {
  const oldVNode = parentDom._vnode
  const mounts = []
  vnode = createElement(Fragment, null, vnode)
  parentDom._vnode = vnode
  diff(parentDom, vnode, oldVNode, mounts)
}
