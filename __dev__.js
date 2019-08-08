import { createElement } from './src/createElement'
import { render } from './src/render'

const vnode = createElement('div', null, 'Hello World')

render(vnode, document.querySelector('#app'))

const newVNode = createElement('div', null, 'vdom')

setTimeout(() => {
  debugger
  render(newVNode, document.querySelector('#app'))
}, 1000)
