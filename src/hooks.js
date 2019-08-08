import { setState } from './component'

export const hookContext = {
  currentComponent: null,
  currentIndex: null,
}

function getHook(currentIndex) {
  const c = hookContext.currentComponent
  let hook = c._hooks[currentIndex]
  if (hook == null) {
    c._hooks.push({})
  }
  return c._hooks[currentIndex]
}

export function useState(initState = null) {
  const hook = getHook(hookContext.currentIndex++)
  if (hook._component == null) {
    hook._component = hookContext.currentComponent
    hook._ret = [
      initState,
      value => {
        if (hook._ret[0] !== value) {
          hook._ret[0] = value
          setState(hook._component)
        }
      },
    ]
  }
  return hook._ret
}
