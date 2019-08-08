import { component } from './component'
import { flatten, diffChildren } from './diffChildren'
import { coerceToVNode, Fragment } from './createElement'
import { hookContext } from './hooks'
export function diff(parentDom, newVNode, oldVNode, mounts = []) {
  if (typeof newVNode.type === 'function') {
    let c, tmp, isTopLevelFragment
    if (oldVNode != null) {
      c = newVNode._component = oldVNode._component
    } else {
      c = newVNode._component = component()
    }
    c.props = newVNode.props
    c._vnode = newVNode
    c._parentDom = parentDom

    hookContext.currentComponent = c
    hookContext.currentIndex = 0
    tmp = newVNode.type(newVNode.props)
    hookContext.currentComponent = null
    hookContext.currentIndex = null
    c._isNew = c._dirty = false
    isTopLevelFragment = tmp != null && tmp.type === Fragment && tmp.key == null
    flatten(isTopLevelFragment ? tmp.props.children : tmp, (newVNode._children = []), coerceToVNode)
    diffChildren(parentDom, newVNode, oldVNode, mounts)
  } else {
    newVNode._dom = diffElement(newVNode, oldVNode, mounts)
  }
  return newVNode._dom
}

function diffElement(newVNode, oldVNode, mounts) {
  let dom = oldVNode ? oldVNode._dom : null
  if (dom == null) {
    if (newVNode.type == null) {
      dom = document.createTextNode(newVNode.props)
    } else {
      dom = document.createElement(newVNode.type)
    }
  }
  if (newVNode.type == null) {
    if (oldVNode != null && newVNode.props != oldVNode.props) dom.data = newVNode.props
  } else {
    diffChildren(dom, newVNode, oldVNode, mounts)
  }
  return dom
}

export function unmount(vnode) {}

export function applyRef(ref, value, vnode) {
  try {
    if (typeof ref === 'function') ref(value)
    else ref.current = value
  } catch (err) {}
}
