import { createElement } from './createElement'
describe('createElement', function() {
  test('<div />', function() {
    const vnode = createElement('div', null)
    expect(vnode.type).toBe('div')
  })
  test('<div>hello world</div>', function() {
    let str = 'hello world'
    const vnode = createElement('div', null, str)
    const firstChild = vnode.props.children[0]
    expect(firstChild).toBe(str)
  })
  test('<div>{null}</div>', function() {
    const vnode = createElement('div', null, null)
    let firstChild = vnode.props.children[0]
    expect(firstChild).toBe(null)
  })
  test('<div><div /><div /></div>', function() {
    const vnode = createElement('div', null, createElement('div', null), createElement('div', null))
    let children = vnode.props.children
    expect(children[0].type).toBe('div')
    expect(children[1].type).toBe('div')
    expect(children[2]).toBe(undefined)
  })
})
