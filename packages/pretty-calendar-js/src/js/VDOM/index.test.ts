import { v, isEventProp, extractEventName, setProp, setProps, createElement } from './index';

describe('VDOM', () => {
  it('it should make virtual DOM node', () => {
    const node = 
      v('ul', {className: 'list', style: 'color: #ffffff;'}, 
        v('li', {className: 'list-item'}, 'item 1'),
        v('li', {className: 'list-item'}, 'item 2'),
        v('li', {className: 'list-item'}, 
          v('span', {}, 'item 3')
        )
      );

    expect(JSON.stringify(node)).toEqual('{"type":"ul","props":{"className":"list","style":"color: #ffffff;"},"children":[{"type":"li","props":{"className":"list-item"},"children":["item 1"]},{"type":"li","props":{"className":"list-item"},"children":["item 2"]},{"type":"li","props":{"className":"list-item"},"children":[{"type":"span","props":{},"children":["item 3"]}]}]}');
  });

  it('it should check event prop', () => {
    expect(isEventProp('onClick')).toBe(true);
    expect(isEventProp('onFocus')).toBe(true);
    expect(isEventProp('focus')).toBe(false);
  });

  it('it should extract event name', () => {
    expect(extractEventName('onClick')).toEqual('click');
    expect(extractEventName('onFocus')).toEqual('focus');
  });

  it('it should set a regular prop', () => {
    const el = document.createElement('input');
    
    setProp(el, 'some-prop', 'some-value');
    expect(el.getAttribute('some-prop')).toEqual('some-value');

    setProp(el, 'someProp', 'someValue');
    expect(el.getAttribute('someProp')).toEqual('someValue');
  });

  it('it should set a className prop', () => {
    const el = document.createElement('input');
    
    setProp(el, 'className', 'some-class');
    expect(el.getAttribute('class')).toEqual('some-class');
  });

  it('it should set an event prop', () => {
    const el = document.createElement('button');
    const cb = jest.fn();
    
    setProp(el, 'onClick', cb);
    el.click();
    expect(cb).toBeCalledTimes(1);
  });

  it('it should set the boolean prop', () => {
    const el = document.createElement('button');
    const cb = jest.fn();

    el.addEventListener('click', cb);

    el.click();
    expect(cb).toBeCalledTimes(1);

    setProp(el, 'disabled', true);
    expect(el.getAttribute('disabled')).toEqual('');
    expect(el['disabled']).toBe(true);

    el.click();
    expect(cb).toBeCalledTimes(1);

    setProp(el, 'disabled', false);
    expect(el.getAttribute('disabled')).toEqual(null);
    expect(el['disabled']).toBe(false);

    setProp(el, 'unknown', true);
    expect(el.getAttribute('unknown')).toEqual(null)
    expect(el['unknown']).toBe(true);

    setProp(el, 'unknown', false);
    expect(el.getAttribute('unknown')).toEqual(null)
    expect(el['unknown']).toBe(false);
  });

  it('it should set props', () => {
    const el = document.createElement('button');
    const cb = jest.fn();

    setProps(el, {
      onClick: cb,
      className: 'some-class',
      someProp: 'some-value',
      disabled: false
    });

    el.click();
    expect(cb).toBeCalledTimes(1);
    expect(el.getAttribute('class')).toEqual('some-class');
    expect(el.getAttribute('someProp')).toEqual('some-value');
    expect(el.getAttribute('disabled')).toEqual(null);
    expect(el['disabled']).toBe(false);
  });

  it('it should create a real DOM', () => {
    const cb = jest.fn();
    const node = 
    v('div', {}, 
      v('fragment', {},
        v('fragment', {},
          v('div', {className: 'some-class'}, 
            v('fragment', {},
              v('input', {value: 'some-value'})
              v('button', {id: 'btn-1', disabled: true, onClick: cb})
              v('button', {id: 'btn-2', disabled: false, onClick: cb})
              v('span', {someProp: 'someValue'})
            )
          )
        )
      )
    );
    
    const tree = createElement(node);
    tree.querySelector('#btn-1').click();
    tree.querySelector('#btn-2').click();

    expect(cb).toBeCalledTimes(1);
    expect(tree.outerHTML).toEqual('<div><div class="some-class"><input value="some-value"><button id="btn-1" disabled=""></button><button id="btn-2"></button><span someprop="someValue"></span></div></div>')
  });  
});
