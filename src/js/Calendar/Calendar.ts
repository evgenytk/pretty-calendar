import Core from '../Core/Core';
import HTMLNode from '../HTML/HTMLNode';
import { WeekdaysEnum } from '../Core/Enums';
import { Weekday } from '../Core/Interfaces';
import { CalendarViewEnum } from './Enum';
import { CalendarOptions, CalendarNodes } from './Interfaces';

class Calendar {

	private _rootNode: Element;

	private _nodes: CalendarNodes;

	private _options: CalendarOptions;

	private _core: Core;

	private _view: CalendarViewEnum;

	static defaultOptions: CalendarOptions = {
		minDate: new Date('1970-01-01'),
		maxDate: new Date('2100-01-01'),
		// selectedDate: new Date(),
		firstDay: WeekdaysEnum.MONDAY,
		dateInput: false,
		timeInput: false,
		hours24: true,
		onChange: () => null
	}

	constructor(node: string | Element, options: object = {}) {
		this._rootNode = this.findRootNode(node);
		this._options = {
			...Calendar.defaultOptions,
			...options
		};
		this._nodes = this.makeNodes();
		this._core = new Core(this._options);
		this._view = CalendarViewEnum.MONTH;
		this.renderRoot(this._rootNode, this._nodes.wrapper);
		this.initEventListeners(this._rootNode);
		this.updateGrid(this._core);

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
		switch(this._view) {
			case CalendarViewEnum.MONTH: 
				this.updateDays(core)
				break;
			case CalendarViewEnum.YEAR:
				// TODO
				break;
			case CalendarViewEnum.DECADE:
				// TODO
				break;
			default:
				throw new Error(`Unknown view "${this._view}"`);
		}
	}

	private updateDays(core: Core): void {
		const incoming = new Date();

		const dates = core.monthView(incoming),
			  weeks = core.getWeekdays(),
			  cells: Array<Element> = [];

		weeks.forEach((week: Weekday) => {
			cells.push(
				new HTMLNode({
					name: 'week',
					tagName: 'div',
					attributes: [{
						name: 'class',
						value: 'pc-cell light'
					}],
					content: week.name
				}).element
			)
		});

		dates.forEach((date: Date, i, array) => {
			let className = 'pc-cell';

			if(!date.dayInMonth(incoming)) {
				className += ' light';
			}

			if(date.isToday()) {
				className += ' active';
			}

			cells.push(
				new HTMLNode({
					name: 'cell',
					tagName: 'div',
					attributes: [{
						name: 'class',
						value: className
					}],
					content: date.getDate().toString()
				}).element
			)
		});

		this.render(this._nodes.plate, cells);
	}

	// private updateMonths(days: Array<Day>): void {
		
	// }

	// private updateYears(days: Array<Day>): void {
		
	// }	
}

export default Calendar;
