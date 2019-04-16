import { HTMLNodeObject, HTMLAttribute } from './Interfaces';

class HTMLNode {

	private _node: HTMLNodeObject;

	private _childs: Array<HTMLNode>;

	private _element: Element;

	constructor(node: HTMLNodeObject, childs: Array<HTMLNode> = []) {
		this._node = node;
		this._childs = childs;
		this._element = this.createElement();
	}

	private createElement(): Element {
		const element = document.createElement(this._node.tagName);

		this._node.attributes.forEach((attr: HTMLAttribute) => {
			element.setAttribute(attr.name, attr.value);
		});

		this._childs.forEach((child: HTMLNode) => {
			element.appendChild(child.element);
		});

		if(this._node.content !== undefined) {
			element.innerText = this._node.content;
		}

		return element;
	}

	public find(name: string, next: HTMLNode | null = null): HTMLNode | null {
		// TODO multiple elements search

		if(next === null) {
			next = this;
		} 

		if(next._node.name === name) {
			return next;
		}

		let i: number = 0;

		for(i; i < next._childs.length; i++) {
			if(next._childs[i].find(name) !== null) {
				return next._childs[i].find(name);
			}
		}

		return null;
	}

	public childElements(): Array<Element> {
		return this._childs.map((child: HTMLNode) => child.element);
	}

	get element() {
		return this._element;
	}
}

export default HTMLNode;