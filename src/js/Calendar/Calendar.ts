import { CalendarOptions, CalendarNodes } from './Interfaces';

import Core from '../Core/Core';
import { WeekdaysEnum, GridViewEnum } from '../Core/Enums';
import { GridView } from '../Core/Interfaces';
import HTMLNode from '../HTML/HTMLNode';


class Calendar {

  private _rootNode: Element;

  private _html: CalendarNodes;

  private _options: CalendarOptions;

  private _core: Core;

  private _gridView: GridViewEnum;

  private _now: Date;

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
    this._now = new Date;
    this._core = new Core(this._options);
    this._gridView = GridViewEnum.MONTH;
    this._html = this.makeHTMLModel();
    this.renderRoot(this._rootNode, this._html.wrapper);
    this.updateView();
    this.initEventListeners();

    // console.log(this)
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

  private makeHTMLModel(): CalendarNodes {
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

  private initEventListeners(): void {
    this._html.wrapper.addEventListener('click', (event) => {
      if(event.target === null || !(event.target instanceof Element)) {
        return null;
      }

      if(event.target.isEqualNode(this._html.controls.left)) {
        this.handleLeftClick();
      }

      if(event.target.isEqualNode(this._html.controls.right)) {
        this.handleRightClick();
      }
    })
  }

  handleLeftClick() {
    // this._viewOffset -= 1;
    this.updateView();
  }

  handleRightClick() {
    // this._viewOffset += 1;
    this.updateView();
  }

  private updateView(): void {
    switch(this._gridView) {
      case GridViewEnum.MONTH: 
        this.updateMonthView();
        break;
      case GridViewEnum.YEAR:
        // TODO
        break;
      case GridViewEnum.DECADE:
        // TODO
        break;
      default:
        throw new Error(`Unknown grid view "${this._gridView}"`);
    }
  }

  private updateMonthView(): void {
    const date: Date = this._now;

    const view: GridView = this._core.monthView(date),
          weeks: Array<string> = this._core.getWeekdays(),
          cells: Array<Element> = [];

    weeks.forEach((week: string) => {
      cells.push(
        new HTMLNode({
          name: 'week',
          tagName: 'div',
          attributes: [{
            name: 'class',
            value: 'pc-cell light'
          }],
          content: week
        }).element
      )
    });

    view.items.forEach((d: Date, i, array) => {
      let className = 'pc-cell';

      if(!d.dayInMonth(date)) {
        className += ' light';
      }

      if(d.isToday()) {
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
          content: d.getDate().toString()
        }).element
      )
    });

    this.render(this._html.plate, cells);
    this.render(
      this._html.controls.center, 
      new HTMLNode({
        name: 'title',
        tagName: 'div',
        attributes: [{
          name: 'class',
          value: 'pc-title'
        }],
        content: `${view.title}`
      }).element
    );
  }

  // private updateMonths(days: Array<Day>): void {
    
  // }

  // private updateYears(days: Array<Day>): void {
    
  // }  
}

export default Calendar;
