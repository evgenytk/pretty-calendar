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
 * 
 */
class Calendar {

  /**
   * Default calendar options.
   *
   * @type {ICalendarOptions}
   */
  private static defaultOptions: ICalendarOptions = {
    firstDay: WeekdaysEnum.MONDAY,
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

    this.grid = new Grid({
      firstDay: this.options.firstDay,
    });
    this.publisher = new Publisher();
    this.state = new MonthState(this);
    this.scope = this.options.selectedDate || new Date();
    this.root = this.findRoot(node);
    this.updateRoot();
    this.updateEventListeners();
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
    this.updateEventListeners();
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
    this.updateEventListeners();
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
    this.updateEventListeners();
  };

  /**
   * Move to prev scope.
   */
  public prev = (): void => {
    this.state.handleLeftClick();
    this.publisher.notify('prev');
  }

  /**
   * Move to next scope.
   */
  public next = (): void => {
    this.state.handleRightClick();
    this.publisher.notify('next');
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
  private findRoot(node: any): Element {
    if (typeof node === 'string') {
      const findedNode = document.querySelector(node);

      if (findedNode === null) {
        throw new Error(`${node} not found`);
      }

      return findedNode;
    }

    if (node instanceof HTMLElement) {
      return node;
    }

    throw new Error('Invalid type');
  }

  /**
   * Initialization event listeners.
   */
  private updateEventListeners(): void {
    this.root.removeEventListener('click', this.handleClickEvents);
    this.root.addEventListener('click', this.handleClickEvents);
  }

  /**
   * Handling click events.
   *
   * @type {[type]}
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
    if (this.root.tagName === 'INPUT') {
      // TODO ...
    } else {
      this.root.innerHTML = this.render();
    }
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
