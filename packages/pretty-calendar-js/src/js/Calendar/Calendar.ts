import '../Extensions/Date';
import { Grid, WeekdaysEnum } from '@pretty-calendar/core';
import State from '../State/State';
import MonthState from '../State/MonthState';
import YearState from '../State/YearState';
import DecadeState from '../State/DecadeState';
import Publisher from '../Publisher/Publisher';
import { ICalendarOptions } from './ICalendarOptions';
import { v, createElement } from '../VDOM';

/**
 * Events:
 *
 * prev
 * next
 * state-changed
 * scope-changed
 * date-changed
 * show
 * hide
 *
 */
class Calendar {
  /**
   * Default calendar options.
   *
   * @type {ICalendarOptions}
   */
  private static defaultOptions: ICalendarOptions = {
    
  };

  /**
   * Main calendar options.
   *
   * @type {ICalendarOptions}
   */
  public options: ICalendarOptions;

  /**
   * Grid generator.
   *
   * @type {Grid}
   */
  public grid: Grid;

  /**
   * TODO: create comment here ...
   *
   * @type {Date}
   */
  public scope: Date;

  /**
   * Calendar view state.
   *
   * @type {State}
   */
  public state: State;

  /**
   * Event publisher.
   *
   * @type {Publisher}
   */
  public publisher: Publisher;

  /**
   * The user node.
   * 
   * @type {Element}
   */
  public originalNode: Element;

  /**
   * Root HTML node.
   *
   * @type {Element}
   */
  public root: Element;

  /**
   * Initializing.
   *
   * @param {string | Element} node
   * @param {object = {}}    options
   */
  constructor(node: any, options: object = {}) {
    this.options = {
      ...Calendar.defaultOptions,
      ...options,
    };

    this.checkOptions();

    this.grid = new Grid(this.options.intl);
    this.publisher = new Publisher();
    this.state = new MonthState(this);
    this.scope = this.options.selectedDate || new Date();
    this.originalNode = this.findRoot(node);
    this.root = this.findRoot(node);
    this.transformRoot();
    this.updateRoot();
    this.initEventListeners();
  }

  /**
   * Updating the root HTML node and reinit event listeners.
   *
   * @param {State} state [description]
   */
  public changeState(state: string | State): void {
    if (state instanceof State) {
      this.state = state;
    } else {
      this.state = this.parseState(state);
    }

    this.publisher.notify('state-changed', this.state.constructor.name);
    this.updateRoot();
  }

  /**
   * Changing calendar view scope based on Date and re-render.
   *
   * @param {Date}  Date
   */
  public changeScope = (date: Date): void => {
    this.scope = date;
    this.publisher.notify('scope-changed', this.scope);
    this.updateRoot();
  };

  /**
   * Changing selected date in options and re-render.
   *
   * @param {Date}  date
   */
  public changeDate = (date: Date): void => {
    this.scope = date;
    this.options.selectedDate = date;
    this.publisher.notify('date-changed', date);
    this.updateRoot();
  };

  /**
   * Move to prev scope.
   */
  public prev = (): void => {
    this.state.handleLeftClick();
  };

  /**
   * Move to next scope.
   */
  public next = (): void => {
    this.state.handleRightClick();
  };

  /**
   * Showing calendar.
   */
  public show = () => {
    const root = this.root as HTMLElement;

    if(root.style.display !== 'block') {
      root.style.display = 'block';
      this.publisher.notify('show');
    }
  }

  /**
   * Hiding calendar.
   */
  public hide = () => {
    const root = this.root as HTMLElement;

    if(root.style.display !== 'none') {
      root.style.display = 'none';
      this.publisher.notify('hide');
    }
  }

  /**
   * Alias for Publisher.subscribe method.
   *
   * @param  {string}   eventType
   * @param  {Function} callback
   * @return {Function}
   */
  public on(eventType: string, callback: (payload?: any) => void): () => void {
    return this.publisher.subscribe(eventType, callback);
  }

  /**
   * Alias for Publisher.unsubscribe method.
   *
   * @param  {string}   eventType
   * @param  {Function} callback
   * @return {Function}
   */
  public unsubscribe(eventType: string, callback: () => void): void {
    this.publisher.unsubscribe(eventType, callback);
  }

  /**
   * Finding the root HTML node in DOM.
   *
   * @param  {string | Element}     node [description]
   * @return {Element}     [description]
   */
  private findRoot(node: string | Element): Element {
    if (node instanceof Element) {
      return node;
    } else {
      const findedNode = document.querySelector(node);

      if (findedNode === null) {
        throw new Error(`${node} not found`);
      }

      return findedNode;
    } 
  }

  /**
   * Transforming the root node if initialized in <input />
   * 
   * @param  {Element} node [description]
   * @return {Element}      [description]
   */
  // TODO test
  private transformRoot(): void {
    if (this.root.tagName === 'INPUT') {
      const root = document.createElement('div');

      if(this.root.parentNode === null) {
        throw new Error('...');
      }

      this.root.parentNode.insertBefore(root, this.root.nextSibling);
      this.root = root;
      this.hide();
      this.updatePosition();
    }
  }

  /**
   * Initialization event listeners.
   */
  private initEventListeners(): void {
    // TODO test
    if(this.originalNode.tagName === 'INPUT') {
      window.addEventListener('resize', this.updatePosition);
      document.addEventListener('click', this.handleOutsideClick);
    }
  }

  /**
   * Update calendar position if initialized in <input />.
   */
  // TODO test
  private updatePosition = (): void => {
    const originalNode = this.originalNode as HTMLElement;
    const root = this.root as HTMLElement;

    root.style.position = 'absolute';
    root.style.top = `${originalNode.offsetTop + originalNode.clientHeight + 10}px`;
    root.style.left = `${originalNode.offsetLeft}px`;
  }

  /**
   * Handle clicks if initialized in <input />.
   */
  // TODO test
  private handleOutsideClick = (event: any): void => {
    if (event.target.isSameNode(this.originalNode) || event.target.closest('.pc-wrapper')) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Getting State class based on string.
   *
   * @param  {string} name
   * @return {State}
   */
  private parseState(name: string): State {
    const states: any = {
      MonthState,
      YearState,
      DecadeState,
    };

    if (states[name] === undefined) {
      throw new Error(`Unknown state name. Use the one of this - ${Object.keys(states).join(', ')}`);
    }

    return new states[name](this);
  }

  /**
   * Validation rules for options.
   */
  private checkOptions(): void {
    if (this.options.selectedDate && isNaN(new Date(this.options.selectedDate).getTime())) {
      throw new Error(`"Icorrect selected date`);
    }
  }

  /**
   * Updating the root HTML node by a content coming from the render() method.
   */
  private updateRoot(): void {
    while (this.root.firstChild) {
      this.root.removeChild(this.root.firstChild);
    }

    this.root.appendChild(this.render());
  }

  /**
   * Getting HTML content.
   *
   * @return {string} [description]
   */
  private render(): Node {
    return (
      createElement(
        v('div', {className: 'pc-wrapper'}, 
          v('div', {className: 'pc-container'}, this.state.render())
        )
      )
    );
  }
}

export default Calendar;
