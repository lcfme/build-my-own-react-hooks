import { coerceToVNode } from './createElement'
import { diff, unmount, applyRef } from './diff'

export function flatten(maybeArray, array = [], map) {
  if (Array.isArray(maybeArray)) {
    for (let i = 0; i < maybeArray.length; i++) {
      flatten(maybeArray[i], array, map)
    }
    return array
  }
  if (maybeArray != null) {
    array.push(map == null ? maybeArray : map(maybeArray))
  }
  return array
}

export function diffChildren(parentDom, newParentVNode, oldParentVNode, mounts) {
  let newChildren =
    newParentVNode._children || flatten(newParentVNode.props.children, (newParentVNode._children = []), coerceToVNode)
  let oldChildren = oldParentVNode != null ? oldParentVNode._children : []
  let oldChildrenLength = oldChildren.length
  let firstDom, newChild, oldChild, newDom, refs, tmp
  for (let i = 0; i < newChildren.length; i++) {
    newChild = newChildren[i]

    if (newChild != null) {
      newChild._parent = newParentVNode
      newChild._depth = newParentVNode._depth + 1

      oldChild = oldChildren[i]

      if (oldChild === null || (oldChild && newChild.ref === oldChild.ref && newChild.type === oldChild.type)) {
        oldChildren[i] = undefined
      } else {
        for (let i = 0; i < oldChildrenLength; i++) {
          oldChild = oldChildren[i]
          if (oldChild && oldChild.ref === newChild.ref && oldChild.type === newChild.type) {
            oldChildren[i] = undefined
            break
          }
          oldChild = null
        }
      }

      newDom = diff(parentDom, newChild, oldChild, mounts)

      if (oldChild == null || (tmp = newChild.ref) !== oldChild.ref) {
        ;(refs || (refs = [])).push(tmp, newChild._component || newDom, newChild)
      }

      if (newDom != null) {
        firstDom = firstDom || newDom

        if (oldChild == null || newDom != oldChild._dom) {
          parentDom.appendChild(newDom)
        }
      }
    }
  }
  newParentVNode._dom = firstDom

  for (let i = 0; i < oldChildrenLength; i++) {
    if (oldChildren[i] != null) {
      unmount(oldChildren[i])
    }
  }

  if (refs != null) {
    for (let i = 0; i < refs.length; i++) {
      applyRef(refs[i], refs[++i], refs[++i])
    }
  }
}
