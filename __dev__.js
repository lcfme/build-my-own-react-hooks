/*
import { createElement } from './src/createElement'
import { render } from './src/render'

const vnode = createElement('div', null, 'Hello World')

render(vnode, document.querySelector('#app'))

const newVNode = createElement('div', null, 'vdom')

setTimeout(() => {
  debugger
  render(newVNode, document.querySelector('#app'))
}, 1000)
*/

import { createElement } from './src/createElement'
import { render } from './src/render'
import { useState } from './src/hooks'

function App() {
  const [greetText, setGreetingText] = useState('Hello world')
  window.setGreetingText = setGreetingText
  return createElement('div', null, greetText)
}

const vnode = createElement(App, null)
debugger
render(vnode, document.querySelector('#app'))
