export function createElement(type, props, children) {
  props = Object.assign({}, props)
  const key = props.key
  const ref = props.ref

  if (key) delete props.key
  if (ref) delete props.ref

  if (arguments.length > 2) {
    props.children = [children]
    for (let i = 3; i < arguments.length; i++) {
      props.children.push(arguments[i])
    }
  }

  return createVNode(type, props, key, ref)
}

export function coerceToVNode(maybeVNode) {
  if (maybeVNode == null || typeof maybeVNode === 'boolean') {
    return null
  }
  if (typeof maybeVNode === 'string') {
    return createVNode(null, maybeVNode, null, null)
  }
  return maybeVNode
}

function createVNode(type, props, key, ref) {
  return {
    type,
    props,
    key,
    ref,
    _component: null,
    _children: null,
    _parent: null,
    _depth: 0,
    _dom: null,
  }
}

export function Fragment(props) {
  return props.children
}
