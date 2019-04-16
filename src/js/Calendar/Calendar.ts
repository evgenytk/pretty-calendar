import Core from '../Core/Core';
import HTMLNode from '../HTML/HTMLNode';
import { WeekdaysEnum, CalendarStatesEnum } from '../Core/Enums';
import { Day } from '../Core/Interfaces';
import { CalendarOptions, CalendarNodes } from './Interfaces';

class Calendar {

	private rootNode: Element;

	private nodes: CalendarNodes;

	private options: CalendarOptions;

	private core: Core;

	static defaultOptions: CalendarOptions = {
		minDate: new Date('1970-01-01'),
		maxDate: new Date('2100-01-01'),
		selectedDate: new Date(),
		firstDay: WeekdaysEnum.MONDAY,
		dateInput: false,
		timeInput: false,
		hours24: true,
		onChange: () => null
	}

	constructor(node: string | Element, options: object = {}) {
		this.rootNode = this.findRootNode(node);
		this.options = {
			...Calendar.defaultOptions,
			...options
		};
		this.nodes = this.makeNodes();
		this.core = new Core(this.options);
		this.renderRoot(this.rootNode, this.nodes.wrapper);
		this.initEventListeners(this.rootNode);
		this.updateGrid(this.core);

		console.log(this)
	}

	private findRootNode(node: string | Element): Element {
		if(typeof node === 'string') {
			const findedNode = document.querySelector(node);

			if(findedNode === null) {
				throw new Error(`${node} not found`);
			}

			return findedNode;
		}

		return node;
	}

	private makeNodes(): CalendarNodes {
		const plate = new HTMLNode({
			name: 'plage',
			tagName: 'div',
			attributes: [{
				name: 'class',
				value: 'pc-plate pc-plate-days'
			}]
		});

		const left = new HTMLNode({
			name: 'left',
			tagName: 'button',
			attributes: [{
				name: 'class',
				value: 'pc-pointer pc-pointer-left'
			}]
		});

		const center = new HTMLNode({
			name: 'center',
			tagName: 'button',
			attributes: [{
				name: 'class',
				value: 'pc-title'
			}]
		});

		const right = new HTMLNode({
			name: 'right',
			tagName: 'button',
			attributes: [{
				name: 'class',
				value: 'pc-pointer pc-pointer-right'
			}]
		});

		const controls = new HTMLNode({
			name: 'controls',
			tagName: 'div',
			attributes: [{
				name: 'class',
				value: 'pc-controls'
			}]
		}, [left, center, right]);

		const row = new HTMLNode({
			name: 'row',
			tagName: 'nav',
			attributes: [{
				name: 'class',
				value: 'pc-row'
			}]
		});

		const container = new HTMLNode({
			name: 'container',
			tagName: 'div',
			attributes: [{
				name: 'class',
				value: 'pc-container'
			}]
		}, [row, controls, plate]);

		const wrapper = new HTMLNode({
			name: 'wrapper',
			tagName: 'div',
			attributes: [{
				name: 'class',
				value: 'pc-wrapper'
			}]
		}, [container]);

		return {
			wrapper: wrapper.element,
			container: container.element,
			row: row.element,
			controls: {
				left: left.element,
				center: center.element,
				right: right.element
			},
			plate: plate.element
		}
	}

	private renderRoot(node: Element, element: Element): void {
		if(node.tagName === 'INPUT') {
			// TODO ...
		} else {
			if(node.parentNode !== null) {
				node.parentNode.insertBefore(element, node.nextSibling);
				node.remove();
			} else {
				throw new Error('....')
			}
		}
	}

	private render(node: Element, element: Element | Array<Element>): void {
		if(Array.isArray(element)) {
			this.renderMany(node, element);
		} else {
			this.renderOne(node, element);
		}
	}

	private renderOne(node: Element, element: Element): void {
		node.innerHTML = '';
		node.appendChild(element)
		const attributes = Array.from(element.attributes);

		attributes.forEach(attr => {
			node.setAttribute(attr.name, attr.value);
		});
	}

	private renderMany(node: Element, elements: Array<Element>): void {
		node.innerHTML = '';

		elements.forEach((element: Element) => {
			node.appendChild(element);
		});
	}

	private initEventListeners(node: Element): void {
		node.addEventListener('click', (event) => {
			console.log('TRIGGERED EVENT')
			console.log(event);
		})
	}

	private updateGrid(core: Core): void {
		switch(core.state) {
			case CalendarStatesEnum.DAYS: 
				this.updateDays(core.filter())
				break;
			case CalendarStatesEnum.MONTHS:
				// TODO
				break;
			case CalendarStatesEnum.YEARS:
				// TODO
				break;
			default:
				throw new Error(`Unknown state "${core.state}"`);
		}
	}

	private updateDays(days: Array<Day>): void {
		const cells: Array<Element> = [];

		const { selectedDate } = this.options;

		days.forEach((day: Day, i, array) => {
			let className = 'pc-cell';

			if(selectedDate.getMonth() + 1 !== day.month) {
				className += ' light';
			}

			cells.push(
				new HTMLNode({
					name: 'cell',
					tagName: 'div',
					attributes: [{
						name: 'class',
						value: className
					}],
					content: day.day.toString()
				}).element
			)
		});

		// console.log(this.nodes)

		this.render(this.nodes.plate, cells);
	}

	// private updateMonths(days: Array<Day>): void {
		
	// }

	// private updateYears(days: Array<Day>): void {
		
	// }	
}

export default Calendar;
