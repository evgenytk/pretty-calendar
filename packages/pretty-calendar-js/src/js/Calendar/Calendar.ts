import '../Extensions/Date';
import { Grid, WeekdaysEnum } from '@pretty-calendar/core';
import State from '../State/State';
import MonthState from '../State/MonthState';
import YearState from '../State/YearState';
import DecadeState from '../State/DecadeState';
import Publisher from '../Publisher/Publisher';
import { ICalendarOptions } from './ICalendarOptions';

/**
 * Events:
 *
 * prev
 * next
 * state-changed
 * scope-changed
 * date-changed
 * show (TODO test)
 * hide (TODO test)
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

  // TODO: validation for incorrect options

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
    this.publisher.notify('prev');
  };

  /**
   * Move to next scope.
   */
  public next = (): void => {
    this.state.handleRightClick();
    this.publisher.notify('next');
  };

  /**
   * Showing calendar.
   */
  public show = () => {
    const root = <HTMLElement>this.root;

    if(root.style.display !== 'block') {
      root.style.display = 'block';
      this.publisher.notify('show');
    }
  }

  /**
   * Hiding calendar.
   */
  public hide = () => {
    const root = <HTMLElement>this.root;
    root.style.display = 'none';
    this.publisher.notify('hide');
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
    if(this.originalNode.tagName === 'INPUT') {
      window.addEventListener('resize', this.updatePosition);
      document.addEventListener('click', this.handleOutsideClick);
    }

    this.root.addEventListener('click', this.handleClickEvents);
  }

  /**
   * Update calendar position if initialized in <input />.
   */
  private updatePosition = (): void => {
    const originalNode = <HTMLElement>this.originalNode;
    const root = <HTMLElement>this.root;

    root.style.position = 'absolute';
    root.style.top = `${originalNode.offsetTop + originalNode.clientHeight + 10}px`;
    root.style.left = `${originalNode.offsetLeft}px`;
  }

  /**
   * Handle clicks if initialized in <input />.
   */
  private handleOutsideClick = (event: any): void => {
    if (event.target.isSameNode(this.originalNode) || event.target.closest('.pc-wrapper')) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Handling this.root click events.
   */
  private handleClickEvents = (event: any): void => {
    // TODO: Do something with types...
    if (event.target !== undefined) {
      if (event.target.classList.contains('pc-pointer-left')) {
        this.prev();
      }

      if (event.target.classList.contains('pc-pointer-right')) {
        this.next();
      }

      if (event.target.classList.contains('pc-title')) {
        this.state.handleCenterClick();
      }

      if (event.target.classList.contains('pc-cell')) {
        this.state.handleDateClick(event.target);
      }
    }
  };

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
   * Updating the root HTML node by a content coming from the render() method.
   */
  private updateRoot(): void {
    this.root.innerHTML = this.render();
  }

  /**
   * Getting HTML content.
   *
   * @return {string} [description]
   */
  private render(): string {
    return `
      <div class="pc-wrapper">
        <div class="pc-container">
          ${this.state.render()}
        </div>
      </div>
    `;
  }
}

export default Calendar;
