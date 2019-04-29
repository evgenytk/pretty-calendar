import '../Extensions/Date';
import API from './API';
import { Grid } from '@pretty-calendar/core';
import State from '../State/State';
import Publisher from '../Publisher/Publisher';
import { CalendarOptions } from './CalendarOptions';
declare class Calendar {
    /**
     * Main calendar options.
     *
     * @type {CalendarOptions}
     */
    options: CalendarOptions;
    /**
     * Default calendar options.
     *
     * @type {CalendarOptions}
     */
    static defaultOptions: CalendarOptions;
    /**
     * Grid generator.
     *
     * @type {Grid}
     */
    grid: Grid;
    /**
     * TODO: create comment here ...
     *
     * @type {Date}
     */
    scope: Date;
    /**
     * Calendar view state.
     *
     * @type {State}
     */
    state: State;
    /**
     * Event publisher.
     *
     * @type {Publisher}
     */
    publisher: Publisher;
    /**
     * Calendar API.
     *
     * @type {API}
     */
    api: API;
    /**
     * Root HTML node.
     *
     * @type {Element}
     */
    root: Element;
    private dateInput;
    /**
     * Initializing.
     *
     * @param {string | Element} node
     * @param {object = {}}    options
     */
    constructor(node: any, options?: object);
    /**
     * Finding the root HTML node in DOM.
     *
     * @param  {string | Element}     node [description]
     * @return {Element}     [description]
     */
    private findRoot;
    /**
     * Initialization event listeners.
     */
    private updateEventListeners;
    /**
     * Handling click events.
     *
     * @type {[type]}
     */
    private handleClickEvents;
    /**
     * Updating the state, the root HTML node and reinit event listeners.
     *
     * @param {State} state [description]
     */
    updateState(state: State): void;
    /**
     * Updating the root HTML node by a content coming from the render() method.
     */
    private updateRoot;
    /**
     * Alias for Publisher.subscribe method.
     *
     * @param  {string}   eventType
     * @param  {Function} callback
     * @return {Function}
     */
    on(eventType: string, callback: Function): Function;
    /**
     * Alias for Publisher.unsubscribe method.
     *
     * @param  {string}   eventType
     * @param  {Function} callback
     * @return {Function}
     */
    unsubscribe(eventType: string, callback: Function): void;
    /**
     * Rendering HTML content.
     *
     * @return {string} [description]
     */
    private render;
}
export default Calendar;
