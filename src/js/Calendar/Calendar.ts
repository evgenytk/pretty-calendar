import '../Extensions/Date';
import API from './API';
import Grid, { WeekdaysEnum } from '@pretty-calendar/grid';
import State from '../State/State';
import MonthState from '../State/MonthState';
import Publisher from '../Publisher/Publisher';
import { CalendarOptions } from './CalendarOptions';

class Calendar {

  /**
   * Main calendar options.
   * 
   * @type {CalendarOptions}
   */
  public options: CalendarOptions;

  /**
   * Default calendar options.
   * 
   * @type {CalendarOptions}
   */
  static defaultOptions: CalendarOptions = {
    firstDay: WeekdaysEnum.MONDAY
  }

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
   * Calendar API.
   * 
   * @type {API}
   */
  public api: API;

  /**
   * Root HTML node.
   * 
   * @type {Element}
   */
  private root: Element;

  /**
   * Initializing.
   * 
   * @param {string | Element} node
   * @param {object = {}}    options
   */
  constructor(node: any, options: object = {}) {
    this.options = {
      ...Calendar.defaultOptions,
      ...options
    }

    this.grid = new Grid({
      firstDay: this.options.firstDay
    });
    this.api = new API(this);
    this.publisher = new Publisher();
    this.state = new MonthState(this);
    this.scope = this.options.selectedDate || new Date;
    this.root = this.findRoot(node);
    this.updateRoot();
    this.updateEventListeners();
  }

  // TODO: validation for incorrect options

  /**
   * Finding the root HTML node in DOM.
   * 
   * @param  {string | Element}     node [description]
   * @return {Element}     [description]
   */
  private findRoot(node: any): Element {
    if(typeof node === 'string') {
      const findedNode = document.querySelector(node);

      if(findedNode === null) {
        throw new Error(`${node} not found`);
      }

      return findedNode;
    }

    if(node instanceof HTMLElement) {
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
    if(event.target !== undefined) {
      if(event.target.classList.contains('pc-pointer-left')) {
        this.state.handleLeftClick();
        this.publisher.notify('prev');
      }

      if(event.target.classList.contains('pc-pointer-right')) {
        this.state.handleRightClick();
        this.publisher.notify('next');
      }

      if(event.target.classList.contains('pc-title')) {
        this.state.handleCenterClick();
      }

      if(event.target.classList.contains('pc-cell')) {
        this.state.handleDateClick(event.target);
      }
    }
  }

  /**
   * Updating the state, the root HTML node and reinit event listeners.
   * 
   * @param {State} state [description]
   */
  public updateState(state: State): void {
    this.state = state;
    this.updateRoot();
    this.updateEventListeners();
  }

  /**
   * Updating the root HTML node by a content coming from the render() method.
   */
  private updateRoot(): void {
    if(this.root.tagName === 'INPUT') {
      // TODO ...
    } else {
      this.root.innerHTML = this.render();
    }
  }

  /**
   * Alias for Publisher.subscribe method.
   * 
   * @param  {string}   eventType
   * @param  {Function} callback
   * @return {Function}
   */
  public on(eventType: string, callback: Function): Function {
    return this.publisher.subscribe(eventType, callback);
  }

  /**
   * Alias for Publisher.unsubscribe method.
   * 
   * @param  {string}   eventType
   * @param  {Function} callback
   * @return {Function}
   */
  public unsubscribe(eventType: string, callback: Function): void {
    this.publisher.unsubscribe(eventType, callback);
  }

  /**
   * Rendering HTML content.
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

    // return `
    //   <div class="pc-wrapper">
    //     <div class="pc-container">
    //       <div class="pc-row">
    //         <label class="pc-form-group">
    //           Date
    //           <input type="text" class="pc-input" value="03.04.2019">
    //         </label>
    //         <label class="pc-form-group">
    //           Time
    //           <input type="text" class="pc-input" placeholder="00:00:00">
    //         </label>
    //       </div>
    //       ${this.state.render()}
    //     </div>
    //   </div>
    // `;
  }
}

export default Calendar;