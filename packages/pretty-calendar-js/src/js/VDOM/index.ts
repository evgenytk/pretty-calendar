export interface IVDOMNode {
  type: string;
  props: object;
  children?: any;
}

/**
 * Make virtual DOM node.
 * 
 * @param {string}  type      Tag name
 * @param {object}  props     Node props
 * @param {any}     children  Children VDOM nodes.
 * 
 * @return {IVDOMNode}
 */
export const v = (type: string, props: object, ...children: any): IVDOMNode => {
  return {type, props, children};
}

/**
 * Creating real DOM node based on VDOM node.
 * 
 * @param {any} node  Should have an IVDOMNode type or any other primitive type.
 */
export const createElement = (node: any, $parent: Element | null = null): Node => {
  if(typeof node !== 'object') {
    return document.createTextNode(node);
  }

  if($parent !== null) {
    node.children.forEach((c: any) => {

      // Recursive checking for fragment wrapper
      if(c.type === 'fragment') {
        createElement(c, $parent);
      } else {
        $parent.appendChild(createElement(c));
      }
    });

    return $parent;
  } else {
    const $el: any = document.createElement(node.type);
    setProps($el, node.props);
    // addEventListeners($el, node.props);
    node.children.forEach((c: any) => {

      // Recursive checking for fragment wrapper
      if(c.type === 'fragment') {
        createElement(c, $el)
      } else {
        $el.appendChild(createElement(c))
      }
    });

    return $el;
  }
}

/**
 * Add event listeners to a real DOM node.
 * 
 * @param {Element} $el   DOM node
 * @param {object}  props Props object
 */
// export const addEventListeners = ($el: Element, props: any) => {
//   Object.keys(props).forEach((name: string) => {
//     if(isEventProp(name)) {
//       $el.addEventListener(extractEventName(name), props[name])
//     }
//   })
// }

/**
 * Set props (attributes) to a real DOM node.
 * 
 * @param {Element}  $el       DOM Node
 * @param {object}   props     Props object
 */
export const setProps = ($el: Element, props: any): void => {
  Object.keys(props).forEach(name => {
    setProp($el, name, props[name]);
  });
}

/**
 * Set prop (attribute) to a real DOM node.
 * 
 * @param {Element}  $el       DOM Node
 * @param {name}     name      Prop name
 * @param {value}    children  Prop value
 * 
 * @return {any}
 */
export const setProp = ($el: Element, name: string, value: any): any => {
  if(isEventProp(name)) {
    // Remember! If you'll decide to implement VDOM and props updating features, be careful with event props comparison.
    // That's tricky because there is no easy way to compare functions.
    // 
    // You can handle that with event bubbling or just add event listeners only once.
    $el.addEventListener(extractEventName(name), value);
  } else if(name === 'className') {
    $el.setAttribute('class', value);
  } else if(typeof value === 'boolean') {
    setBooleanProp($el, name, value);
  } else {
    $el.setAttribute(name, value);
  }
}

/**
 * Set boolean prop (attribute) to a real DOM node.
 * 
 * @param {Element}  $el       DOM Node
 * @param {name}     name      Prop name
 * @param {value}    children  Prop value
 * 
 * @return {any}
 */
export const setBooleanProp = ($el: any, name: string, value: any): void => {
  if(value) {
    $el[name] = true;
  } else {
    $el[name] = false;
  }
}

/**
 * Check for event prop.
 * 
 * @param {string} name  Prop name
 * @return {boolean}
 */
export const isEventProp = (name: string): boolean => {
  return /^on/.test(name);
}
  
/**
 * Excracting event name from prop name.
 * 
 * @param {string}  name  Prop name
 * @return {string}
 */
export const extractEventName = (name: string): string => {
  return name.slice(2).toLowerCase();
}
